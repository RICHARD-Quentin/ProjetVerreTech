import  PaypalService from "./paypal";


import {PaymentMethod,Paypal} from "../../models/payment"

export default class 
{
    paymentEngine!:IPayment;
    transaction:object;

    constructor(payment:PaymentMethod,transaction:object)
    {   
        this.transaction = transaction;

        switch(Number(PaymentMethod[payment]))
        {
            case PaymentMethod.Paypal:   
                this.paymentEngine = PaypalService;
                break;
            case PaymentMethod.None:
                this.paymentEngine = NoPayment;
            default:
        }

    }

    async ValidatePayment()
    {
        const res = await this.paymentEngine.ValidatePayment(this.transaction)
        return res              
    }
}
    

export interface IPayment
{
    //InitConfiguration(config:object):void
    ValidatePayment(params:object):Promise<boolean>
    //InitPayment():Promise<boolean>
}


const NoPayment:IPayment = 
{
    ValidatePayment:async (paypalPayment:Paypal)=>{
        return true;
    }
}