import express from "express";
import {CartController} from "../controllers/CartController";
import {SendResponse} from "../../../common/controllers/response";

const router = express.Router();
const cartController = new CartController()

const baseUrl = "/catalog/cart"

router.route(`${baseUrl}/:id`).get((request: any, response: any) => {
    SendResponse(cartController.GetCart, response, request, request.params.id)
})
router.route(`${baseUrl}`).post(function (request: any, response: any) {
    SendResponse(cartController.PostCart, response, request, request.body)
})
router.route(`${baseUrl}/:id`).delete(function (request: any, response: any) {
    SendResponse(cartController.DeleteCart, response, request, request.params.id)
})

export default router;