import { Request, Response } from "express";
import {validationResult} from 'express-validator';
import ShopService from "../services/ShopService";

const shopService = new ShopService()

export default class
{

    public async CreateShop(request: Request, response:Response)
    {
        if(validationResult(request).array().length > 0)
        {
            return response.status(400).send({sucess:false,message:validationResult(request).array()})
        }
        else
        {
            const res = await shopService.CreateShop(request.body)
            
            if(res != null)
            {
                return response.status(200).send(res)
            }
            else
            {
                return response.sendStatus(400)
            }
        }
    }
        

    public async UpdateShop(request: Request, response:Response)
    {
        if(validationResult(request).array().length > 0)
        {
            return response.status(400).send({sucess:false,message:validationResult(request).array()})
        }
        else
        {
            const res = await shopService.UpdateShop(request.body)

            if( res == 1 )
            {
                return response.status(200).send(`Shop ${request.body.id_boutique} has been updated !`)
            }
            else
            {
                return response.sendStatus(400)
            }
        }
    }

    public async GetShop(request: Request, response:Response)
    {
        const res = await shopService.GetShop(request)
        if(res != null){
            return response.status(200).send(res)
        }else{
            return response.sendStatus(400)
        }
        
    }

    public async GetShops(request: Request, response:Response)
    {
        const res = await shopService.GetShops(request)
        if(res != null){
            return response.status(200).send(res)
        }else{
            return response.sendStatus(400)
        }
    }

    public async RemoveShop(request: Request, response:Response)
    {
        const res = await shopService.RemoveShop(request)
        console.log(res)
        try{
            await shopService.RemoveShop(request)
            return response.status(200).send(`Shop ${request.params.id} has been deleted !`)
        }
        catch(err){
            return response.status(400).send(err)
        }   
   
    }
}