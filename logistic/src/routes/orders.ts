import {OrderController} from '../controllers/order';
import express from 'express';
import {validationResult} from 'express-validator';
import { checkSchema } from 'express-validator';
import {OrderSchema,Order} from '../models/order'
import {SendResponse} from '../../../common/controllers/response'
import { Type } from 'typescript';
import {checkJwt, checkPermissions} from "../../../common/auth/middleware";
const router = express.Router();

const orderController = new OrderController();

const baseUrl = '/logistic'

router.use(checkJwt)
router.route(`${baseUrl}/order`).post(checkSchema(OrderSchema),function(request: any, response: any, next: any) {
    SendResponse(orderController.createOrder,response,request, request.body)
});

router.route(`${baseUrl}/order`).get(function(request: any, response: any, next: any) {
    SendResponse(orderController.getOrders,response,request)
});

router.route(`${baseUrl}/order/:id`).get(function(request: any, response: any, next: any) {
    SendResponse(orderController.getOrder,response,request, request.body)    
});

router.route(`${baseUrl}/order/client/:id`).get(function(request: any, response: any, next: any) {
    SendResponse(orderController.getOrdersOfClient,response,request, request.body, request.params.id)   
})

router.use(checkPermissions('delete:order'))
router.route(`${baseUrl}/order/cancel/:id`).delete(function(request: any, response: any, next: any) {
    SendResponse(orderController.cancelOrder,response,request, request.body, request.params.id)
});

export default router;