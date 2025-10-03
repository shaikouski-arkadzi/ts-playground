// Гидрогенный enum
enum StatusCode {
  SUCCESS = "s",
  IN_PROCESS = "p",
  FAILED = "0",
}

const response = {
  message: "Платеж успешен",
  statusCode: StatusCode.SUCCESS,
};

if (response.statusCode === StatusCode.SUCCESS) {
}

function action(status: StatusCode) {}

// Можем передавать только ключ enum
action(StatusCode.SUCCESS);
// По значению выховет ошибку
// action("s"); Argument of type '"s"' is not assignable to parameter of type 'StatusCode'
