import { Request, Response } from "express";
import {validationResult} from 'express-validator';
import CatalogService from "../services/CatalogService";

//ICI -> création instance
const catalogservice = new CatalogService()

export default class {

    public async GetArticle(request: Request, response:Response)
    {
      
    }

    public async GetArticles(request: Request, response:Response)
    {
        
    }

    public async CreateArticle(request: Request, response:Response)
    {
        //La on vérifie si notre modele est correct avec validationResult. Faut qui est zero erreur.. 
        if(validationResult(request).array().length > 0)
        {
            //Sinon on retourne une erreur
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

