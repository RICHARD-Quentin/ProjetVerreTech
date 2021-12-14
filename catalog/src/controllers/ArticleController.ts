import { Request, Response } from "express";
import {validationResult} from 'express-validator';
import CatalogService from "../services/CatalogService";
import ResponseMessage from '../../../common/interfaces/response';
import { sequelize } from "../../../common/database";
//ICI -> création instance
const catalogservice = new CatalogService()

export default class {

    public async UpdateArticle(request: Request, response:Response)
    {   
        if(validationResult(request).array().length > 0)
        {
            return response.status(400).send({sucess:false,message:validationResult(request).array()})
        }
        else
        {
            if(request.params.id == null) return response.sendStatus(400) 

            let res = await catalogservice.UpdateArticle(request)
    
            if(res != null)
                return response.status(200).send({sucess:true,response:res})
            
            else{
                return response.sendStatus(400)
            }
        }    
         
    }

    public async RemoveAll(request : Request, response : Response)
    {
        try{
            await catalogservice.RemoveAllArticles()
            return response.status(200).send({sucess:true,response:"All articles has been deleted ! BOUM !!!"})    
        }
        catch(err){
            return response.status(400).send(err)
        }   
    }

    public async RemvoveArticle(request: Request, response:Response)
    {   
        if(request.params.id == null)return response.sendStatus(400)
        
        try
        {
            await catalogservice.RemoveArticle(request)           
            return response.status(200).send({sucess:true,response:"Article "+request.params.id+" has been deleted !"})
            
        }catch(err)
        {
            response.status(400).send(err)
        }
                
    }

    public async GetArticle(request: Request, response:Response)
    {   
        if(request.params.id == null) return response.sendStatus(400)

        const res = await catalogservice.GetArticle(request)

        if(res!= null)
        {
            return response.status(200).send(res)
        }
        else
        {
            return response.sendStatus(400)
        }
    }

    public async GetArticles(request: Request, response:Response)
    {
        const res = await catalogservice.GetArticles(request)
        if(res !=null){
            response.status(200).send({sucess:true,response:res})
        }else{
            response.sendStatus(400)
        }      
    }

    public async CreateArticle(request: Request, response:Response)
    {      
        if(validationResult(request).array().length > 0)
        {
            return response.status(400).send({sucess:false,message:validationResult(request).array()})
        }
        else
        {
            try{
                const article = await catalogservice.CreateArticle(request.body)
                console.log(article)
                return response.send({sucess:true, message:article}) 
            }catch(error){
                return response.status(400).send({sucess:false,error:error}) 
            }
        }
    }
}

