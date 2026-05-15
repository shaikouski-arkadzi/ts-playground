"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    name: "Вася",
    email: "vasiliy@yandex.ru",
    login: "vasia",
};
const admin = Object.assign(Object.assign({}, user), { role: 1 });
function userToAdmin(user) {
    return {
        name: user.login,
        role: 1,
    };
}
