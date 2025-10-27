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
