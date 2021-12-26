import {OrderController} from '../controllers/order';
import express from 'express';
import { checkSchema } from 'express-validator';
import {OrderSchema,Order} from '../models/order'
import {SendResponse} from '../../../common/controllers/response'
const router = express.Router();

const orderController = new OrderController();

router.route('/order').post(checkSchema(OrderSchema),function(request: any, response: any, next: any) {
    SendResponse(orderController.createOrder,response,request, request.body)
});

router.route('/order').get(function(request: any, response: any) {
    SendResponse(orderController.getOrders,response,request)
});

router.route('/order/:id').get(function(request: any, response: any) {
    SendResponse(orderController.getOrder,response,request, request.params.id)    
});

router.route('/order/client/:id').get(function(request: any, response: any) {
    SendResponse(orderController.getOrdersOfClient,response,request, request.body, request.params.id)   
})

router.route('/order/cancel/:id').delete(function(request: any, response: any) {
    SendResponse(orderController.cancelOrder,response,request, request.body, request.params.id)
});

export default router;