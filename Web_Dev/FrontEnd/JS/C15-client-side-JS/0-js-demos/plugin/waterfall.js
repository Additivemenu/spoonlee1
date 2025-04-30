if (!window.myPlugin) {
  window.myPlugin = {};
}
/**
 *
 * plugin: 创建一个图片瀑布流 添加到指定容器内
 * 整体上是一个top-down的divide-and-conquer的思考模式, 先设计总体把问题分解, 再去填充细节
 *
 * tree的递归算法-post-order traversal则需要bottom-up的思考模式
 *
 * @param {Object} option 配置对象
 * @param {number} option.minGap 最小间隙
 * @param {Array} option.imgSrcs 图片路径的数组
 * @param {number} option.imgWidth 单张图片的宽度
 * @param {Element} option.container 容器
 */
window.myPlugin.createWaterFall = function (option) {
  // ! 作为 plugin, 处理option输入
  var defaulOption = {
    minGap: 10, //最小间隙
    imgSrcs: [], //图片路径的数组
    imgWidth: 220, //单张图片的宽度
    container: document.body, //容器
  };
  var option = Object.assign({}, defaulOption, option);
  var imgs = []; //存放所有的图片dom对象

  //处理父元素
  handleParent();
  //创建图片元素
  createImgs();

  //窗口尺寸变化事件
  var debounce = myPlugin.debounce(setImgPosition, 300);
  window.onresize = debounce;

  /**
   * ! core: 设置每一张图片的坐标
   * 本质上是一种填充算法, 跟DEM里那种particle system很像
   */
  function setImgPosition() {
    var info = getHorizontalInfo();
    var arr = new Array(info.number); //存放每一列下一张图片的top值
    arr.fill(0);
    
    imgs.forEach(function (img) {
      //设置图片的坐标
      var minTop = Math.min.apply(null, arr);
      img.style.top = minTop + "px";
      var index = arr.indexOf(minTop); //找到对应的列编号
      arr[index] += img.clientHeight + info.gap;
      //横坐标
      img.style.left = index * (option.imgWidth + info.gap) + "px";
    });
    //设置容器高度
    var maxTop = Math.max.apply(null, arr);
    option.container.style.height = maxTop - info.gap + "px";
  }

  /**
   * 得到图片水平方向上的信息
   */
  function getHorizontalInfo() {
    var obj = {};
    //容器宽度
    obj.containerWidth = option.container.clientWidth;
    //计算一行图片的数量
    obj.number =
      (obj.containerWidth + option.minGap) / (option.imgWidth + option.minGap);
    obj.number = Math.floor(obj.number); //每行的图片只能少，不能多
    //计算水平空隙
    obj.gap =
      (obj.containerWidth - obj.number * option.imgWidth) / (obj.number - 1);
    return obj;
  }

  /**
   * 创建图片
   */
  function createImgs() {
    var debounce = myPlugin.debounce(setImgPosition, 30);
    //循环图片路径数组
    for (var i = 0; i < option.imgSrcs.length; i++) {
      var img = document.createElement("img");
      img.src = option.imgSrcs[i];
      img.style.width = option.imgWidth + "px";
      img.style.position = "absolute"; //! 为了实现瀑布流，图片必须绝对定位以获取自由度 -> 同时必须确保父元素相对定位
      img.style.transition = ".5s"; //实现过渡
      imgs.push(img);
      img.onload = debounce; //函数节流
      option.container.appendChild(img);
    }
  }

  /**
   * 处理父元素，因为图片都是绝对定位，父元素必须是一个定位元素
   * 因为我们是要做plugin, 需要考虑这一点
   */
  function handleParent() {
    //如果父元素不是定位元素，则将其变为相对定位
    var style = getComputedStyle(option.container);
    if (style.position === "static") {
      option.container.style.position = "relative";
    }
    //! 如果parent是absolution, 以及其他position, 没有必要改为relative, 因为会造成污染, 这也是plugin需要考虑的
  }
};
