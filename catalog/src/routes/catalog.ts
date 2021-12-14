//import {OrderController} from '../controllers/order';
import express from 'express';
import {validationResult} from 'express-validator';
import { checkSchema } from 'express-validator';
import { Type } from 'typescript';
import ArticleController from '../controllers/ArticleController';
import ShopController from '../controllers/ShopController';
import { ArticleShema } from '../models/ArticleShema';
import { ShopShema } from '../models/ShopShema';
const router = express.Router();

const articleController = new ArticleController();

router.route('/article').get(articleController.GetArticles)
router.route('/article/:id').get(articleController.GetArticle)
router.route('/article/:id').put(checkSchema(ArticleShema),articleController.UpdateArticle)
router.route('/article/:id').delete(articleController.RemvoveArticle)
router.route('/article/all').delete(articleController.RemoveAll)
router.route('/article').post(checkSchema(ArticleShema),articleController.CreateArticle)

const shopController = new ShopController()

router.route('/shop').get(shopController.GetShops)
router.route('/shop/:id').get(shopController.GetShop)
router.route('/shop/:id').put(checkSchema(ShopShema),shopController.UpdateShop)
router.route('/shop/:id').delete(shopController.RemoveShop)
router.route('/shop').post(checkSchema(ShopShema),shopController.CreateShop)

export default router;
