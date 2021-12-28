//import {OrderController} from '../controllers/order';
import {ShopController} from '../controllers/ShopController';
import { ShopShema } from '../models/ShopShema';
import {SendResponse} from '../../../common/controllers/response'
import { checkSchema } from 'express-validator';
import express from 'express';
import {checkPermissions} from "../../../common/auth/middleware";
const router = express.Router();

const shopController = new ShopController();


router.route('/catalog/shop/:id').get(function(request: any, response: any) {
    SendResponse(shopController.GetShop,response,request, request.params.id)
});

router.route('/catalog/shop').get(function(request: any, response: any) {
    SendResponse(shopController.GetShops,response,request, request.query.id_boutique)
});
router.use(checkPermissions('create:shop'))
router.route('/catalog/shop').post(checkSchema(ShopShema),function(request: any, response: any) {
    SendResponse(shopController.CreateShop,response,request, request.body)
});
router.use(checkPermissions('delete:shop'))
router.route('/catalog/shop/:id').delete(function(request: any, response: any) {
    SendResponse(shopController.RemoveShop,response,request, request.params.id)
});
router.use(checkPermissions(('update:shop')))
router.route('/catalog/shop/:id').put(checkSchema(ShopShema),function(request: any, response: any) {
    SendResponse(shopController.UpdateShop,response,request,request.body,request.params.id)
});

export default router