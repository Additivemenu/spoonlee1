async function loadHeroes() {
  // get heroes data
  // ! fetch() return a promise, which is resolved when all response headers are received
  const resp = await fetch("https://study.duyiedu.com/api/herolist");
  console.log("response", resp);

  // parse response header info
  const contentType = resp.headers.get("content-type");
  console.log("contentType", contentType);

  // parse response body info
  if (contentType.includes("application/json")) {
    // ! json() return a promise, which is resolved when
    // ! 1. all response body info are received &&
    // ! 2. response body info is parsed as json object
    const body = await resp.json();
    console.log("application/json data", body);
    const heroes = body.data;

    document.querySelector(".list").innerHTML = heroes
      .map((hero) => {
        return `
        <li>
            <a href="https://pvp.qq.com/web201605/herodetail/${hero.ename}.shtml" target="_blank">
                <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.ename}/${hero.ename}.jpg">
                <span>${hero.cname}</span>
            </a>
        </li>
      `;
      })
      .join("");
      
  } else if (contentType.includes("text/html")) {
    // ! text() return a promise, which is resolved when all response body info are received
    // ! 1. all response body info are received &&
    // ! 2. response body info is parsed as text
    const body = await resp.text();
    console.log("text", body);
  } else {
    // and there are many more other forms of response body info
  }
}

loadHeroes();
