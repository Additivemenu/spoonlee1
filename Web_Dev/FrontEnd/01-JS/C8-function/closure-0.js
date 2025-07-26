{
  const obj = {
    count: function () {
      console.log(1);
    },
  };
  obj.count(); // 1
}

{
  let scope = "global scope";
  // A global variable
  function checkscope() {
    let scope = "local scope"; // A local variable
    function f() {
      return scope;
    } // Return the value in scope here
    return f();
  }

  let s = checkscope();
  console.log(s); // => "local scope"
}

{
  let scope = "global scope"; // A global variable
  function checkscope() {
    let scope = "local scope"; // A local variable
    function f() {
      return scope;
    } // Return the value in scope here
    return f;
  }

  let s = checkscope()(); // What does this return
  console.log(s); // => "local scope"
}
