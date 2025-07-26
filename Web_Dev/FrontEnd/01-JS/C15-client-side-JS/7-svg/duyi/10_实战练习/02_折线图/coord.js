function draw(arg) {
  //会在250*250的空间中绘制 200*200的坐标系
  //四周留白25px
  //坐标系分成10分，每一份20px 

  if(typeof arg === 'string'){
    //arg是字符串，认为传递就是一个id
    arg = {id:arg} ;
  }
  //代码至此，arg一定是对象，需要为对象属性设置默认值
  const config = {
    title:'标题',
    titleColor:'#fac',
    color:'#ccc',
    xAxis:true,
    yAxis:true,
    ...arg
  }


  //准备对象
  const svg = document.querySelector(config.id);
  const NS = "http://www.w3.org/2000/svg";
  svg.setAttribute("viewBox", "0 0 250 250");

  const g = document.createElementNS(NS,'g');
  const title = document.createElementNS(NS,'text');
  title.innerHTML = config.title ;
  title.setAttribute('x',10);
  title.setAttribute('y',15);
  title.setAttribute('font-size',8);
  title.setAttribute('fill',config.titleColor);
  g.appendChild(title);

  const path = document.createElementNS(NS, "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", config.color);
  path.setAttribute("stroke-width", "0.8");
  let d = "";
  //绘制坐标系横纵线
  for (let i = 0; i < 11; i++) {
    if(config.xAxis)
        d += `M25 ${25+i*20}H225`;
    if(config.yAxis)
        d += `M${25+i*20} 25V225`;
  }
  path.setAttribute("d", d);
  g.appendChild(path);



  const children = svg.children ;
  if(children && children.length > 0){
    //有子标签， 坐标系path放在第一个子标签的前面
    svg.insertBefore(g,children[0]);
  }else{
    svg.appendChild(g);
  }
}

