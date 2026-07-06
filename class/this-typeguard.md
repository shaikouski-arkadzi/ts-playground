# This-based Type Guards

`this` как тип можно использовать для создания **type guard**-методов прямо внутри класса. Это особенно полезно при работе с union-типами, состоящими из классов одной иерархии.

## Пример задачи

Есть переменная `user` типа:

```ts
UserBuilder | AdminBuilder;
```

Нужно разделить поток выполнения в зависимости от реального типа объекта.

## Без type guard

Если метод `isAdmin` возвращает обычный `boolean`, TypeScript не сможет сузить тип:

```ts
class UserBuilder {
  isAdmin(): boolean {
    return this instanceof AdminBuilder;
  }
}
```

Использование:

```ts
let user: UserBuilder | AdminBuilder = new UserBuilder();

if (user.isAdmin()) {
  console.log(user); // тип: UserBuilder | AdminBuilder
} else {
  console.log(user); // тип: UserBuilder | AdminBuilder
}
```

Несмотря на проверку, в обеих ветках `user` остаётся union-типом.

---

## С type guard

Используйте синтаксис:

```ts
this is ТипКласса
```

```ts
class UserBuilder {
  isAdmin(): this is AdminBuilder {
    return this instanceof AdminBuilder;
  }
}
```

Теперь TypeScript понимает, какой тип находится в каждой ветке.

```ts
let user: UserBuilder | AdminBuilder = new UserBuilder();

if (user.isAdmin()) {
  console.log(user); // тип: AdminBuilder
} else {
  console.log(user); // тип: UserBuilder
}
```

## Как это работает

Возвращаемый тип

```ts
this is AdminBuilder
```

говорит TypeScript:

> Если метод вернул `true`, то текущий объект (`this`) имеет тип `AdminBuilder`.

Поэтому после вызова метода компилятор автоматически сужает тип объекта.

## Когда использовать

This-based type guards особенно полезны, когда:

- есть иерархия классов;
- используется `instanceof`;
- требуется безопасное сужение типов без дополнительных приведения (`as`).

Такой подход делает код более читаемым и позволяет TypeScript точнее анализировать типы.
