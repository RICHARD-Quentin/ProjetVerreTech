//import {OrderController} from '../controllers/order';
import express from 'express';
import { checkSchema } from 'express-validator';
import {ArticleController} from '../controllers/ArticleController';
import { ArticleShema } from '../models/ArticleShema';
import {SendResponse} from '../../../common/controllers/response'
import {Permission} from "../../../common/auth/middleware";
const router = express.Router();

const articleController = new ArticleController();

const baseUrl:string ="/catalog/article"

router.route(`${baseUrl}/:id`).get(function(request: any, response: any) {
    SendResponse(articleController.GetArticle,response,request, request.params.id,request.query.id_boutique)
});

router.route(`${baseUrl}`).get(function(request: any, response: any) {
    SendResponse(articleController.GetArticles,response,request,
         request.query.id_boutique,
         request.query.limit,
         request.query.page,
         request.query.commandable,
         request.query.orderby)
});

router.route(`${baseUrl}`).post(Permission('create:article'),checkSchema(ArticleShema),function(request: any, response: any) {
    SendResponse(articleController.CreateArticle,response,request, request.body)
});

router.route(`${baseUrl}/:id`).delete(Permission('delete:article'),function(request: any, response: any) {
    SendResponse(articleController.RemvoveArticle,response,request, request.params.id)
});

router.route(`${baseUrl}/all`).delete(Permission('delete:article'),function(request: any, response: any) {
    SendResponse(articleController.RemoveAll,response,request)
});

router.route(`${baseUrl}/:id`).put(Permission(('update:article')),checkSchema(ArticleShema),function(request: any, response: any) {
    SendResponse(articleController.UpdateArticle,response,request,request.body,request.params.id)
});

export default router;
