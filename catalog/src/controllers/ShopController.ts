import { Request, Response } from "express";
import {validationResult} from 'express-validator';
import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { Shop } from "../models/Shop";
import ShopService from "../services/ShopService";

const shopService = new ShopService()

@Route("shop")
@Tags("shops")
export  class ShopController
{

    @Post()
    public async CreateShop(@Body() shop: Shop) : Promise<any> 
    {
        return await shopService.CreateShop(shop)       
    }

    @Put('{id}')
    public async UpdateShop(@Body() shop: Shop ,@Path() id: number): Promise<any> 
    {
        return await shopService.UpdateShop(shop,id)       
    }

    @Get('{id}')
    public async GetShop(@Path() id :number): Promise<any> 
    {
        return await shopService.GetShop(id)       
    }

    @Get()
    public async GetShops() : Promise<any> 
    {
        return await shopService.GetShops()
    }

    @Delete('{id}')
    public async RemoveShop(@Path() id :number): Promise<any> 
    {
        return await shopService.RemoveShop(id)
    }
}