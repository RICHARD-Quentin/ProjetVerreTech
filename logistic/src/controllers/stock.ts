import { Body, Get, Route, Post, Tags } from "@tsoa/runtime";
import { content, OrderResult as ListStockResult } from "../models/order";
import * as InventoryService from "../services/inventory";

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
        return InventoryService.VerifyInventoryList(list.content,list.id_boutique)
    }
}