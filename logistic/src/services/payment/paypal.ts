import {Paypal} from "../../models/payment"
import { IPayment } from "./payment";
import paypal from 'paypal-rest-sdk'

const PAYPAL_API = 'https://api-m.sandbox.paypal.com';
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AXLIGXzwkNRHVe4HCW4sv0EkMq33O7OKybb6hhRrdj2NCP4HG3CPTmCsqOcJamaiKGgXz83w68tJbWni',
    'client_secret':'EI9pcmowaSkQw4bm9peF7ZjnjyToWxmosc-OW7bfoeHU3J6fXat91LPFVt5VJrQQbObz86IG_Ru_0ziW'
});

const PayPalPayment:IPayment = 
{
    ValidatePayment:(paypalPayment:Paypal)=>
    {
        return new Promise((resolve)=>
        {
            paypal.payment.execute(paypalPayment.paymentID, {'payer_id':paypalPayment.payerID}, function(error, payment)
            {
                
            if(error){
                
                return resolve(false)
            }
            else
            {  
                if (payment.state == 'approved')
                { 
                    console.log(payment)
                    return resolve(true)
                } 
                else
                {
                    return resolve(false)
                }
            }
                   
            })  
        })          
    }
}

export default PayPalPayment;

/*
export async function createPayement (req, res) 
{
    axios.post(PAYPAL_API+'/v1/payments/payment',
    {
        auth:
        {
            user: CLIENT,
            pass: SECRET
        },
        body:
        {
            intent: 'sale',
            payer:
            {
                payement_method: 'paypal'
            },
            transactions:[
                {
                    amount:
                    {
                        total:'1.0',
                        currency: 'EURO'
                    }
                }
            ]
        },
        json: true
    }).then(resp =>{
        console.log(resp)
    })
    // /my-api/create-payment/
}

*/