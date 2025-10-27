# Generics

**Механизм обобщений** (_generics, дженерики_) позволяет поставить "заглушку", которая будет заменена при использовании. **T** - это и есть такая заглушка, которая записывается в угловых скобках и дальше используется для типизации аргумента и возвращаемого значения. При вызове функции мы можем подставить **любой тип** и TS на выходе будет знать, что помещается в результат.

    function processingData<T>(data: T): T {
      //...
      return data;
    }

    let res1 = processingData(1);  // type number
    let res2 = processingData("1");  // type string

## Правила использования обобщений

Обобщения можно создавать для типов, интерфейсов, функций, методов и классов.  
Для перечислений (enum) этого делать нельзя. Пример с интерфейсом:

    interface Print<Type> {
        design: Type;
    }

    const somePrint: Print<string> = {
        design: "ten",
    };

    const someOtherPrint: Print<number> = {
        design: 10,
    };

Для дженериков можно использовать любые названия и обозначения. Все зависит от сложности:  
В простых случаях, обычно, используются буквы **T, U, V, S**. Если там будет **property** – то **P**, если **ключ/значение** – то **K/V**.
Идентификаторы всегда прописываются с большой буквы.  
В сложных случаях, обычно, эту заглушку описывают более подробно:  
`ReferralSystem<UserID, UserReferrals>`  
(количество неограничено, прописываются через запятую)

## Функции-обобщения

Для выполнения разных операций с разными типами данных используем **сужение типов**:

    function processingData<T, S>(data: T, options: S): string {
        switch (typeof data) {
            case "string":
                return `${data}, speed: ${options}`;
            case "number":
                return `${data.toFixed()}, speed: ${options}`;
            default:
                return "Not valid";
        }
    }

Для методов точно такие же правила, как и для функций. А если они описаны в интерфейсе, то есть несколько вариантов синтаксиса:

    interface DataSaver {
      processing: <T>(data: T) => T;
    }

    const saver: DataSaver = {
      processing: <T>(data: T) => {
        // ... Some actions
        console.log(data);
        return data;
      },
    };

    saver.processing(5);

---

    interface DataSaver {
      processing: <T>(data: T) => T;
    }

    const saver: DataSaver = {
      processing: (data) => {
        // ... Some actions
        console.log(data);
        return data;
      }
    };

    saver.processing(5);

## Функции-обобщения как аннотации

Функции-обобщения можно использовать в качестве аннотаций. Например, создаем отдельную функцию-шаблон, а потом используем в нужных местах:

    function processing<T>(data: T): T {
      return data;
    }

    let newFunc: <T>(data: T) => T = processing;

    interface DataSaver {
      processing: <T>(data: T) => T;
    }

    const saver: DataSaver = {
      processing: processing
    };

Если мы хотим оптимизировать саму аннотацию, то можно вынести её в отдельный интерфейс:

    interface ProcessingFn {
      <T>(data: T): T
    }

    function processing<T>(data: T): T {
      return data;
    }

    let newFunc: ProcessingFn = processing;

    interface DataSaver {
      processing: ProcessingFn;
    }

## Обобщенный типы и интерфейсы

Создание обобщенного type так же позволяет подставлять нужный тип уже во время использования. Синтаксис использует все те же идентификаторы в угловых скобках:

    // Синтаксис
    type MyType<T> = T;

    // Использование
    let value: MyType<string> = "hello";

    // Использование с литералом
    type Status<T> = {
      code: T;
      message: string;
    };

Type так же позволяет создавать generic helper types за счет поддержки литеральных значений.

    type OrNull<Type> = Type | null;

    type OneOrMany<Type> = Type | Type[];

    const data: OneOrMany<number[]> = [5];

### Интерфейсы

    // Пример 1
    interface User<T> {
      login: T;
      age: number;
    }

    // Пример 2
    interface User<ParentsData> {
      login: string;
      age: number;
      parents: ParentsData;
    }

Проблема следующего кода в том, что при создании объекта мы можем поместить в свойство parents все что угодно. А по задумке это должен быть объект со свойствами mother и father:

    interface User<ParentsData> {
      login: string;
      age: number;
      parents: ParentsData;
    }

    const user: User<{mother: string, father: string}> = {
      login: "str",
      age: 54,
      parents: {mother: 'Anne', father: 'no data'}
    };

Эту проблему можно решить, если создать отдельный интерфейс и типизировать свойство parents. Но проблема в том, что тогда в этот объект не сможет попасть никакое другое свойство. А мы бы хотели сделать его расширяемым, но с двумя обязательными свойствами:

    interface ParentsOther {
      mother: string;
      father: string;
    }

    interface User {
      login: string;
      age: number;
      parents: ParentsOther;
    }

    const user: User = {
      login: "str",
      age: 54,
      parents: {mother: "Anne", father: "no data"} // Никаких других свойств
    };

Для решения этой задачи и создан механизм ограничения, который позволит "ограничить" идентификатор в дженерике. В данном случае мы можем сказать, что он будет только объектом любого размера с двумя обязательными свойствами. Для этого используем **extends**:

    interface ParentsOther {
      mother: string;
      father: string;
    }

    interface User<ParentsData extends ParentsOther> {
      login: string;
      age: number;
      parents: ParentsData;
    }

    const user: User<{mother: string; father: string; married: boolean}> = {
      login: "str",
      age: 54,
      parents: {mother: "Anne", father: "no data", married: true}
    };

Для ограничений можно использовать и примитивные типы, в том числе и union. Например функция, которая принимает только строку или число:

    const depositMoney = <T extends string | number>(amount: T): T => {
      console.log(`req to server with amount: ${amount}`);
      return amount;
    };

Альтернативный вариант с использованием обычного union типа так же можно использовать. Но тут будет повторение кода:

    const depositMoney = (amount: number | string): number | string => {
      console.log(`req to server with amount: ${amount}`);
      return amount;
    };
