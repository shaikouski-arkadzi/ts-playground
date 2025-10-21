interface Car {
  name: "car";
  engine: string;
  wheels: number;
}

interface Ship {
  name: "ship";
  engine: string;
  sail: string;
}

interface Airplane {
  name: "airplane";
  engine: string;
  wings: string;
}

interface SuperAirplane {
  name: "smth";
  engine: string;
  wings: string;
}

type Vehicle = Car | Ship | Airplane | SuperAirplane;

// Если мы добавяем новый интерфейс в union type Vehicle
// И не сделали проверку в switch будет ошибка
// Type 'NewInterface' is not assignable to type 'never'
// Прием с never позволяет не забыть обработать новый интерфейс
function repairVehicle(vehicle: Vehicle) {
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
      const smth: never = vehicle;
      console.log("Ouuuups!");
  }
}

export {};
