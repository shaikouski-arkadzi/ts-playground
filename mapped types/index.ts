type Modifier = "read" | "update" | "create";

type UserRoles = {
  customers?: Modifier;
  projects?: Modifier;
  adminPanel?: Modifier;
};

type UserAccess1 = {
  customers?: boolean;
  projects?: boolean;
  adminPanel?: boolean;
};

type ModifierToAccess<T> = {
  [Property in keyof T]: boolean;
};

type UserAccess2 = ModifierToAccess<UserRoles>;
