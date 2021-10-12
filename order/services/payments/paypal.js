import Payment from './payment.js';
import axios from 'axios';

const PAYPAL_API = 'https://api-m.sandbox.paypal.com';
const CLIENT = 'AXLIGXzwkNRHVe4HCW4sv0EkMq33O7OKybb6hhRrdj2NCP4HG3CPTmCsqOcJamaiKGgXz83w68tJbWni';
const SECRET = '';

export default class  
{
    constructor(payment)
    {
        this.payment = payment;
    }

    ExecutePayment(amount)
    {
        axios.post(PAYPAL_API+'/v1/payments/payment'+paymentID+'/execute',
        {
            auth:
            {
                user: CLIENT,
                pass: SECRET
            },
            body:
            {
                payer_id: payerID,
                transactions: [
                {
                    amount:
                    {
                        total: amount,
                        currency: 'EURO'
                    }
                }]
            },
            json: true
        })
        .then(res =>{
            console.log(res)
        })
    }
}

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

export async function executePayement (req, res) 
{
    axios.post(PAYPAL_API+'/v1/payments/payment'+paymentID+'/execute',
    {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
          payer_id: payerID,
          transactions: [
          {
            amount:
            {
              total: '10.99',
              currency: 'USD'
            }
          }]
        },
        json: true
    })
}