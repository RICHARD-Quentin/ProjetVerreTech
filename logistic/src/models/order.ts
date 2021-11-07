import { Schema } from 'express-validator';
import { PaymentMethod} from './payment';

export type OrderResult = {
    content : Array<content>
    totalPrice:number
}

export enum OrderStatus {
    "ToPay" = 0,
    "Paid" = 1,
    "TookOf" = 2,
    "Cancelled" = 3
}

export type Order = {
    id_boutique : number,
    id_client : number,
    date_retrait : Date,
    contents : Array<content>,
    payment:{method:PaymentMethod,params:object,id_client : number}
}

export type content = {
    code_article : number,
    quantité : number 
}

export const OrderSchema :Schema= {
    id_client: 
    {
        in: ['body'],
        errorMessage: 'ID Client is wrong',
        isInt: true,
        toInt: true
    },
    id_boutique: 
    {
        in: ['body'],
        errorMessage: 'ID boutique is wrong',
        isInt: true,
        toInt: true
    },
    date_retrait : {
        in: ['body'],
        isISO8601: true,
        errorMessage: 'Date is wrong',
    },
    'contents.*.code_article':{
        in: ['body'],
        isInt: true,
    },
    'contents.*.quantité':{
        in: ['body'],
        isInt: true,
    },
    'payment.params': 
    {
        in: ['body'],
        errorMessage: 'Payment params is wrong or missing',
        isObject: true
    },
    'payment.method': 
    {
        in: ['body'],
        errorMessage: 'Payment method is wrong or missing',
        isString: true,
    },
}