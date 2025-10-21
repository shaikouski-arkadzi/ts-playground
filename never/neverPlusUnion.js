"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Если мы добавяем новый интерфейс в union type Vehicle
// И не сделали проверку в switch будет ошибка
// Type 'NewInterface' is not assignable to type 'never'
// Прием с never позволяет не забыть обработать новый интерфейс
function repairVehicle(vehicle) {
    switch (vehicle.name) {
        case "car":
            console.log(vehicle.wheels);
            break;
        case "ship":
            console.log(vehicle.sail);
            break;
        case "airplane":
            console.log(vehicle.wings);
            break;
        case "smth":
            console.log(vehicle.wings);
            break;
        default:
            const smth = vehicle;
            console.log("Ouuuups!");
    }
}
