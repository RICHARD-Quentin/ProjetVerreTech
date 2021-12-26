import { Body, Get, Route, Post, Tags, Path, Delete, Put } from "@tsoa/runtime";
import { stock } from "../../../common/database/models/stock";
import { content, OrderResult as ListStockResult } from "../models/order";
import * as InventoryService from "../services/inventory";
import * as stocks from "../services/stockService";
import {Stock} from "../models/stock"
export interface ContentList {
    content : Array<content>,
    id_boutique: number
}

@Route("stock")
@Tags("Stocks")
export class StockController 
{
    @Post("verify")
    public async verify(@Body() list:ContentList): Promise<any> {
        return await InventoryService.VerifyInventoryList(list.content,list.id_boutique)
    }

    @Get("shop/{id}")
    public async getStockofShop(@Path() id:number): Promise<any> {
        return await stocks.GetStockOFShop(id)
    }

    @Get("article/{id}")
    public async getStockofShopWithArticleID(@Path() id:number): Promise<any> {
        return await stocks.GetStockWithArticleId(id)
    }

    @Put()
    public async modifyStock(@Body() stock:Stock): Promise<any> {
        return await stocks.ModifyStock(stock)
    }

    @Post()
    public async addStock(@Body() stock:Stock): Promise<any> {
        return await stocks.AddStock(stock)
    }

    @Delete("{id}")
    public async removeLineOfStock(@Path() id:number): Promise<any> {
        return await stocks.Remove(id)
    }

    @Delete("article/{id}")
    public async removeArticleStock(@Path() id:number): Promise<any> {
        return await stocks.RemoveAllStockOfArticle(id)
    }

    @Delete("shop/{id}")
    public async removeShopStock(@Path() id:number): Promise<any> {
        return await stocks.RemoveAllStockOfShop(id)
    }

    @Get("{id}")
    public async GetWithId(@Path() id:number): Promise<any> {
        return await stocks.GetStockWithId(id)
    }

    @Get()
    public async GetAllStock(): Promise<any> {
        return await stocks.GetAllStock()
    }

}