"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status;
(function (Status) {
    Status["Available"] = "available";
    Status["NotAvailable"] = "not available";
})(Status || (Status = {}));
function isAvailable(response) {
    return response.status === Status.Available;
}
function checkAnimalData(animal) {
    if (isAvailable(animal)) {
        return animal.data;
    }
    else {
        return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
    }
}
