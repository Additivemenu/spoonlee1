// 这部分相当于Java中的stream api

// 给定数组, 偶数元素位置返回true, 奇数返回false
{
    const numbers = [0,1,2,3,4,5,6];

    // 方法1
    const results = [];
    // js一般用3个等号
    for(let i=0; i<numbers.length; i++){
        if(numbers[i] % 2 === 1){
            results[i] = false;
        }else if(numbers[i] % 2 === 0){
            results[i] = true;
        }
    }
    console.log(results)

    // 方法2
    const results2 = numbers.map( number => isEven(number))

    function isEven(number){
        return number%2 === 0
    }

    console.log(results2)

    // 方法3
    const results3 = []
    for(let i = 0; i < numbers; i++){
        results3.push(numbers[i] % 2 === 0);
    }
    console.log(results3)
}

// 给定数组, 数组元素都加1
{
    const numbers = [0,1,2,3,4,5,6];

    const result = numbers.map(number => number+1)
    console.log(result)
}

// create an array only contains even number
{
    const numbers = [0,1,2,3,4,5,6];

    // filter的 => 后面跟的函数的返回值是boolean
    const result = numbers.filter((number) => number%2 === 0)       
    console.log(result)
}

// determine if array only contains even number
{
    const numbers = [0,1,2,3,4,5,6];

    const result = numbers.every(number => number%2 === 0)
    console.log(result)     // false

    const numbers2 = [0,2,4,6];
    console.log(numbers2.every(number => number%2 === 0))        // true
}

// determine if array contains at least one even number
{
    const numbers = [0,1,2,3,4,5,6];

    const result = numbers.some(number => number%2 === 0)
    console.log(result)     // true
}

// change every person's name into "3", and put results into another array
{   
    // map(): 产生新的数组
    // forEach(): 对原来数组做修改
    console.log(`*********************`)
    const persons = [{age:7, name:"1"}, {age:8, name:"2"}, {age:9, name:"3"}]

    // lambda体中return的的那部分相当于java中的new()
    const result = persons.map(person => {
        return {
            age: person.age,
            name: "3"
        }
    })
    console.log(result)
}

{
    const persons = [{age:7, name:"1"}, {age:8, name:"2"}, {age:9, name:"3"}]

    const result = persons.map(person => {
        return {
            age: person.age+1,
            name: person.name
        }
    })
    console.log(result)
}

