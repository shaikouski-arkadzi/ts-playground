interface IForm {
  name: string;
  password: string;
}

const form: IForm = {
  name: "Вася",
  password: "123",
};

const formValidation: TFormValidation<IForm> = {
  name: { isValid: true },
  password: { isValid: false, errorMessage: "Должен быть длиннее 5 символов" },
};

type TFormValidation<T> = {
  [Property in keyof T]:
    | { isValid: true }
    | { isValid: false; errorMessage: string };
};
