export type Mode = 'lab' | 'monster' | 'jet' | 'ended';
export type Part = 'shield' | 'core' | 'legs';
export type Config = { name: string; color: string; scale: number; armor: boolean; horns: boolean };
export const defaults: Config = { name: 'ATLAS–01', color: '#67c7ae', scale: 1, armor: true, horns: true };
export type Building = { id: number; x: number; z: number; w: number; d: number; h: number; hp: number; maxHp: number; kind: number; footprint?: [number, number][] };
export type City = { buildings: Building[]; roads: [number, number][][]; source: string };
export type Event = { kind: 'collapse'|'beam'|'stomp'|'pulse'|'hit'|'launch'; x:number; y:number; z:number; tx?:number; ty?:number; tz?:number };
export type Missile = { x:number; y:number; z:number; life:number; part:Part };
export const abilities = { beam: { cooldown: 3, cost: 24 }, stomp: { cooldown: 2, cost: 15 }, pulse: { cooldown: 7, cost: 40 } };
export function makeCity(): City {
  let seed = 87; const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const buildings: Building[] = [];
  for (let x=-210;x<=210;x+=60) for(let z=-210;z<=210;z+=60) {
    if (Math.abs(x)<35 && Math.abs(z)<35) continue;
    for(let n=0;n<3;n++) {const kind=Math.floor(rand()*3); const h=12+rand()*(kind===2?83:35); buildings.push({id:buildings.length,x:x+(n%2)*22-11,z:z+Math.floor(n/2)*24-10,w:14+rand()*6,d:14+rand()*6,h,hp:h*2,maxHp:h*2,kind});}
  }
  const roads: [number, number][][]=[];
  for(let v=-240;v<=240;v+=60){ roads.push([[v,-250],[v,250]],[[-250,v],[250,v]]); }
  return {buildings,roads,source:'Procedural Melbourne-inspired grid · geographic data unavailable'};
}
export function validConfig(value: unknown): Config {
  const c = value as Partial<Config> | null;
  return {name:typeof c?.name==='string'?c.name.slice(0,24):defaults.name,color:typeof c?.color==='string'&&/^#[0-9a-f]{6}$/i.test(c.color)?c.color:defaults.color,scale:typeof c?.scale==='number'&&Number.isFinite(c.scale)?Math.min(1.3,Math.max(.8,c.scale)):1,armor:typeof c?.armor==='boolean'?c.armor:true,horns:typeof c?.horns==='boolean'?c.horns:true};
}
export class Simulation {
  mode:Mode='lab'; config:Config={...defaults}; city:City; monster={x:0,z:0,yaw:0,hp:1000,maxHp:1000};
  jet={x:0,y:85,z:210,yaw:Math.PI,pitch:0,hp:100,speed:65};
  parts:Record<Part,number>={shield:180,core:180,legs:180}; target:Part='shield'; energy=100;
  cooldowns={beam:0,stomp:0,pulse:0,missile:0}; events:Event[]=[]; missiles:Missile[]=[]; elapsed=0; destroyed=0; hits=0; result=''; paused=false; aiTimer=0; aiAttack=0; shots=0;
  constructor(city=makeCity()){
    this.city=structuredClone(city);
    const candidates=city.roads.flatMap(r=>r.slice(1).map((p,i)=>({x:(p[0]+r[i][0])/2,z:(p[1]+r[i][1])/2}))).sort((a,b)=>Math.hypot(a.x,a.z)-Math.hypot(b.x,b.z));
    const spawn=candidates.find(p=>!city.buildings.some(b=>Math.abs(p.x-b.x)<b.w/2+8&&Math.abs(p.z-b.z)<b.d/2+8));
    if(spawn){this.monster.x=spawn.x;this.monster.z=spawn.z;}
  }
  configure(c:Config){this.config=validConfig(c);this.monster.maxHp=this.config.armor?1300:1000;this.monster.hp=this.monster.maxHp;this.parts.shield=this.config.armor?240:140;}
  deploy(){this.mode='monster';}
  switchMode(){if(this.mode==='ended'||this.mode==='lab')return;this.mode=this.mode==='monster'?'jet':'monster'; if(this.mode==='jet'){this.jet.x=this.monster.x;this.jet.z=Math.min(290,this.monster.z+190);this.jet.y=85;this.jet.yaw=Math.PI;this.jet.pitch=0;}}
  get destruction(){return Math.round(this.destroyed/this.city.buildings.length*100);}
  get locked(){const dx=this.monster.x-this.jet.x,dz=this.monster.z-this.jet.z;const dist=Math.hypot(dx,dz);return dist<300&&dist>5&&(Math.sin(this.jet.yaw)*dx+Math.cos(this.jet.yaw)*dz)/dist>.65;}
  damageBuilding(b:Building,damage:number){if(b.hp<=0)return;b.hp=Math.max(0,b.hp-damage);if(b.hp===0){this.destroyed++;this.events.push({kind:'collapse',x:b.x,y:b.h/2,z:b.z});}}
  ability(name:keyof typeof abilities){if(this.mode!=='monster'||this.paused||this.cooldowns[name]>0||(name==='beam'&&this.parts.core<=0)||this.energy<abilities[name].cost)return false;this.energy-=abilities[name].cost;this.cooldowns[name]=abilities[name].cooldown;
    const m=this.monster;const range=name==='beam'?180:name==='stomp'?42:85;const fx=Math.sin(m.yaw),fz=Math.cos(m.yaw);
    for(const b of this.city.buildings){const dx=b.x-m.x,dz=b.z-m.z;const dist=Math.hypot(dx,dz);const along=dx*fx+dz*fz;const across=Math.abs(dx*fz-dz*fx);if(name==='beam'?along>0&&along<range&&across<b.w/2+9:dist<range) this.damageBuilding(b,name==='beam'?150:name==='stomp'?200:130);}
    this.events.push({kind:name,x:m.x,y:name==='beam'?30*this.config.scale:2,z:m.z,tx:m.x+fx*range,ty:10,tz:m.z+fz*range});return true;
  }
  cycleTarget(){const p:Part[]=['shield','core','legs'];this.target=p[(p.indexOf(this.target)+1)%p.length];}
  fire(){if(this.mode!=='jet'||this.paused||this.cooldowns.missile>0||!this.locked)return false;this.cooldowns.missile=.8;this.shots++;this.missiles.push({x:this.jet.x,y:this.jet.y,z:this.jet.z,life:5,part:this.target});this.events.push({kind:'launch',x:this.jet.x,y:this.jet.y,z:this.jet.z});return true;}
  hit(part:Part){this.hits++;const shielded=this.parts.shield>0&&part!=='shield'; const damage=shielded?12:65;this.parts[part]=Math.max(0,this.parts[part]-damage);this.monster.hp=Math.max(0,this.monster.hp-(shielded?12:part==='core'?145:90));this.events.push({kind:'hit',x:this.monster.x,y:part==='legs'?8:part==='core'?28:40,z:this.monster.z});if(this.monster.hp===0)this.end('Threat neutralized');}
  end(result:string){this.mode='ended';this.result=result;}
  step(dt:number,keys:Set<string>=new Set()){
    dt=Math.min(.05,Math.max(0,dt));if(this.paused||this.mode==='lab'||this.mode==='ended')return;this.elapsed+=dt;this.energy=Math.min(100,this.energy+dt*7);
    for(const k of Object.keys(this.cooldowns) as (keyof typeof this.cooldowns)[])this.cooldowns[k]=Math.max(0,this.cooldowns[k]-dt);
    const m=this.monster;
    if(this.mode==='monster') {m.yaw+=((keys.has('KeyA')?1:0)-(keys.has('KeyD')?1:0))*dt*1.6;const speed=(keys.has('KeyW')?1:0)-(keys.has('KeyS')?1:0);m.x+=Math.sin(m.yaw)*speed*dt*(this.parts.legs>0?25:8);m.z+=Math.cos(m.yaw)*speed*dt*(this.parts.legs>0?25:8);
      for(const b of this.city.buildings)if(b.hp>0&&Math.abs(m.x-b.x)<b.w/2+7&&Math.abs(m.z-b.z)<b.d/2+7)this.damageBuilding(b,dt*180);
    }else {
      const j=this.jet; j.yaw+=((keys.has('KeyA')?1:0)-(keys.has('KeyD')?1:0))*dt*1.2;j.pitch=Math.max(-.7,Math.min(.7,j.pitch+((keys.has('KeyW')?1:0)-(keys.has('KeyS')?1:0))*dt*.8));j.pitch*=Math.exp(-dt*.45);j.speed=keys.has('ShiftLeft')?110:65;j.x+=Math.sin(j.yaw)*Math.cos(j.pitch)*j.speed*dt;j.z+=Math.cos(j.yaw)*Math.cos(j.pitch)*j.speed*dt;j.y+=Math.sin(j.pitch)*j.speed*dt;
      if(j.y<5){j.y=5;j.hp-=dt*40;}if(Math.abs(j.x)>340||Math.abs(j.z)>340){j.yaw=Math.atan2(-j.x,-j.z);j.x=Math.max(-339,Math.min(339,j.x));j.z=Math.max(-339,Math.min(339,j.z));}j.y=Math.min(200,j.y);
      for(const b of this.city.buildings)if(b.hp>0&&j.y<b.h+2&&Math.abs(j.x-b.x)<b.w/2+2&&Math.abs(j.z-b.z)<b.d/2+2){j.hp-=dt*70;j.y+=dt*25;}
      const live=this.city.buildings.filter(b=>b.hp>0);const nearest=live.reduce<Building|undefined>((best,b)=>!best||Math.hypot(b.x-m.x,b.z-m.z)<Math.hypot(best.x-m.x,best.z-m.z)?b:best,undefined);
      if(nearest){const angle=Math.atan2(nearest.x-m.x,nearest.z-m.z);m.yaw=angle;const dist=Math.hypot(nearest.x-m.x,nearest.z-m.z);if(dist>18){const speed=this.parts.legs>0?12:4;m.x+=Math.sin(angle)*dt*speed;m.z+=Math.cos(angle)*dt*speed;}else this.damageBuilding(nearest,dt*75);}
      this.aiAttack-=dt;if(this.aiAttack<=0&&this.parts.core>0){this.aiAttack=4;this.events.push({kind:'beam',x:m.x,y:30,z:m.z,tx:j.x,ty:j.y,tz:j.z});if(Math.hypot(j.x-m.x,j.z-m.z)<190&&!keys.has('ShiftLeft'))j.hp=Math.max(0,j.hp-13);}
      if(j.hp<=0)this.end('Aircraft lost');
    }
    m.x=Math.max(-245,Math.min(245,m.x));m.z=Math.max(-245,Math.min(245,m.z));
    this.missiles=this.missiles.filter(p=>{const targetY=(p.part==='legs'?8:p.part==='core'?28:40)*this.config.scale;const dx=m.x-p.x,dy=targetY-p.y,dz=m.z-p.z;const distance=Math.hypot(dx,dy,dz);if(distance<dt*150+5){this.hit(p.part);return false;}p.x+=dx/distance*dt*150;p.y+=dy/distance*dt*150;p.z+=dz/distance*dt*150;p.life-=dt;return p.life>0;});
    if(this.destroyed===this.city.buildings.length)this.end('City evacuated · total destruction');
  }
}
