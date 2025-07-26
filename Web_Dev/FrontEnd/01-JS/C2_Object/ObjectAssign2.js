let dest, src, result;

/**
 * 覆盖属性 ---------------------------------------
 */

dest =  {id: 'dest'};
result = Object.assign(dest, {id:'src1',a:'foo'},{id:'src2',b:'bar'});  //如果多个源对象具有相同的属性, dest被依次assign源对象的属性, 但后面的源对象的属性会覆盖之前的
// Object.assign会覆盖重复的属性

console.log(result);      // {id: 'src2', a: 'foo', b: 'bar'}

// 可以通过目标对象上的setter观察到覆盖的过程:
dest = {
    set id(x){
        console.log(x);
    }
};
Object.assign(dest, {id:'fisrt'},{id:'second'},{id: 'third'});
// Object.assign()会先调用source object的getter, 再调用dest object的setter
// first
// second
// third


/**
 * 对象引用 --------------------------------
 */

dest = {};
console.log(dest);              // {}
src = {a:{}};

Object.assign(dest, src);
// shadowCopy意味着只会复制对象的引用

console.log(dest);              // { a: {}}
console.log(dest.a === src.a);  // true, 说明dest.a和src.a的引用相同
console.log(dest === src );     // false, 说明dest和src的引用不同


