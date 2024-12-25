type User = {
  readonly id: number;
  name: string;
  tel: string;
  address?: string;
}

// type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>;

// type A<T> = {
//   [P in keyof T as "aaaa"]:T[P]
// }

// type B = A<User>;

type MyOmit<T, K> = {
  [P in keyof T as P extends K ? never : P]: T[P]
} 

type OmitUser = MyOmit<User, "tel" | "address">
/*
P in keyof T --- "id" | "name | "tel" | "address"
"tel" | "address"

"id" --- "tel" | "address" ? never : "id" ---- "id"
"name" --- "tel" | "address" ? never : "name" ---- "name"
"tel" --- "tel" | "address" ? never : "tel" ---- never
"address" --- "tel" | "address" ? never : "address" ---- never

"id" | "name" | never | never
*/

type PickStringValueType<T> = {
  [P in keyof T as T[P] extends string ? P : never]: T[P];
}

type FilterStringUser = PickStringValueType<User>;


type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
}

type PickUser = PickByType<User, number>;