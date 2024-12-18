function createArray<T=number>(length: number, value: T): T[] { 
  return new Array(length).fill(value);
}

const arr = createArray(3, 1);
console.log(arr);

type A<T = string> = {
  value:T
}

let strObj: A = {
  value:"aa"
}

let numObj: A<number> = {
  value:1
}

type MyEvent<T = HTMLButtonElement | null> = {
  target: T
  type: string
}
const myEvent1: MyEvent = {
  target: document.querySelector("button"),
  type: "click"
}

const myEvent2: MyEvent<HTMLDivElement | null> = {
  target: document.querySelector("div"),
  type: "click"
}

