// 1) Строковый литерал
const direction = "left" as const;
// Тип: "left" (а не string)

// 2) Массив как readonly tuple
const roles = ["admin", "user", "guest"] as const;
// Тип: readonly ["admin", "user", "guest"]

type Role = (typeof roles)[number];
// "admin" | "user" | "guest"

// 3) Объект
const config = {
  retries: 3,
  mode: "dark",
} as const;
// Тип:
// {
//   readonly retries: 3;
//   readonly mode: "dark";
// }
