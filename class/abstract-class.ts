abstract class Controller {
  abstract handle(req: any): void;

  handleWithLogs(req: any) {
    console.log("Start");
    this.handle(req);
    console.log("Start");
  }
}

class UserController extends Controller {
  handle(req: any): void {
    console.log(req);
  }
}

abstract class Logger {
  abstract log(message: string): void;

  printDate(date: Date) {
    this.log(date.toString());
  }
}

class MyLogger extends Logger {
  log(message: string): void {
    console.log(message);
  }

  logWithDate(message: string) {
    this.printDate(new Date());
    this.log(message);
  }
}

export {};
