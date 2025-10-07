type User = {
  name: string;
  age: number;
  skills: string[];
};

type TRole = {
  name: string;
  id: number;
};

// type UserWithRole = User & TRole;

type UserWithRole = {
  user: User;
  role: TRole;
};

interface IUser {
  name: string;
  age: number;
  skills: string[];

  log?: (id: number) => string;
}

interface IRole {
  roleId: number;
}

interface IUserWithRole extends IUser, IRole {
  createdAt: Date;
}

interface UserDic {
  [index: number]: IUser;
}
// Аналог
type ud = Record<number, IUser>;

const userDicObj: UserDic = {
  1: {
    name: "Misha",
    age: 30,
    skills: ["JS", "Java"],
  },
};

export {};
