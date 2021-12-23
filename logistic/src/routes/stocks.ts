import express from 'express';
import {StockController,ContentList} from '../controllers/stock'
import {validationResult} from 'express-validator';
import { checkSchema } from 'express-validator';
import {OrderSchema,Order} from '../models/order'
const router = express.Router();

const stockController = new StockController()

const baseUrl = '/logistic'


router.route(`${baseUrl}/stock/verify`).post(function(request: any, response: any, next: any) {
    stockController.verify(request.body).then((result: any)=>{
        return response.status(200).send(result);
    }).catch((error:any)=> {console.log(error) ;return response.status(400).send(error)})
});

export default router