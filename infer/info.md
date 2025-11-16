# Infer

Позволяет “вытащить” определенный тип из какой-либо сущности.

    type GetFirstType<T> = T extends Array<infer First> ? First : T;
    type Ex = GetFirstType<number[]>; // number

Реализация типа, принимающего любой тип и возвращающего массив этого типа

    type ToArray<Type> = Type extends any ? Type[] : never;
    type ExArray = ToArray<number>; // number[]

## Извлечение типа из Promise

    // Без infer
    type ExtractPromiseType<T> = T extends Promise<any> ? any : T;

    // С infer - тип выводится автоматически
    type ExtractPromiseTypeWithInfer<T> = T extends Promise<infer U> ? U : T;

    type A = ExtractPromiseTypeWithInfer<Promise<string>>; // string
    type B = ExtractPromiseTypeWithInfer<Promise<number>>; // number
    type C = ExtractPromiseTypeWithInfer<string>; // string

## Извлечение типа из массива

    type ExtractArrayType<T> = T extends (infer U)[] ? U : T;

    type D = ExtractArrayType<string[]>; // string
    type E = ExtractArrayType<number[]>; // number

## Извлечение типа возвращаемого значения функции

    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

    function getUser() { return { name: "John", age: 30 }; }
    type User = ReturnType<typeof getUser>; // { name: string; age: number }

## Извлечение типов параметров функции

    type Parameters<T> = T extends (...args: infer P) => any ? P : never;

    function greet(name: string, age: number) { return `Hello!`; }
    type GreetParams = Parameters<typeof greet>; // [string, number]

## Обработка union типов

    type ExtractFromUnion<T> = T extends { type: infer U } ? U : never;

    type Events =
        | { type: "click"; x: number; y: number }
        | { type: "keypress"; key: string };

    type EventTypes = ExtractFromUnion<Events>; // "click" | "keypress"
