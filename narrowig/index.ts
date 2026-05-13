// При использовании union типа в аргументах функции может возникнуть
// ситуация, когда мы хотим выполнить разные операции в зависимости
// от типа данных. Для этого нам нужно “сузить типы”
function printMsg(msg: string[] | number | boolean): void {
  if (Array.isArray(msg)) {
    msg.forEach((m) => console.log(m));
  } else if (typeof msg === "number") {
    console.log(msg.toFixed());
  } else {
    console.log(msg);
  }
}

function checkReadings(readings: { system: number } | { user: number }): void {
  if ("system" in readings) {
    console.log(readings.system);
  } else {
    console.log(readings.user);
  }
}

function logValue(x: string | Date) {
  if (x instanceof Date) {
    console.log(x.getDate());
  } else {
    console.log(x.trim());
  }
}

export {};
