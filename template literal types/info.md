# Template literal types

При создании новых типов есть механизм, похожий на стандартную интерполяцию строк в JS. Он позволяет формировать литеральные типы по тем же синтаксическим правилам(косые кавычки, обрамление переменных в ${}):

    type MyAnimation = "fade";
    type MyNewAnimation = `${MyAnimation}In`; // "fadeIn"

При использовании union type будет формироваться так же тот же тип, но с модификациями:

    type MyAnimation = "fade" | "swipe";
    type MyNewAnimation = `${MyAnimation}In`;
    // "fadeIn" | "swipeIn"

---

    type MyAnimation = "fade" | "swipe";
    type Direction= "In" | "Out";
    type MyNewAnimation = `${MyAnimation}${Direction}`;
    // "fadeIn" | "fadeOut" | "swipeIn" | "swipeOut"

Для удобных модификаций были добавлены специальные дженерики по работе со строками. Передача в них не строки ведет к ошибке

    Uppercase<StringType>
    Lowercase<StringType>
    Capitalize<StringType>
    Uncapitalize<StringType>

---

    type MyAnimation = "fade" | "swipe";
    type Direction= "in" | "out";
    type MyNewAnimation = `${MyAnimation}${Capitalize<Direction>}`;
    // "fadeIn" | "fadeOut" | "swipeIn" | "swipeOut"

Этот механизм можно использовать внутри Mapped types для изменения названий свойств:

    interface Currencies {
      usa: "usd";
      china: "cny";
      ukraine: "uah";
      kz: "tenge";
    }

    type CreateCustomCurr<T> = {
      [P in keyof T as `custom${Capitalize<string & P>}`]: string;
    };

    type CustomCurrencies = CreateCustomCurr<Currencies>;
