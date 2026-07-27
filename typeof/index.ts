let strOrNum: string | number;

let typeStrOrNumber: typeof strOrNum;

const user = {
  name: "Vasya",
  age: 20,
};

type keyOfUser = keyof typeof user; // name | age

export {};
