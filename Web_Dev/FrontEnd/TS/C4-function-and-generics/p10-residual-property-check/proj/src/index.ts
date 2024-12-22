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
}

deleteUser({ id: 4, name: "user4", role: "admin" } as User);
