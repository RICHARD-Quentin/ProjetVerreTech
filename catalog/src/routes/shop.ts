//import {OrderController} from '../controllers/order';
import {ShopController} from '../controllers/ShopController';
import { ShopShema } from '../models/ShopShema';
import {SendResponse} from '../../../common/controllers/response'
import { checkSchema } from 'express-validator';
import express from 'express';
const router = express.Router();

const shopController = new ShopController();


router.route('/shop').post(checkSchema(ShopShema),function(request: any, response: any) {
    SendResponse(shopController.CreateShop,response,request, request.body)
});

router.route('/shop/:id').get(function(request: any, response: any) {
    SendResponse(shopController.GetShop,response,request, request.params.id)
});

router.route('/shop').get(function(request: any, response: any) {
    SendResponse(shopController.GetShops,response,request, request.query.id_boutique)
});

router.route('/shop/:id').delete(function(request: any, response: any) {
    SendResponse(shopController.RemoveShop,response,request, request.params.id)
});

router.route('/shop/:id').put(checkSchema(ShopShema),function(request: any, response: any) {
    SendResponse(shopController.UpdateShop,response,request,request.body,request.params.id)
});

export default router