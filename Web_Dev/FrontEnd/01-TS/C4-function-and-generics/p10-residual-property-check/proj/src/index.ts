// 多余属性检查

type User = {
  id?: number;
  name: string;
};

type AdminUser = {
  id?: number;
  name: string;
  role: string;
};

function deleteUser(user: User) {
  console.log(user);
}

const u1: AdminUser = {
  id: 1,
  name: "user1",
  role: "admin",
};

deleteUser(u1); // 协变
let u2: User = u1; // 协变 -> AdminUser <: User

// ! 如果直接将一个直接字面量对象赋值给变量，方法参数，或者构造函数参数，就会触发多余属性检查
let u3: User = {
  id: 3,
  name: "user3",
  role: "admin"
} // ! error: Object literal may only specify known properties, and 'role' does not exist in type 'User'.

// 当然，就算直接赋值一个字面量对象，你能自己确定是什么类型，直接用类型断言处理一下也可以
deleteUser({ id: 4, name: "user4", role: "admin" } as User);
