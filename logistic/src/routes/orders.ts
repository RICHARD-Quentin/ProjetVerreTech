import {OrderController} from '../controllers/order';
import express from 'express';
import {validationResult} from 'express-validator';
import { checkSchema } from 'express-validator';
import {OrderSchema,Order} from '../models/order'
import { Type } from 'typescript';
const router = express.Router();

const orderController = new OrderController();

router.route('/order').post(checkSchema(OrderSchema),function(request: any, response: any, next: any) {

    if(validationResult(request).array().length > 0){
        return response.status(400).send({sucess:false,message:validationResult(request).array()})
    }

    orderController.createOrder(request.body).then((result: any)=>{
        return response.status(200).send(result);
    }).catch((error:any)=> {return response.status(400).send(error)})

});

router.route('/order').get(function(request: any, response: any, next: any) {

    orderController.getOrders().then((result: any)=>{
        return response.status(200).send(result);
    }).catch((error:any)=> {return response.status(400).send(error)})
});

router.route('/order/:id').get(function(request: any, response: any, next: any) {

    orderController.getOrder(request.params.id).then((result: any)=>{
        return response.status(200).send(result);
    }).catch((error:any)=> {return response.status(400).send(error)})
    
});

router.route('/order/client/:id').get(function(request: any, response: any, next: any) {

    orderController.getOrdersOfClient(request.params.id).then((result: any)=>{
        return response.status(200).send(result);
    }).catch((error:any)=> {return response.status(400).send(error)})

});

router.route('/order/cancel/:id').delete(function(request: any, response: any, next: any) {

    orderController.cancelOrder(request.params.id).then((result: any)=>{
        return response.status(200).send(result);
    }).catch((error:any)=> {return response.status(400).send(error)})

});


//router.route('/order/{id}').get(orderController.getOrder);
//router.route('/order').get(test);
//router.route('/order/:id').get(order.getOrdersOfClient);
// ...


export default router;