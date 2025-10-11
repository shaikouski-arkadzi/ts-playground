"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    name: "Вася",
    email: "vasiliy@yandex.ru",
    login: "vasia",
};
function logId(id) {
    if (isString(id)) {
        console.log(id);
    }
    else {
        console.log(id);
    }
}
// primitive type guard
function isString(x) {
    return typeof x === "string";
}
// object type guard
// role есть в Admin
// но нет в User
function isAdmin(user) {
    return "role" in user;
}
function isAdminAlternative(user) {
    return user.role !== undefined;
}
function setRoleZero(user) {
    if (isAdmin(user)) {
        user.role = 0;
    }
    else {
        throw new Error("Пользователь не админ");
    }
}
