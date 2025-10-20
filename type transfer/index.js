"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const department = {
    name: "web-dev",
    budget: 50000,
};
function transformDepartment(department, amount) {
    return {
        name: department.name,
        projectBudget: amount,
    };
}
const mainProject = transformDepartment(department, 4000);
