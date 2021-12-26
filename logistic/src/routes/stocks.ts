import express from 'express';
import {StockController,ContentList} from '../controllers/stock'
import { SendResponse } from '../../../common/controllers/response';

const router = express.Router();
const stockController = new StockController()

router.route('/stock/verify').post(function(request: any, response: any, next: any) {
    SendResponse(stockController.verify,response,request, request.body)   
});

router.route('/stock/shop/:id').get(function(request: any, response: any, next: any) {
    SendResponse(stockController.getStockofShop,response,request, request.params.id)   
});

router.route('/stock/shop/:id').delete(function(request: any, response: any, next: any) {
    SendResponse(stockController.removeShopStock,response,request, request.params.id)   
});

router.route('/stock/article/:id').get(function(request: any, response: any, next: any) {
    SendResponse(stockController.getStockofShopWithArticleID,response,request, request.params.id)   
});

router.route('/stock/article/:id').delete(function(request: any, response: any, next: any) {
    SendResponse(stockController.removeArticleStock,response,request, request.params.id)   
});

router.route('/stock').put(function(request: any, response: any, next: any) {
    SendResponse(stockController.modifyStock,response,request, request.body)   
});

router.route('/stock').post(function(request: any, response: any, next: any) {
    SendResponse(stockController.addStock,response,request, request.body)   
});

router.route('/stock').get(function(request: any, response: any, next: any) {
    SendResponse(stockController.GetAllStock,response,request)   
});

router.route('/stock/:id').delete(function(request: any, response: any, next: any) {
    SendResponse(stockController.removeLineOfStock,response,request, request.params.id)   
});

router.route('/stock/:id').get(function(request: any, response: any, next: any) {
    SendResponse(stockController.GetWithId,response,request, request.params.id)   
});

export default router