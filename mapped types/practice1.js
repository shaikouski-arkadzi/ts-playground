"use strict";
const form = {
    name: "Вася",
    password: "123",
};
const formValidation = {
    name: { isValid: true },
    password: { isValid: false, errorMessage: "Должен быть длиннее 5 символов" },
};
