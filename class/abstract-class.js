"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    handleWithLogs(req) {
        console.log("Start");
        this.handle(req);
        console.log("Start");
    }
}
class UserController extends Controller {
    handle(req) {
        console.log(req);
    }
}
class Logger {
    printDate(date) {
        this.log(date.toString());
    }
}
class MyLogger extends Logger {
    log(message) {
        console.log(message);
    }
    logWithDate(message) {
        this.printDate(new Date());
        this.log(message);
    }
}
