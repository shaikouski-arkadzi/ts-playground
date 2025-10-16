# Тип Unknown

Бывают ситуации, когда мы можем получить сущность неизвестного типа. Для работы с ними существует, который является типобезопасным аналогом any.
Опасность any в том, что это любой тип. А вот unknow – это неизвестный тип.
К чему угодно может применятся что угодно, а к неизвестному – ничего.
Для работы с этим типом необходимо использовать сужение типов.

    function run(i: unknown) {
        if (typeof i == "number") {
    	    i++;
        } else {
    	    i;
        }
    }

---

## Применение Unknown

Данный тип можно использовать для работы с функциями, которые возвращают что-угодно. Например, JSON.parse(). Так мы избежим ошибок и правильно будем работать с данными:

    const userData =
      '{"isBirthdayData": true, "ageData": 40, "userNameData": "John"}';

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

В JSON строке могут быть разные данные и благодаря функции safeParse мы получим не что угодно, а неизвестно что. А функция transferData использует сужение типов для правильной работы

---

В TS, в конструкции try/catch ошибка, приходящая в catch будет типа unknown. Это происходит из-за того, что компилятор не знает, какую именно ошибку разработчик выкинет из блока try. Это может быть строка, экземпляр определенного класса или что-то еще. Так что здесь тоже стоит применять сужение типов:

    try {
      if (1) {
        throw new Error("error");
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else if (typeof e === "string") {
        console.log(e);
      }
    }

## Работа с union и intersection типами

- Если тип unknown составляет тип объединение (union), то он перекроет все типы, за исключением типа any
- Если тип unknown составляет тип пересечение (intersection), то он будет перекрыт всеми типами

```
type T0 = any | unknown; // any
type T1 = number | unknown; // unknown
type T2 = any & unknown; // any
type T3 = number & unknown; // number
```
