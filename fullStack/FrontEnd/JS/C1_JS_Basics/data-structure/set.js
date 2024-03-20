// set is like map but only have keys, no values
const set = new Set([123, 456]);
set.add("test");
set.add(10);
set.add({});
console.log(set.size);
console.log(set.has(123));
console.log(set.has({})); // false

set.delete(123);
console.log(set.has(123));

for (value of set) {
  console.log(value);
}
set.forEach((value) => {
  console.log(value);
});
const iter = set.values();
console.log(iter.next().value);
console.log(iter.next().value);
console.log(iter.next().value);
const iter2 = set.keys();
console.log(iter2.next().value);
console.log(iter2.next().value);
console.log(iter2.next().value);
const iter3 = set.entries();
console.log(iter3.next().value);
console.log(iter3.next().value);
console.log(iter3.next().value);

// set can be used to remove duplicate elements in an array
const arr = [1, 2, 2, 2, 3, 3, 4, 5, 5];
console.log(Array.from(new Set(arr)));

// weak set --------------------------------------------------------------
const weakSet = new WeakSet();
weakSet.add({}); // only object can be added

(function () {
  const obj = {};
  weakSet.add(obj);
})();

console.log(weakSet.size); // undefined
// console.log(weakSet.has(obj)); // false
