# Mapped types

TS позволяет формировать объектные типы путем перебора и модификации исходного типа. Этот механизм называется Mapped types (сопоставление типов). К примеру, мы можем сформировать:

    interface Currencies {
      usa: "usd";
      china: "cny";
      ukraine: "uah";
      kz: "tenge";
    }
                        |
    		   \/
    type CustomCurrencies = {
      usa: string;
      china: string;
      ukraine: string;
      kz: string;
    }

Для оптимизации работы воспользуемся Mapped types, синтаксис которых:

    type СопоставимыйТип = {
        [ПроизвольныйИдентификатор in Множество] ПроизвольныйТипДанных;
    };

Сформированный тип должен быть обязательно задан через type. В самом простом варианте его можно применять к обычным литералам:

    type Keys = "name" | "age" | "role";

    type User = {
    	[K in Keys]: string;
    };

    const alex: User = {
    	name: "Alex",
    	age: "25",
    	role: "admin",
    }

Но в практике чаще всего mapped types комбинируется с **дженериками**. Для создания нового типа на базе интерфейса валют создадим тип:

    type CreateCustomCurr<T> = {
    	[P in keyof T]: string;
    };

    type CustomCurrencies = CreateCustomCurr<Currencies>

Где **P** - это свойства, которые берутся из ключей приходящего в дженерик типа. **keyof T** - получение этих ключей. Вместо string может быть **какой угодно тип**, необходимый вам. Таким образом мы установили связь между типами и удаление одного из свойств в **Currencies** приведет к изменению типа **CustomCurrencies**

Также можно испоьзовать mapped types + **readonly** или **optional**:

    type CreateCustomCurr<T> = {
        readonly [P in keyof T]: string;
    };

    type CreateCustomCurr<T> = {
        [P in keyof T]?: string;
    };

Так же существуют операторы “+” и “-”, которые добавляют или убирают эти модификаторы из исходного типа. Оператор “+” аналогичен записи выше, когда идет простое добавление.

    type CreateCustomCurr<T> = {
        -readonly [P in keyof T]-?: string;
    };

**Снимаем** модификаторы **readonly** и **optional**
