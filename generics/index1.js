"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logMiddleware(data) {
    console.log(data);
    return data;
}
const res = logMiddleware(10);
function toString(data) {
    if (Array.isArray(data)) {
        return data.toString();
    }
    switch (typeof data) {
        case "string":
            return data;
        case "number":
        case "symbol":
        case "bigint":
        case "boolean":
        case "function":
            return data.toString();
        case "object":
            return JSON.stringify(data);
        default:
            return undefined;
    }
}
const logLine = {
    timestamp: new Date(),
    data: {
        a: 1,
    },
};
class Vehicle {
}
function kmToMiles(vehicle) {
    vehicle.run = vehicle.run / 0.62;
    return vehicle;
}
class LCV extends Vehicle {
}
const vehicle = kmToMiles(new Vehicle());
const lcv = kmToMiles(new LCV());
function logId(id) {
    console.log(id);
    return id;
}
