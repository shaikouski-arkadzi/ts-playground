"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1) Строковый литерал
const direction = "left";
// Тип: "left" (а не string)
// 2) Массив как readonly tuple
const roles = ["admin", "user", "guest"];
// "admin" | "user" | "guest"
// 3) Объект
const config = {
    retries: 3,
    mode: "dark",
};
