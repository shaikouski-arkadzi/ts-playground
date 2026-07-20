function logMiddleware<T>(data: T): T {
  console.log(data);
  return data;
}

const res = logMiddleware(10);

function toString<T>(data: T): string | undefined {
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

interface ILogLine<T> {
  timestamp: Date;
  data: T;
}

const logLine: ILogLine<{ a: number }> = {
  timestamp: new Date(),
  data: {
    a: 1,
  },
};

class Vehicle {
  run!: number;
}

function kmToMiles<T extends Vehicle>(vehicle: T): T {
  vehicle.run = vehicle.run / 0.62;
  return vehicle;
}

class LCV extends Vehicle {
  capacity!: number;
}

const vehicle = kmToMiles(new Vehicle());
const lcv = kmToMiles(new LCV());

function logId<T extends string | number>(id: T): T {
  console.log(id);
  return id;
}

export {};
