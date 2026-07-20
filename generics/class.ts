class Resp<Data, Err> {
  data?: Data;
  error?: Err;

  constructor(data?: Data, error?: Err) {
    if (data) this.data = data;
    if (error) this.error = error;
  }
}

const res = new Resp<string, number>("data", 0);

class HTTPResp<F> extends Resp<string, number> {
  code!: F;

  setCode(code: F) {
    this.code = code;
  }
}
