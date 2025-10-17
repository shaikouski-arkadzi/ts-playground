# Type Assertions

Cлучаются ситуации, когда полученное откуда-то значение не соответствует тому типу, который мы ожидаем. Для того, чтобы попросить TS пересмотреть свое отношение к определенному типу, используется механизм утверждения типа.

    const fetchData = (url: string, method: "GET" | "POST"): void => {
      console.log(method);
    };

    const reqOptions = {
      url: "https://someurl.com",
      method: "GET",
    };

    fetchData("qqq", "GET");
    fetchData(reqOptions.url, reqOptions.method); // Error

Свойство reqOptions.method имеет тип string, а значит не подходит под аннотацию аргумента с литералами. Если мы точно знаем, что значение свойства подходит, то мы можем утвердить это значение оператором **as**:

    fetchData(reqOptions.url, reqOptions.method as "GET");

### Аналог решения:

Утвердить значение еще на этапе объекта.

    const reqOptions = {
      url: "https://someurl.com",
      method: "GET" as "GET",
    };

Но чаще приходится утверждать тип в момент использования

---

### Второй - превратить весь объект в литерал типа:

    const reqOptions = {
      url: "https://someurl.com",
      method: "GET",
    } as const;

---

### Альтернатива через угловые скобки

Существует **альтернативный синтаксис** утверждения типов, через угловые скобки. Он **не так удобен и не работает** в некоторых технологиях, где идёт конфликт по скобкам (например React):

    fetchData(reqOptions.url, <"GET">reqOptions.method);

---

### DOM

Часто утверждение типов можно встретить при работе с DOM-деревом, когда мы хотим уточнить, с каким элементом мы работаем:

    const box = document.querySelector(".box") as HTMLElement;
    const input = document.querySelector("input") as HTMLInputElement;
    // Альтернативный:
    const input = <HTMLInputElement>document.querySelector("input");
