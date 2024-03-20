// key in map can be any type
const map = new Map();
map.set("test", 123);
map.set(10, "ten");
map.set({}, 42);
console.log(map.get(10));
console.log(map.size);
console.log(map.has("test")); // if map has key
console.log(map.has({})); // false

for ([key, value] of map) {
  console.log(key, value);
}
map.forEach((value, key) => {
  console.log(key, value);
});
const iter = map.entries();
console.log(iter.next().value);
console.log(iter.next().value);
console.log(iter.next().value);
const iter2 = map.keys();
console.log(iter2.next().value);
console.log(iter2.next().value);
console.log(iter2.next().value);
const iter3 = map.values();
console.log(iter3.next().value);
console.log(iter3.next().value);
console.log(iter3.next().value);


map.delete(10);
console.log(map.size);
map.clear();
console.log(map.size);