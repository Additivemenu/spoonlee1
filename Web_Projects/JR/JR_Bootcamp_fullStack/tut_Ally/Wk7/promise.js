
// const buyFruit = function(fruit, callback){
//     setTimeout(() =>{
//         console.log(fruit);
//         callback();
//     }, 1000);
// }

// buyFruit('apple', function(){
//     buyFruit('banana', function(){
//         buyFruit('orange', function(){
//             console.log('end')
//         })
//     })
// })


{
    const buyFruit = function(fruit){
        return new Promise(function(resolve, reject){
            setTimeout(()=>{
                console.log(fruit);
                resolve();
            }, 1000);
        })
    }

    buyFruit('apple')
    .then(()=>{
        return buyFruit('banana')
    })
    .then(()=>{
        return buyFruit('orange')
    })
    .then(()=>{
        console.log('end')
    })
    .catch(function(err){
        console.log(err)
    })
}