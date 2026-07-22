# Типы конструкторов (`new`) и Mixins в TypeScript

## Класс в TypeScript — это две сущности одновременно

Когда мы пишем:

```ts
class User {
  name = "Alex";
}
```

TypeScript создает сразу две вещи:

### 1. Тип экземпляра

```ts
User;
```

Описывает объект, который получится после вызова `new User()`:

```ts
const user: User = new User();
```

Тип объекта:

```ts
{
  name: string;
}
```

---

### 2. Тип конструктора

Сам класс тоже является объектом.

Его можно передавать в переменные и функции:

```ts
new User();
```

Для получения типа конструктора используется:

```ts
typeof User;
```

Тип конструктора выглядит примерно так:

```ts
new () => User
```

То есть:

> Функция-конструктор, которая создает объект типа User.

---

# Что означает `new` в типах

Можно описать любой конструктор:

```ts
type Constructor = new () => {};
```

Читается как:

> Любой объект, который можно вызвать через `new`.

Пример:

```ts
class User {}

class Admin {}

let c: Constructor;

c = User;
c = Admin;
```

Работает, потому что оба класса можно вызвать через `new`.

---

Не работает:

```ts
function test() {}

c = test;
```

Потому что обычная функция не соответствует типу конструктора.

---

# Generic-конструктор

Часто используется такой тип:

```ts
type GConstructor<T> = new (...args: any[]) => T;
```

Расшифровка:

```ts
new (...args: any[]) => T
```

Означает:

> Конструктор принимает любые аргументы и создает объект типа `T`.

---

Пример:

```ts
class User {
  name = "";
}
```

Создаем тип конструктора:

```ts
type UserConstructor = GConstructor<User>;
```

Получаем:

```ts
type UserConstructor = new (...args: any[]) => User;
```

---

Теперь можно написать:

```ts
let c: UserConstructor;

c = User;
```

Потому что:

```ts
new User();
```

действительно возвращает объект типа `User`.

---

# Зачем нужны типы конструкторов

Представим функцию:

```ts
function createInstance(Ctor: GConstructor<User>) {
  return new Ctor();
}
```

Использование:

```ts
class User {
  name = "Alex";
}

createInstance(User);
```

Важно:

Функция получает **класс**, а не объект.

---

# Разбор примера с List

Есть класс:

```ts
class List {
  constructor(public items: string[]) {}
}
```

Создается:

### Тип экземпляра

```ts
List;
```

### Тип конструктора

```ts
typeof List;
```

---

Создаем тип конструктора:

```ts
type ListType = GConstructor<List>;
```

Получаем:

```ts
type ListType = new (...args: any[]) => List;
```

То есть:

> Любой класс, создающий объект типа List.

---

# Что принимает функция ExtendedList

```ts
function ExtendedList<TBase extends ListType>(Base: TBase) {}
```

Это означает:

```ts
ExtendedList(List);
```

Работает.

---

А это не работает:

```ts
const obj = new List(["a"]);

ExtendedList(obj);
```

Потому что функция ожидает:

```ts
List;
```

(класс)

а не:

```ts
new List(...)
```

(экземпляр)

---

# Что происходит внутри ExtendedList

Допустим есть функция:

```ts
function ExtendedList<TBase extends ListType>(Base: TBase) {
  return class ExtendedList extends Base {
    first() {
      return this.items[0];
    }
  };
}
```

Если вызвать:

```ts
ExtendedList(List);
```

То фактически получится:

```ts
class ExtendedList extends List {
  first() {
    return this.items[0];
  }
}
```

То есть функция создает новый класс на основе существующего.

---

# Что хранится в переменной list

```ts
const list = ExtendedList(List);
```

Многие думают, что `list` — это объект.

На самом деле нет.

`list` — это новый класс.

Примерно такой:

```ts
const list = class extends List {
  first() {
    return this.items[0];
  }
};
```

---

Проверка:

```ts
console.log(typeof list);
```

Результат:

```ts
"function";
```

Потому что класс в JavaScript является функцией-конструктором.

---

# Что происходит при new list()

```ts
const res = new list(["first", "second"]);
```

Пошагово:

### Шаг 1

Берется класс:

```ts
class extends List {
  first() {
    return this.items[0];
  }
}
```

### Шаг 2

Создается объект:

```ts
{
  items: ["first", "second"],
  first() {}
}
```

### Шаг 3

Можно использовать новый метод:

```ts
res.first();
```

Результат:

```ts
"first";
```

---

# Что такое Mixins

Mixin — это функция, которая принимает класс и возвращает новый класс с дополнительной функциональностью.

Пример:

```ts
function WithFirst<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    first() {
      return "first";
    }
  };
}
```

---

Использование:

```ts
class UsersList {}

const UsersListWithFirst = WithFirst(UsersList);
```

Теперь новый класс содержит дополнительный метод:

```ts
const users = new UsersListWithFirst();

users.first();
```

---

# Зачем нужны Mixins

Допустим есть несколько классов:

```ts
class UsersList {}
class ProductsList {}
class OrdersList {}
```

Нужно добавить всем метод:

```ts
first();
```

Без mixin придется дублировать код:

```ts
class UsersList extends ...
class ProductsList extends ...
class OrdersList extends ...
```

---

С mixin:

```ts
const UsersListWithFirst = WithFirst(UsersList);

const ProductsListWithFirst = WithFirst(ProductsList);

const OrdersListWithFirst = WithFirst(OrdersList);
```

Одна функция добавляет функциональность любому классу.

---

# Визуальная схема

```text
class List
     │
     │ передаем класс
     ▼

ExtendedList(List)

     │
     │ создает новый класс
     ▼

class extends List {
  first() {}
}

     │
     │ сохраняем
     ▼

const list = ...

     │
     │ создаем объект
     ▼

const res = new list(...)

     │
     ▼

{
  items: [...],
  first() {}
}
```

---

# Главное запомнить

```ts
List;
```

и

```ts
new List();
```

это разные вещи.

### Класс (конструктор)

```ts
List;
```

Тип:

```ts
typeof List;
```

или

```ts
new (...args) => List
```

---

### Экземпляр

```ts
new List();
```

Тип:

```ts
List;
```

---

Поэтому типы вида:

```ts
new (...args) => T
```

используются для описания классов-конструкторов, которые можно:

- передавать в функции;
- создавать через `new`;
- расширять через mixins;
- использовать для динамического создания объектов.
