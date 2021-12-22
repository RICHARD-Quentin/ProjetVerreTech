import {Request,Response} from "express";
import {validationResult} from 'express-validator';
import * as InventoryService from "../services/inventory";
import { Order,OrderResult, OrderStatus, OrderPayment } from "../models/order";
import { PaymentMethod} from "../models/payment";
import Payment  from "../services/payment/payment";
import { Body, Get, Post, Route, SuccessResponse, Example,Path, Put,Delete,Tags } from "@tsoa/runtime";
import { Query } from "tsoa";

interface OrderResponse {
    response: object
}

@Route("order")
@Tags("Orders")
export class OrderController{

    @Delete("/cancel/{id}")
    public async cancelOrder(@Path() id:number) : Promise<any> {

        return InventoryService.cancelOrder(id);
    }

    @Get()
    public async getOrders(): Promise<any> {
        return InventoryService.getAllOrders();
    }

    @Get("/client/{id}")
    public async getOrdersOfClient (@Path() id:number) 
    {  
        return InventoryService.getOrdersOfClient(id);
    }

    @Get("{id}")
    public async getOrder (@Path() id:number) 
    {  
        return InventoryService.getOrder(id)
    }

    @Post()
    @Example<Order>({
        "id_boutique":1,
        "id_client":1,
        "contents": [
            {"code_article":2,"quantité":5},
            {"code_article":1,"quantité":2}
        ],
        "date_retrait":new Date(),
        "payment": 
            {
                "params":
                {
                    "payerID":"9T8M2JEDR9P92",
                    "paymentID":"PAYID-MFSWM3Q7PG67674RB873241U",
                    "paymentToken":"EC-45U139152R760821U"
                },
                "method": PaymentMethod.Paypal,
                "id_client":1
            }
    })
    public async createOrder(@Body() order:Order) : Promise<Order>
    {
       return new Promise((resolve,reject)=>{
        InventoryService.VerifyInventoryList(order.contents,order.id_boutique).then(inventoryVerified =>{
                const orderResult:OrderResult = inventoryVerified;
    
                const paymentMethod = order.payment.method as PaymentMethod;
            
                const payment:Payment = new Payment(paymentMethod,order.payment.params);
    
                //Customer pays on the spot 🦄
                ////////////////////////////
                if(PaymentMethod.None == Number(PaymentMethod[paymentMethod]))
                {
                    InventoryService.CreateOrder(order,order.id_client,order.date_retrait,order.id_boutique,orderResult,OrderPayment.Shop).then(orderCreated=>{
                    return resolve(orderCreated)
                    }).catch(error=>{return reject(error)})
                }
                ////////////////////////////
    
                // Customer want to pay 🦄
                ////////////////////////////
                payment.ValidatePayment().then(paymentResult =>
                {
                    if(paymentResult == true)
                    {
                        InventoryService.CreateOrder(order,order.id_client,order.date_retrait,order.id_boutique,orderResult,OrderPayment.Website).then(orderCreated=>{
                            return resolve(orderCreated)
                        }).catch(error=>{return reject(error)})             
                    }
                    else
                    {
                         return reject("Invalid payment !")
                    }
                })
                .catch(err =>
                {
                    return reject(err)
                })
                ////////////////////////////
                     
            }).catch(err => {console.log(err) ;return reject(err)})
        })
    }
}

/* ANCIENNE METHODE SANS TSOA
export async function createOrder(req :Request,res :Response)
{
    if(validationResult(req).array().length > 0){
        return res.status(400).send({sucess:false,message:validationResult(req).array()})
    }

    const order:Order = req.body;

    VerifyInventoryList(order.contents,order.id_boutique).then(inventoryVerified =>{
        const orderResult:OrderResult = inventoryVerified;

        const paymentMethod = order.payment.method as PaymentMethod;
        
        const payment:Payment = new Payment(paymentMethod,order.payment.params);

        //Customer pays on the spot 🦄
        ////////////////////////////
        if(PaymentMethod.None == Number(PaymentMethod[paymentMethod]))
        {
            CreateOrder(order,order.id_client,order.date_retrait,order.id_boutique,orderResult,OrderStatus.ToPay).then(orderCreated=>{
                return res.status(200).send({sucess:true,message : orderCreated})
            }).catch(error=>{return res.status(400).send({sucess:false,message:error})})
        }
        ////////////////////////////

        // Customer want to pay 🦄
        ////////////////////////////
        payment.ValidatePayment().then(paymentResult =>
        {
            if(paymentResult == true)
            {
                CreateOrder(order,order.id_client,order.date_retrait,order.id_boutique,orderResult,OrderStatus.Paid).then(orderCreated=>{
                    return res.status(200).send({sucess:true,message : orderCreated})
                }).catch(error=>{return res.status(400).send({sucess:false,message:error})})             
            }
            else
            {
                return res.status(400).send({sucess:false,message:"Invalid payment !"})
            }
        })
        .catch(err =>
        {
            return res.status(400).send({sucess:false,message:err})
        })
        ////////////////////////////
                 
    }).catch(err => {console.log(err) ;return res.status(400).send({sucess:false,message:err})})
}
*/