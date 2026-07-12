# Mapping в TypeScript

## Что такое Mapping

**Mapping** — это преобразование данных из одной структуры в другую.

Проще:

```text
Один объект → другой объект
```

---

## Зачем нужен Mapping

Используется, когда:

- backend и frontend имеют разные модели данных;
- нужно скрыть лишние поля;
- нужно изменить формат данных;
- нужно адаптировать ответ API;
- нужно преобразовать DTO → Entity (или Domain Model);
- нужно подготовить данные для UI.

---

# Базовый пример

## Исходный объект

```ts
interface User {
  name: string;
  email: string;
  login: string;
}
```

## Целевая структура

```ts
interface Admin {
  name: string;
  role: number;
}
```

## Mapping

```ts
function userToAdmin(user: User): Admin {
  return {
    name: user.login,
    role: 1,
  };
}
```

---

## Что происходит

### Было

```ts
{
  name: "Вася",
  email: "vasiliy@yandex.ru",
  login: "vasia"
}
```

### Стало

```ts
{
  name: "vasia",
  role: 1
}
```

---

# Основные виды Mapping

## 1. Поле → поле

```ts
name: user.name;
```

Самый простой вариант — значение копируется без изменений.

---

## 2. Переименование поля

```ts
name: user.login;
```

Было:

```text
login
```

Стало:

```text
name
```

---

## 3. Добавление новых данных

```ts
role: 1;
```

Поле отсутствовало в исходном объекте и создается при преобразовании.

---

## 4. Удаление лишних полей

Было:

```ts
{
  (name, email, login);
}
```

Стало:

```ts
{
  (name, role);
}
```

Поле `email` не попадает в новый объект.

---

## 5. Изменение типа

Было:

```ts
age: "25";
```

Стало:

```ts
age: Number(user.age);
```

Тип изменился со `string` на `number`.

---

## 6. Computed Mapping (вычисляемые поля)

Можно создавать новые значения на основе существующих.

```ts
fullName: `${user.name} ${user.surname}`;
```

---

# Mapping массива

Очень распространенный сценарий.

## Было

```ts
const users: User[] = [...];
```

## Стало

```ts
const admins = users.map((user) => ({
  name: user.login,
  role: 1,
}));
```

Каждый элемент массива преобразуется в новый объект.

---

# `.map()` в TypeScript

Метод массива для преобразования каждого элемента.

### Схема

```text
Array<A> → Array<B>
```

### Пример

```ts
const numbers = [1, 2, 3];

const strings = numbers.map((n) => String(n));
```

Результат:

```ts
["1", "2", "3"];
```

---

# Типизация Mapping

## Явный тип

```ts
function userToAdmin(user: User): Admin;
```

Функция принимает `User` и обязана вернуть `Admin`.

---

## Type Inference

TypeScript умеет выводить тип автоматически.

```ts
const admin = {
  name: user.login,
  role: 1,
};
```

---

# DTO Mapping

Очень важная тема в backend-разработке.

## DTO

**DTO (Data Transfer Object)** — объект для передачи данных между слоями приложения или между клиентом и сервером.

---

## Пример

### Ответ backend

```ts
interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
}
```

### Модель frontend

```ts
interface User {
  id: number;
  fullName: string;
}
```

### Mapping

```ts
function mapUser(response: UserResponse): User {
  return {
    id: response.id,
    fullName: `${response.first_name} ${response.last_name}`,
  };
}
```

---

# Mapping vs Spread

## Spread

Просто копирует свойства объекта.

```ts
{
  ...user
}
```

---

## Mapping

Позволяет полностью контролировать структуру нового объекта.

```ts
{
  name: user.login,
  role: 1
}
```

---

# Когда использовать Mapping

Используйте mapping, если нужно:

- изменить структуру объекта;
- переименовать поля;
- изменить типы данных;
- удалить лишние поля;
- добавить вычисляемые значения;
- адаптировать данные API под приложение.

---

# Когда достаточно Spread

Используйте spread, если:

- структура объектов практически одинаковая;
- требуется просто скопировать объект;
- не нужно изменять данные.

---

# Best Practices

## 1. Делайте отдельные mapper-функции

```ts
function mapUserToAdmin(user: User): Admin;
```

Преимущества:

- читаемость;
- тестируемость;
- переиспользование.

---

## 2. Не смешивайте mapping и бизнес-логику

Плохо:

```ts
if (user.isBlocked) {
  sendEmail();
}
```

Mapper должен выполнять только преобразование данных.

```text
данные → данные
```

---

## 3. Делайте mapping явным

Лучше:

```ts
return {
  name: user.login,
  role: 1,
};
```

Чем:

```ts
return {
  ...user,
  role: 1,
};
```

если структура объекта меняется.

---

# Частые ошибки

## 1. Слепое использование Spread

```ts
{
  ...user
}
```

Можно случайно передать:

- пароль;
- токен;
- приватные поля;
- служебные данные.

---

## 2. Нарушение типов

Неправильно:

```ts
role: "1";
```

Правильно:

```ts
role: 1;
```

---

## 3. Отсутствие mapper-слоя

Когда ответ API используется напрямую в UI.

Это приводит к:

- сильной связанности (tight coupling);
- сложному рефакторингу;
- хаосу в моделях данных.

---

# Архитектурная схема

```text
API DTO
   ↓
 Mapper
   ↓
Domain Model
   ↓
UI Model
```

---

# Итог

**Mapping** — это преобразование одной модели данных в другую.

Основные идеи:

- явное преобразование данных (explicit transformation);
- адаптация структур;
- безопасное преобразование типов;
- отделение API от приложения;
- чистая архитектура.
