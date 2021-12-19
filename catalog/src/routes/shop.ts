//import {OrderController} from '../controllers/order';
import {ShopController} from '../controllers/ShopController';
import { ShopShema } from '../models/ShopShema';
import {ReturnResponse} from '../../../common/controllers/response'
import { checkSchema } from 'express-validator';
import express from 'express';
const router = express.Router();

const shopController = new ShopController();


router.route('/shop').post(checkSchema(ShopShema),function(request: any, response: any) {
    ReturnResponse(shopController.CreateShop,response,request, request.body)
});

router.route('/shop/:id').get(function(request: any, response: any) {
    ReturnResponse(shopController.GetShop,response,request, request.params.id)
});

router.route('/shop').get(function(request: any, response: any) {
    ReturnResponse(shopController.GetShops,response,request, request.query.id_boutique)
});

router.route('/shop/:id').delete(function(request: any, response: any) {
    ReturnResponse(shopController.RemoveShop,response,request, request.params.id)
});

router.route('/shop/:id').put(checkSchema(ShopShema),function(request: any, response: any) {
    ReturnResponse(shopController.UpdateShop,response,request,request.body,request.params.id)
});

export default router