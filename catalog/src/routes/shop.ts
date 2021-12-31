//import {OrderController} from '../controllers/order';
import {ShopController} from '../controllers/ShopController';
import { ShopShema } from '../models/ShopShema';
import {SendResponse} from '../../../common/controllers/response'
import { checkSchema } from 'express-validator';
import express from 'express';
import {Permission} from "../../../common/auth/middleware";
const router = express.Router();

const shopController = new ShopController();

const baseUrl:string ="/catalog/shop"

router.route(`${baseUrl}/:id`).get(function(request: any, response: any) {
    SendResponse(shopController.GetShop,response,request, request.params.id)
});

router.route(`${baseUrl}`).get(function(request: any, response: any) {
    SendResponse(shopController.GetShops,response,request, request.query.id_boutique)
});

router.route(`${baseUrl}`).post(Permission('create:shop'),checkSchema(ShopShema),function(request: any, response: any) {
    SendResponse(shopController.CreateShop,response,request, request.body)
});

router.route(`${baseUrl}/:id`).delete(Permission('delete:shop'),function(request: any, response: any) {
    SendResponse(shopController.RemoveShop,response,request, request.params.id)
});

router.route(`${baseUrl}/:id`).put(Permission('update:shop'),checkSchema(ShopShema),function(request: any, response: any) {
    SendResponse(shopController.UpdateShop,response,request,request.body,request.params.id)
});

export default router