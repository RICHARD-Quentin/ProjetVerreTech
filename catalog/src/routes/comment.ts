//import {OrderController} from '../controllers/order';
import {CommentsController} from '../controllers/CommentsController';
import {SendResponse} from '../../../common/controllers/response'
import { checkSchema } from 'express-validator';
import express from 'express';
import { CommentShema } from '../models/CommentShema';
import {checkJwt, Permission} from "../../../common/auth/middleware";
const router = express.Router();

const commentsController = new CommentsController();

const baseUrl:string ="/catalog/comment"

router.route(`${baseUrl}/:id`).get(function(request: any, response: any) {
    SendResponse(commentsController.GetComment,response,request, request.params.id)
});

router.route(`${baseUrl}`).get(function(request: any, response: any) {
    SendResponse(commentsController.GetAll,response,request, request.query.id_boutique)
});

router.use(checkJwt)
router.route(`${baseUrl}`).post(checkSchema(CommentShema),function(request: any, response: any) {
    SendResponse(commentsController.CreateComment,response,request, request.body)
});

router.route(`${baseUrl}/:id`).delete(Permission('delete:comment'),function(request: any, response: any) {
    SendResponse(commentsController.Delete,response,request, request.params.id)
});

router.route(`${baseUrl}/:id`).put(Permission('update:comment'),checkSchema(CommentShema),function(request: any, response: any) {
    SendResponse(commentsController.Update,response,request,request.body,request.params.id)
});

export default router