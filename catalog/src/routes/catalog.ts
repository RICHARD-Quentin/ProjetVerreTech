//import {OrderController} from '../controllers/order';
import express from 'express';
import {validationResult} from 'express-validator';
import { checkSchema } from 'express-validator';
import { Type } from 'typescript';
import ArticleController from '../controllers/ArticleController';
import { ArticleShema } from '../models/ArticleShema';
const router = express.Router();

const articleController = new ArticleController();
/*
router.route('/article').post(checkSchema(OrderSchema))
router.route('/article').put(checkSchema(OrderSchema))
router.route('/article/:id').delete(checkSchema(OrderSchema))
*/

router.route('/article').post(checkSchema(ArticleShema),articleController.CreateArticle)

router.route('/article').get(articleController.GetArticle)
//router.route('/article/:id').get()

export default router;
