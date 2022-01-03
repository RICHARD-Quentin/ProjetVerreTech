import { Route,Get,Post,Delete,Put,Query, Body, Tags, Path } from "tsoa";
import ShopService from "../services/ShopService";
import {ICommonResSuccess} from "../../../common/interfaces/src/IResponse";

const shopService = new ShopService()
@Route('shop')
export class ShopController {

    @Post()
    public async PostShop(@Body() body) {
        const id_client = body.id_client
        const shop = body.shop
        return await shopService.create(id_client, shop)
    }

    @Get('{id}')
    public async GetShop(@Path() id: number) {
        return await shopService.search(id)
    }

    @Delete('{id}')
    public async DeleteShop(@Path() id: number) {
        return await shopService.delete(id)
    }
}