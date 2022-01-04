import express from "express";
import {CartController} from "./controllers/CartController";
import {ShopController} from "./controllers/ShopController";
import {SendResponse} from "../../common/controllers/response";

const router = express.Router();
const cartController = new CartController()
const shopController = new ShopController()

const baseUrl = "/cache"

router.route(`${baseUrl}/cart/:id`).get((request: any, response: any) => {
    SendResponse(cartController.GetCart, response, request, request.params.id)
})
router.route(`${baseUrl}/cart`).post(function (request: any, response: any) {
    SendResponse(cartController.PostCart, response, request, request.body)
})

router.route(`${baseUrl}/cart/:id`).delete(function (request: any, response: any) {
    SendResponse(cartController.DeleteCart, response, request, request.params.id)
})

router.route(`${baseUrl}/shop/:id`).get(function (request: any, response: any) {
    SendResponse(shopController.GetShop, response, request, request.params.id)
})

router.route(`${baseUrl}/shop`).post(function (request: any, response: any) {
    SendResponse(shopController.PostShop, response, request, request.body)
})

router.route(`${baseUrl}/shop/:id`).delete(function (request: any, response: any) {
    SendResponse(shopController.DeleteShop, response, request, request.params.id)
})

export default router;