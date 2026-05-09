// Формирования типа, который возвращает указанный промис
type FromPromise = Awaited<Promise<number>>; // number

interface User {
  name: string;
}

async function fetchUser(): Promise<User[]> {
  const users: User[] = [
    {
      name: "Alex",
    },
  ];

  return users;
}

const users = fetchUser(); // Promise<User[]>

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUser>>; // User[]

// Реализация Awaited
type UnwrappedPromise<T> = T extends Promise<infer Return> ? Return : T;

export {};
