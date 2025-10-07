let input: unknown;

input = 3;
input = ["sf", "sdf"];

// let res: string = input
// Ошибка
// переменную с unknown нельзя положить в другую переменную
// пока не сделаем приведение типов или не определим что это за тип
// но можно положить в any

// Приведение типов

function run(i: unknown) {
  if (typeof i == "number") {
    i++;
  } else {
    i;
  }
}

run(input);

async function getData() {
  try {
    await fetch("");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

//Union с unknown становится в любом случае unknown
type I1 = unknown | string; //unknown
//Объединение с unknown становится вторым типом
type I2 = unknown & string; //string

export {};
