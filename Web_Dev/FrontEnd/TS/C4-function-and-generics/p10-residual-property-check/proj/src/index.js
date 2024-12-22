class Person { 
  id;
  name;
}

class Child extends Person { 
  role
}

let c = new Child();
c.id = 1;
c.name = "jack";
c.role = "admin";
console.log(c);