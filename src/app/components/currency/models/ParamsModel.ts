import { LocalizedString } from "@angular/compiler";

export class Params{
    base_currency!:string;
    currencies!: string;
    base_currency_value!:number
    currencies_value!: 0
    conversion_currency!: number;
    
}

export class CurrencyLogsBody{
    base_currency!:string;
    base_currency_amount!:number
    currencies!:string
    currencies_value!: string
}


export class ConverionPayload{
    base_currency! : string;
    base_currency_amount!: number;
    currencies!: currencies[]
}


export class currencies{
    name!: string
    value!: number;

}