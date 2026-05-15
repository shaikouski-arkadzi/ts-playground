interface User {
  name: string;
  email: string;
  login: string;
}

const user: User = {
  name: "Вася",
  email: "vasiliy@yandex.ru",
  login: "vasia",
};

interface Admin {
  name: string;
  role: number;
}

const admin: Admin = {
  ...user,
  role: 1,
};

function userToAdmin(user: User): Admin {
  return {
    name: user.login,
    role: 1,
  };
}

export {};
