import test from 'node:test';
import assert from 'node:assert/strict';
import {Simulation, makeCity, validConfig} from './simulation';
test('stomp damages nearby buildings, spends energy, and respects cooldown',()=>{const s=new Simulation();s.deploy();const b=s.city.buildings[0];s.monster.x=b.x;s.monster.z=b.z;const before=b.hp;assert.equal(s.ability('stomp'),true);assert.ok(b.hp<before);assert.equal(s.energy,85);assert.equal(s.ability('stomp'),false);for(let i=0;i<50;i++)s.step(.05);assert.equal(s.ability('stomp'),true);});
test('collapsed buildings count once',()=>{const s=new Simulation();const b=s.city.buildings[0];s.damageBuilding(b,10000);s.damageBuilding(b,10000);assert.equal(s.destroyed,1);assert.equal(s.events.length,1);});
test('missiles require facing the monster and respect cooldown',()=>{const s=new Simulation();s.deploy();s.switchMode();assert.ok(s.locked);assert.equal(s.fire(),true);assert.equal(s.fire(),false);s.jet.yaw=0;assert.equal(s.locked,false);});
test('guided missiles hit shield and destroyed core disables AI beams',()=>{const s=new Simulation();s.deploy();s.switchMode();s.fire();for(let i=0;i<40;i++)s.step(.05);assert.equal(s.hits,1);assert.ok(s.parts.shield<180);s.parts.core=0;s.events=[];s.aiAttack=0;s.step(.05);assert.equal(s.events.some(e=>e.kind==='beam'),false);});
test('shield protects core; neutralization ends combat',()=>{const s=new Simulation();s.hit('core');assert.equal(s.parts.core,168);s.parts.shield=0;s.hit('core');assert.equal(s.parts.core,103);for(let i=0;i<30;i++)s.hit('core');assert.equal(s.mode,'ended');assert.equal(s.result,'Threat neutralized');});
test('pause freezes movement and energy; configuration clamps invalid saves',()=>{const s=new Simulation();s.deploy();s.paused=true;const initialZ=s.monster.z;s.energy=20;s.step(.05,new Set(['KeyW']));assert.equal(s.monster.z,initialZ);assert.equal(s.energy,20);assert.equal(s.ability('beam'),false);assert.deepEqual(validConfig({scale:Infinity,color:'red',armor:'bad'}),{name:'ATLAS–01',color:'#67c7ae',scale:1,armor:true,horns:true});});
test('AI destroys buildings while player is flying',()=>{const s=new Simulation(makeCity());s.deploy();s.switchMode();s.jet.y=160;s.parts.core=0;for(let i=0;i<1200;i++)s.step(.05);assert.ok(s.destroyed>0);});

test('disabled subsystems still allow hull damage and a winnable encounter',()=>{const s=new Simulation();s.configure({...s.config,armor:true});s.deploy();s.switchMode();s.parts={shield:0,core:0,legs:0};assert.equal(s.fire(),true);for(let i=0;i<15;i++)s.hit('core');assert.equal(s.mode,'ended');});

test('disabled energy core prevents player beam attacks too',()=>{const s=new Simulation();s.deploy();s.parts.core=0;assert.equal(s.ability('beam'),false);assert.equal(s.energy,100);});
