"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Гидрогенный enum
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "s";
    StatusCode["IN_PROCESS"] = "p";
    StatusCode["FAILED"] = "0";
})(StatusCode || (StatusCode = {}));
const response = {
    message: "Платеж успешен",
    statusCode: StatusCode.SUCCESS,
};
if (response.statusCode === StatusCode.SUCCESS) {
}
function action(status) { }
// Можем передавать только ключ enum
action(StatusCode.SUCCESS);
