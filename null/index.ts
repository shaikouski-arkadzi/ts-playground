interface User {
  name: string;
}

function getUser() {
  if (Math.random() > 0.5) {
    return null;
  } else {
    return {
      name: "Вася",
    } as User;
  }
}

const user = getUser();
if (user) {
  const userName = user.name;
}

// null явно заданный неопределенный объект
// undefined не явное

export {};
