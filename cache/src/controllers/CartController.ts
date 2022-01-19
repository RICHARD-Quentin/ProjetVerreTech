import { Route,Get,Post,Delete,Put,Query, Body, Tags, Path } from "tsoa";
import CartService from "../services/CartService";
import {ICommonResSuccess} from "../../../common/interfaces/src/IResponse";

const cartService = new CartService()
@Route('cart')
export class CartController {

    @Post()
    public async PostCart(@Body() body) {
        const id_client = body.id_client
        const cart = body.cart
        return await cartService.create(id_client, cart)
    }

    @Get('{id}')
    public async GetCart(@Path() id: number) {
        return await cartService.search(id)
    }

    @Delete('{id}')
    public async DeleteCart(@Path() id: number) {
        return await cartService.delete(id)
    }
}