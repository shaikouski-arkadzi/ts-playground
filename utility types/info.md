# Utility types

Вспомогательные типы используются для самых разных целей при формировании новых типов. Это раздел **Utility types** в документации с полным их перечнем

## Omit

Тип **Omit** необходим для того, чтобы исключить указанные свойства из другого типа. Второй аргумент может быть только string | number | symbol

    interface  Currencies {
    	usa: "usd";
    	china: "cny";
    	ukraine: "uah";
    	kz: "tenge";
    }

    type  CurrenciesWithoutUSA = Omit<Currencies, "usa">;

    // type CurrenciesWithoutUSA = {
    // china: "cny";
    // ukraine: "uah";
    // kz: "tenge";
    // }

## Pick

Тип **Pick** необходим для фильтрации типа по заданным свойствам. Остаются только указанные. Указывать можно только существующие в целевом типе. Если их несколько то в union типе:

    type  CurrenciesUSAAndUkraine = Pick<Currencies, "usa" | "ukraine">;

    // type CurrenciesUSAAndUkraine = {
    // usa: "usd";
    // ukraine: "uah";
    // }

## Exclude

Тип **Exclude** позволяет убирать из union типа те, которые соответствуют условию:

    type  CountriesWithoutUSA = Exclude<keyof  Currencies, "usa">;

    // type CountriesWithoutUSA = "china" | "ukraine" | "kz"

## Extract

Тип **Extract** выбирает типы, которые соответствуют условию. Это Exclude наоборот:

    type  CountriesWithUSAandKZ = Extract<keyof  Currencies, "usa" | "kz">;

    // type CountriesWithUSAandKZ = "usa" | "kz"

## Record

Тип позволяет сконструировать другой тип в формате ключ значение. Это удобный способ сказать TS: тут будет объект, ключами которого будет это, значениями это:

    type  PlayersNames = "alex" | "john";

    interface  Currencies {
        usa: "usd";
        china: "cny";
        ukraine: "uah";
        kz: "tenge";
    }

    type  CreateCustomCurr<T> = {
        [P  in  keyof  T  as  `custom${Capitalize<string & P>}`]: string;
    };

    type  CustomCurrencies = CreateCustomCurr<Currencies>;

    type  gameDataCurrencies = Record<PlayersNames, CustomCurrencies>;

    // type gameDataCurrencies = {
    // alex: CreateCustomCurr<Currencies>;
    // john: CreateCustomCurr<Currencies>;
    // }

    const  gameData: gameDataCurrencies = {
        alex: {
    	    customChina:  "test",
    	    customKz:  "test",
    	    customUkraine:  "test",
    	    customUsa:  "test",
        },
        john: {
    	    customChina:  "test",
    	    customKz:  "test",
    	    customUkraine:  "test",
    	    customUsa:  "test",
        },
    };
