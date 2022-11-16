let newArrayNumber = [];
for (let i = 0; i < 10; i++) {
    newArrayNumber[i] = i + 5;
}
console.log(newArrayNumber);



// forEach: 
newArrayNumber.forEach((num, index) => {
    // num here refers to the element in newArrayNumber 
    // index starts from 0
    console.log("1:", num, index);
    });

    // identical to the above
    for (let i = 0; i < newArrayNumber.length; i++) {
    console.log("2:", newArrayNumber[i]);
}


// 打印9*9乘法表
let str = "";

  for (let i = 1; i < 10; i++) {          // row
    for (let j = 1; j <= i; j++) {        // column
      // console.log(i, j);
      str += `${i}*${j}=${i * j} `;

      if (i == j) {
        str += "\n";
      }
    }
  }

  console.log(str);
