"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor(items) {
        this.items = items;
    }
}
class Accordion {
}
class ExtendedListClass extends List {
    first() {
        return this.items[0];
    }
}
function ExtendedList(Base) {
    return class ExtendedList extends Base {
        first() {
            return this.items[0];
        }
    };
}
// ExtendedList - это функция, принимающая класс (Base), а не экземпляр
// Класс-аргумент должен соответствовать типу ListType (то есть быть конструктором, возвращающим List)
// Функция возвращает новый класс, который extends Base и добавляет метод first()
class AccordionList {
    constructor(items) {
        this.items = items;
    }
}
const list = ExtendedList(AccordionList);
const res = new list(["first", "second"]);
