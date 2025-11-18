// Необходимо типизировать этот большой объект
// Свойство futureClasses должно быть в зависимости от classes по типу
// Свойства exClients и futureClients тоже должны быть в зависимости от currClients
// ИЛИ все три зависят от общего родителя

// Простыми словами: при добавлении свойства в целевой объект они должны быть
// автоматически добавлены в зависимые (сразу подсказка от TS)

interface IClass {
  name: string;
  startsAt: string;
  duration: number;
}

interface IClient {
  name: string;
  age: "-" | number;
  gender: "male" | "female";
  timeLeft: string;
}

interface ICenter {
  clubName: string;
  location: string;
  classes: IClass[];
  futureClasses: Array<
    Omit<IClass, "startsAt"> & {
      willStartsAt: string;
    }
  >;
  currClients: IClient[];
  exClients: Array<
    Omit<IClient, "timeLeft"> & {
      makeCallFor: Date;
    }
  >;
  futureClients: Array<
    Pick<IClient, "name"> & {
      makeCallFor: Date;
    }
  >;
}

const fitnessClubCenter: ICenter = {
  clubName: "Fitness club Center",
  location: "central ave. 45, 5th floor",
  classes: [
    {
      name: "yoga",
      startsAt: "8:00 AM",
      duration: 60,
    },
    {
      name: "trx",
      startsAt: "11:00 AM",
      duration: 45,
    },
    {
      name: "swimming",
      startsAt: "3:00 PM",
      duration: 70,
    },
  ],
  futureClasses: [
    {
      name: "boxing",
      willStartsAt: "6:00 PM",
      duration: 40,
    },
    {
      name: "breath training",
      willStartsAt: "8:00 PM",
      duration: 30,
    },
  ],
  currClients: [
    {
      name: "John Smith",
      age: "-",
      gender: "male",
      timeLeft: "1 month",
    },
    {
      name: "Alise Smith",
      age: 35,
      gender: "female",
      timeLeft: "3 month",
    },
    {
      name: "Ann Sonne",
      age: 24,
      gender: "female",
      timeLeft: "5 month",
    },
  ],
  exClients: [
    {
      name: "Tom Smooth",
      age: 50,
      gender: "male",
      makeCallFor: new Date("2023-08-12"),
    },
  ],
  futureClients: [
    {
      name: "Maria",
      makeCallFor: new Date("2023-07-10"),
    },
  ],
};

export {};
