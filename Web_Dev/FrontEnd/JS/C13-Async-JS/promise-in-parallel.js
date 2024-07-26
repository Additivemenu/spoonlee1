{
  console.log("Promise.all() ------------------");
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
  });

  Promise.all([promise1, promise2, promise3])
    .then((values) => {
      console.log(values); // [3, 42, "foo"]
    })
    .catch((error) => {
      console.error(error);
    });
}

{
  console.log("Promise.any() ------------------");
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(reject, 100, "Error 1");
  });
  const promise2 = new Promise((resolve) => {
    setTimeout(resolve, 200, "Success 2");
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(reject, 300, "Error 3");
  });

  Promise.any([promise1, promise2, promise3])
    .then((value) => {
      console.log("Promise.any() returned value: ", value); // "Success 2"
    })
    .catch((error) => {
      console.error(error.errors); // ["Error 1", "Error 3"]
    });
}

{
  console.log("Promise.allSettled() ------------------");
  const promise1 = Promise.resolve(3);
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(reject, 100, "error");
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 200, "foo");
  });

  Promise.allSettled([promise1, promise2, promise3]).then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log(`Fulfilled with value: ${result.value}`);
      } else {
        console.log(`Rejected with reason: ${result.reason}`);
      }
    });
  });
}

{
  console.log("Promise.race() ------------------");
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "one");
  });
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "two");
  });

  Promise.race([promise1, promise2])
    .then((value) => {
      console.log(value); // "two"
    })
    .catch((error) => {
      console.error(error);
    });
}
