{
  // js's [] operator:
  // access array element
  const arr = ["a", "b", "c"];
  console.log(arr[1]);

  // access object field
  const a = "name";
  const obj = {
    id: 1,
    name: "jack",
  };
  console.log(obj[a]);
}

{
  // in ts:
  type Person = {
    id: number;
    name: string;
    age: number;
  };

  // get the object field type
  type Name = Person["name" | "age"]; // Name = string | number
}

{
  // get array element type
  const arr = ["a", "b", "c"];
  type ArrValueType = (typeof arr)[number]; // ArrValueType = string

  type User = {
    name: string;
    age: number;
  };
  const users: User[] = [
    { name: "jack", age: 20 },
    { name: "jill", age: 30 },
  ];
  type ObjType = (typeof users)[number]; // ObjType = ObjType = { name: string; age: number; }
}

{
  // get tuple element type
  const p: [number, string] = [1, "jack"];
  type TupleType = (typeof p)[number]; // TupleType = string | number

  const roles: ["Admin", "User", "Guest"] = ["Admin", "User", "Guest"];
  type RolesTupleType = (typeof roles)[number]; // RolesTupleType = "Admin" | "User" | "Guest"

  const list = ["role list", "user list", "user search", "admin list"]; // a normal array, not a tuple
  type ListType = (typeof list)[number]; // ListType = string

  const listAsConst = [
    "role list",
    "user list",
    "user search",
    "admin list",
  ] as const; // list type: readonly ["role list", "user list", "user search", "admin list"]
  type ListAsConstType = (typeof listAsConst)[number]; // ListAsConstType = "role list" | "user list" | "user search" | "admin list"
}
