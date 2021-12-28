import express from 'express';
import {StockController,ContentList} from '../controllers/stock'
import { SendResponse } from '../../../common/controllers/response';
import { checkJwt, Permission } from '../../../common/auth/middleware';

const router = express.Router();
const stockController = new StockController()

const baseUrl:string = "/stock"

router.route(`${baseUrl}/verify`).post(function(request: any, response: any, next: any) {
    SendResponse(stockController.verify,response,request, request.body)   
});

router.route(`${baseUrl}/shop/:id`).get(function(request: any, response: any, next: any) {
    SendResponse(stockController.getStockofShop,response,request, request.params.id)   
});

router.route(`${baseUrl}/article/:id`).get(function(request: any, response: any, next: any) {
    SendResponse(stockController.getStockofShopWithArticleID,response,request, request.params.id)   
});

router.route(`${baseUrl}`).put(function(request: any, response: any, next: any) {
    SendResponse(stockController.modifyStock,response,request, request.body)   
});

router.route(`${baseUrl}`).post(function(request: any, response: any, next: any) {
    SendResponse(stockController.addStock,response,request, request.body)   
});

router.route(`${baseUrl}`).get(function(request: any, response: any, next: any) {
    SendResponse(stockController.GetAllStock,response,request)   
});

router.route(`${baseUrl}/:id`).get(function(request: any, response: any, next: any) {
    SendResponse(stockController.GetWithId,response,request, request.params.id)   
});



router.route(`${baseUrl}/shop/:id`).delete(Permission('delete:order'),function(request: any, response: any, next: any) {
    SendResponse(stockController.removeShopStock,response,request, request.params.id)   
});
router.route(`${baseUrl}/article/:id`).delete(Permission('delete:order'),function(request: any, response: any, next: any) {
    SendResponse(stockController.removeArticleStock,response,request, request.params.id)   
});

router.route(`${baseUrl}/:id`).delete(Permission('delete:order'),function(request: any, response: any, next: any) {
    SendResponse(stockController.removeLineOfStock,response,request, request.params.id)   
});



export default router