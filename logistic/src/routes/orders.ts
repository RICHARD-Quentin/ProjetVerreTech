import {OrderController} from '../controllers/order';
import express from 'express';
import { checkSchema } from 'express-validator';
import {OrderSchema,Order} from '../models/order'
import {SendResponse} from '../../../common/controllers/response'
import { Type } from 'typescript';
import {checkJwt, Permission} from "../../../common/auth/middleware";
const router = express.Router();

const orderController = new OrderController();

const baseUrl:string = '/logistic/order'

router.route(baseUrl).post(checkSchema(OrderSchema),function(request: any, response: any, next: any) {
    SendResponse(orderController.createOrder,response,request, request.body)
});

router.route(baseUrl).get(function(request: any, response: any, next: any) {
    SendResponse(orderController.getOrders,response,request)
});

router.route(`${baseUrl}/:id`).get(function(request: any, response: any, next: any) {
    SendResponse(orderController.getOrder,response,request, request.body)    
});

router.route(`${baseUrl}/client/:id`).get(function(request: any, response: any, next: any) {
    SendResponse(orderController.getOrdersOfClient,response,request,request.params.id)   
})

router.route(`${baseUrl}/cancel/:id`).delete(Permission('delete:order'),function(request: any, response: any, next: any) {
    SendResponse(orderController.cancelOrder,response,request, request.body, request.params.id)
});

export default router;