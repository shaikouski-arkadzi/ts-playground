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
    // В catch бедет прихожить тип unknown
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

// JSON.parse возвращает any
// Лучше в этом случае переделать чтоб работать с unknown
const userData =
  '{"isBirthdayData": true, "ageData": 40, "userNameData": "John"}';

// Благодаря safeParse JSON.parse вернет не any, а unknown
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

const data = safeParse(userData);

function transferData(d: unknown): void {
  if (typeof d === "string") {
    console.log(d.toLowerCase());
  } else if (typeof d === "object" && d) {
    console.log(data);
  } else {
    console.error("Some error");
  }
}

transferData(data);

//Union с unknown становится в любом случае unknown
type I1 = unknown | string; //unknown
//Объединение с unknown становится вторым типом
type I2 = unknown & string; //string

export {};
