# Приём с `as const` и `typeof ... keyof ...`

Взамен eum лучше использовать следующий **TypeScript-приём** для создания **строго типизированного enum-like объекта** и получения **union типа его значений**.

---

## Код

```ts
export const UserRole = {
  Student: "STUDENT",
  Curator: "CURATOR",
  Admin: "ADMIN",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
```

---

## Что тут происходит

### 1. Объявление объекта

```ts
export const UserRole = {
  Student: "STUDENT",
  Curator: "CURATOR",
  Admin: "ADMIN",
} as const;
```

- `UserRole` — это объект с константными строковыми значениями.
- `as const` говорит TypeScript: «сделай все значения **литералами**, а не просто `string`».

Без `as const` `Student` имел бы тип `string`, а с ним — именно `'STUDENT'`.

---

### 2. Получение union-типа значений

```ts
export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
```

Разберём пошагово:

1. `typeof UserRole` → берём тип объекта:

   ```ts
   {
     readonly Student: 'STUDENT';
     readonly Curator: 'CURATOR';
     readonly Admin: 'ADMIN';
   }
   ```

2. `keyof typeof UserRole` → ключи этого объекта:

   ```ts
   "Student" | "Curator" | "Admin";
   ```

3. `typeof UserRole[keyof typeof UserRole]` → значения по этим ключам:

   ```ts
   "STUDENT" | "CURATOR" | "ADMIN";
   ```

---

## Итог

```ts
type UserRoleType = "STUDENT" | "CURATOR" | "ADMIN";
```
