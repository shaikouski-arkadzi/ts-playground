"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const success = {
    errorCode: 200,
    data: "done", // string — корректно
    additionalData: "ok",
};
const failed = {
    errorCode: 500,
    data: new Error(), // Error — корректно
    additionalData: "fail",
};
function calculateAmountOfFigures(numOrStr) {
    if (typeof numOrStr === "string") {
        const obj = {
            weight: numOrStr,
        };
        return obj;
    }
    else {
        const obj = {
            calories: numOrStr,
        };
        return obj;
    }
}
function calculateAmountOfFigures2(numOrStr) {
    if (typeof numOrStr === "string") {
        const obj = {
            weight: numOrStr,
        };
        return obj;
    }
    else {
        const obj = {
            calories: numOrStr,
        };
        return obj;
    }
}
