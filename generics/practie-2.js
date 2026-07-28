"use strict";
/*
  Необходимо написать функцию сортировки любых объектов,
  которые имеют id
  по убыванию и по возрастанию
*/
Object.defineProperty(exports, "__esModule", { value: true });
const data = [
    { id: 1, name: "Вася" },
    { id: 2, name: "Петя" },
    { id: 3, name: "Надя" },
];
function sort(data, type = "asc") {
    return data.sort((a, b) => {
        switch (type) {
            case "asc":
                return a.id - b.id;
            case "desc":
                return b.id - a.id;
        }
    });
}
