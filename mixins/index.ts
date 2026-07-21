// new в типе — это описание: "это штука, которую можно вызвать через new"
// типа конструктора — типа, описывающего класс (не экземпляр класса)
type Constructor = new (...args: any[]) => {};
type GConstructor<T> = new (...args: any[]) => T;

class List {
  constructor(public items: string[]) {}
}

class Accordion {
  isOpened!: boolean;
}

type ListType = GConstructor<List>;
type AccordionType = GConstructor<Accordion>;

class ExtendedListClass extends List {
  first() {
    return this.items[0];
  }
}

function ExtendedList<TBase extends ListType & AccordionType>(Base: TBase) {
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
  isOpened!: boolean;
  constructor(public items: string[]) {}
}

const list = ExtendedList(AccordionList);
const res = new list(["first", "second"]);

export {};
