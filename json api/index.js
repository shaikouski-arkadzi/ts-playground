"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let toDoList = [];
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => res.json())
    .then((json) => {
    if ("id" in json) {
        toDoList.push(json);
    }
    if (Array.isArray(json)) {
        toDoList = json;
    }
    console.log(toDoList);
});
