//import {OrderController} from '../controllers/order';
import {CommentsController} from '../controllers/CommentsController';
import {SendResponse} from '../../../common/controllers/response'
import { checkSchema } from 'express-validator';
import express from 'express';
import { CommentShema } from '../models/CommentShema';
import {checkJwt} from "../../../common/auth/middleware";
const router = express.Router();

const commentsController = new CommentsController();




router.route('/comment/:id').get(function(request: any, response: any) {
    SendResponse(commentsController.GetComment,response,request, request.params.id)
});

router.route('/comment').get(function(request: any, response: any) {
    SendResponse(commentsController.GetAll,response,request, request.query.id_boutique)
});

router.use(checkJwt)
router.route('/comment').post(checkSchema(CommentShema),function(request: any, response: any) {
    SendResponse(commentsController.CreateComment,response,request, request.body)
});

router.route('/comment/:id').delete(function(request: any, response: any) {
    SendResponse(commentsController.Delete,response,request, request.params.id)
});

router.route('/comment/:id').put(checkSchema(CommentShema),function(request: any, response: any) {
    SendResponse(commentsController.Update,response,request,request.body,request.params.id)
});

export default router