import {default as paypal} from "./paypal.js";

export default class 
{
    constructor(payment)
    {
        switch(payment.method)
        {
            case "Paypal":
                this.payment = new paypal(payment.params);
                break;
            default:console.log(payment.method)
        }

    }
    ExecutePayment(amount)
    {
        return this.payment.ExecutePayment(amount)
    }
}

export class Payment 
{
    constructor(params)
    {

    }
    ExecutePayment(amount)
    {

    }
}