"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUser() {
    if (Math.random() > 0.5) {
        return null;
    }
    else {
        return {
            name: "Вася",
        };
    }
}
const user = getUser();
if (user) {
    const userName = user.name;
}
