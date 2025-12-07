interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

let toDoList: ToDo[] = [];

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

export {};
