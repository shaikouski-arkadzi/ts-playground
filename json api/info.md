# Работа с json и запросами

Чтобы мы не делали, максимально типизировать парсинг json-строки в TS мы не сможем. Эта операция происходит в **рантайме**, то есть при запуске кода и в самой строке может быть **что угодно**. Так что такой код особого смысла не имеет:

    const jsonTest = '{ "name": "Test", "data": "dfdg"}';

    interface JSONTest {
        name: string;
        data: number;
    }

    const objFromJson: JSONTest = JSON.parse(jsonTest);

Результат работы будет **any** и подсказок никаких TS не даст. Для правильной обработки таких данных можно использовать стандартные техники: проверка на наличие нужных свойств, значений, типов и тп. В TS можно **вместо any вернуть unknown** и обрабатывать его через сужение типов:

    const userData =
        '{"isBirthdayData": true, "ageData": 40, "userNameData": "John"}';

    function safeParse(s: string): unknown {
        return JSON.parse(s);
    }

    const data = safeParse(userData);

    function transferData(d: unknown): void {
        if (typeof d === "string") {
            console.log(d.toLowerCase());
        } else if (typeof d === "object" && d) {
            console.log(data);
        } else {
            console.error("Some error");
        }
    }

При работе с запросами и получении данных с сервера та же схема. **Получили данные и проверяете их:**

    fetch("https://jsonplaceholder.typicode.com/todos/1")
    	.then((res) =>  res.json())
    	.then((json) => {
    		if ("id"  in  json) {
    			toDoList.push(json);
    		}
    		console.log(toDoList);
    	});

Такие условия в запросах можно расширять по вашим нуждам. Проверять на тип данных и содержимое в них:

    fetch("https://jsonplaceholder.typicode.com/todos/1")
    	.then((res) =>  res.json())
    	.then((json) => {
    		if ("id"  in  json) {
    			toDoList.push(json);
    		}
    		if (Array.isArray(json)) {
    			toDoList = json;
    		}
    		console.log(toDoList);
    	});

Типизация кода внутри .then **никак не убережет нас от ошибок** в рантайме. Но она можем повысить семантику вашего кода: сказать всем разработчикам, что именно вы тут ожидаете и получить подсказки внутри функции. Так что тут на ваше усмотрение.

При выполнении запроса с fetch можно обнаружить, что он нам возвращает **Promise< Response >** А значит, что в TS существует интерфейс **Promise**, принимающий тот тип, который он будет возвращать при успешном выполнении

    const promise = new Promise<string>((resolve, reject) => {
        resolve("Test"); // resolve принимает только string
    });

    promise.then((value) => {
        console.log(value.toLowerCase());
        // value - string
    });
