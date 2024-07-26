// 基于original data的第一层封装
class UIGoods {
  constructor(g) {
    this.data = g; // this won't change data's original structure
    this.choose = 0;
  }

  getTotalPrice() {
    return this.data.price * this.choose;
  }

  isChoose() {
    return this.choose > 0;
  }

  increase() {
    this.choose++;
  }

  decrease() {
    if (this.choose === 0) {
      return 0;
    }

    this.choose--;
  }
}

// global ui data -> 第二层封装
class UIData {
  constructor() {
    let uiGoods = [];
    for (let g of goods) {
      uiGoods.push(new UIGoods(g));
    }
    this.uiGoods = uiGoods;
    this.deliveryThreshold = 30;
    this.deliveryPrice = 5;
  }

  getGoods() {
    return this.uiGoods;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let g of this.uiGoods) {
      totalPrice += g.getTotalPrice();
    }
    return totalPrice;
  }

  /**
   * increase the number of goods of given index
   * @param {*} index
   */
  increase(index) {
    this.uiGoods[index].increase();
  }

  decrease(index) {
    this.uiGoods[index].decrease();
  }

  getTotalChooseNumber() {
    let total = 0;
    for (let g of this.uiGoods) {
      total += g.choose;
    }
    return total;
  }

  hasGoodsInCar() {
    return this.getTotalChooseNumber() > 0;
  }

  isCrossDeliveryThreshold() {
    return this.getTotalPrice() >= this.deliveryThreshold;
  }

  isChoose(index) {
    return this.uiGoods[index].isChoose();
  }
}

// global ui interface: DOM
class UI {
  constructor() {
    this.uiData = new UIData();
    this.doms = {
      goodsContainer: document.querySelector(".goods-list"),
      deliveryPrice: document.querySelector(".footer-car-tip"),
      footerPay: document.querySelector(".footer-pay"),
      footerPayInnerSpan: document.querySelector(".footer-pay span"),
      footerTotalPrice: document.querySelector(".footer-car-total"),
      footerCar: document.querySelector(".footer-car"),
      footerCarBadge: document.querySelector(".footer-car-badge"),
    };
    this.createHTML();
    this.updateFooter();
  }

  // based on goods data, create DOM
  createHTML() {
    // 1. option1: generate html string -> low running efficiency as browser need to parse html, but hight development efficiency
    let html = "";
    for (let g of this.uiData.getGoods()) {
      html += `<div class="goods-item">
          <img src="${g.data.pic}" alt="" class="goods-pic" />
          <div class="goods-info">
            <h2 class="goods-title">${g.data.title}</h2>
            <p class="goods-desc">
                ${g.data.desc}
            </p>
            <p class="goods-sell">
              <span>月售 ${g.data.sellNumber}</span>
              <span>好评率${g.data.favorRate}%</span>
            </p>
            <div class="goods-confirm">
              <p class="goods-price">
                <span class="goods-price-unit">￥</span>
                <span>${g.data.price}</span>
              </p>
              <div class="goods-btns">
                <i class="iconfont i-jianhao"></i>
                <span>${g.choose}</span>
                <i class="iconfont i-jiajianzujianjiahao"></i>
              </div>
            </div>
          </div>
        </div>`;
    }
    this.doms.goodsContainer.innerHTML = html;

    // 2. option2: create DOM -> high running efficiency as browser don't need to parse html
  }

  increase(index) {
    this.uiData.increase(index);
    this.updateGoodsItem(index);
    this.updateFooter();
  }

  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodsItem(index);
    this.updateFooter();
  }

  updateGoodsItem(index) {
    let goodsDom = this.doms.goodsContainer.children[index];
    if (this.uiData.isChoose(index)) {
      goodsDom.classList.add("active");
    } else {
      goodsDom.classList.remove("active");
    }

    const span = goodsDom.querySelector(".goods-btns span");
    span.textContent = this.uiData.uiGoods[index].choose;
  }

  updateFooter() {
    let total = this.uiData.getTotalPrice();

    // set delivery fee
    this.doms.deliveryPrice.textContent = `delivery fee $${this.uiData.deliveryPrice}`;

    // set money left to start delivery
    if (this.uiData.isCrossDeliveryThreshold()) {
      this.doms.footerPayInnerSpan.textContent = `pay $${this.uiData.getTotalPrice()}`;
      this.doms.footerPay.classList.add("active");
    } else {
      this.doms.footerPay.classList.remove("active");
      // update what money left is needed
      let diff = this.uiData.deliveryThreshold - total;
      diff = Math.round(diff);
      this.doms.footerPayInnerSpan.textContent = `add $${diff} to pay`;
    }

    // set total price
    this.doms.footerTotalPrice.textContent = `$${total.toFixed(2)}`;
    if (this.uiData.hasGoodsInCar()) {
      this.doms.footerCar.classList.add("active");
    } else {
      this.doms.footerCar.classList.remove("active");
    }
    this.doms.footerCarBadge.textContent = this.uiData.getTotalChooseNumber();
  }
}

const ui = new UI();
