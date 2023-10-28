let obj = {
    name: "shawn",
    age: 18,
    income: 0,
    arc: {
        a: 222,
        b: 333,
    },
};
console.log(obj);
console.table(obj);

// deepCopy---------------------------------
let person = {
    name: "shawn",
    age: 18,
};

let person3 = { ...person }; // create a deepCopy of person, assign this deepCopy to person3
console.log(person, person3);
person3.age = 100;          // this only change person3.age
console.log(person, person3);

// ===============================================
let book = {
    year_: 2017,      // 下划线表示我们不希望该属性在对象方法的外部被访问
    edition: 1
  };
  
  Object.defineProperty(book, "year", {
    get(){
      return this.year_;
    },
    set(newValue){
      if(newValue > 2017){
        this.year_ = newValue;
        this.edition += newValue - 2017;
      }
    }
  });
  
  book.year = 2018;     // 写入新的值
  console.log(book.edition);    // 2
  
  console.log(book.year);