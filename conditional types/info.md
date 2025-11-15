# Conditional types

Типы можно формировать при помощи тернарного оператора:

    SomeType extends OtherType TrueType ? : FalseType;

- Условные типы всегда предполагают использование ограничения, то есть ключевое слова extends. Проверяемый тип должен чем-то ограничиваться для проверки. В целом, это и есть условие

- Мы работаем с типами. При использовании литерала будет ошибка. Конкретные значения сначала необходимо преобразовать в тип с помощью оператора typeof:

      const str: string = "Hello";
      type Example = "string" extends str ? string : number; // Error
      type Example = "string" extends typeof str ? string : number; // Ok, string, тк тип переменной string

- Базовый синтаксис не очень полезен в работе. Поэтому условные типы вы почти всегда встретите в комбинации с дженериками.

      interface User<T extends "created" | Date> {
        created: T extends "created" ? "created" : Date;
      }
