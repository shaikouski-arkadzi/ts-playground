// Request
type Animal = "cat" | "dog" | "bird";

interface Request {
  animal: Animal;
  breed: string;
  sterilized?: string;
}

enum Status {
  Available = "available",
  NotAvailable = "not available",
}

// Response #1
interface Data extends Request {
  location: string;
  age?: number;
}

interface Response1 {
  status: Status.Available;
  data: Data;
}

// Response #2
interface Response2 {
  status: Status.NotAvailable;
  data: {
    message: string;
    nextUpdateIn: Date;
  };
}

function isAvailable(response: Response1 | Response2): response is Response1 {
  return response.status === Status.Available;
}

function checkAnimalData(animal: Response1 | Response2): Data | string {
  if (isAvailable(animal)) {
    return animal.data;
  } else {
    return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
  }
}

export {};
