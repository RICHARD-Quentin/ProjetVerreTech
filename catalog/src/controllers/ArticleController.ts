import CatalogService from "../services/CatalogService";
import { Route,Get,Post,Delete,Put,Query, Body, Tags, Path } from "tsoa";
import { Article } from "../models/Article";

const catalogservice = new CatalogService()
@Route("article")
@Tags("articles")
export class ArticleController {

    @Put('{id}')
    public async UpdateArticle(@Body() article: Article, id : number): Promise<any> 
    {   
        return await catalogservice.UpdateArticle(article,id)       
    }
    
    @Delete('/all')
    public async RemoveAll() : Promise<any> 
    {       
        return await catalogservice.RemoveAllArticles()      
    }

    @Delete('{id}')
    public async RemvoveArticle(@Path() id : number): Promise<any> 
    {           
        return await catalogservice.RemoveArticle(id)                                     
    }

    @Get('{id}')
    public async GetArticle(@Path() id : number, @Query() id_boutique : number): Promise<any> 
    {  
        return await catalogservice.GetArticle(id,id_boutique)  
    }

    @Get()
    public async GetArticles(@Query() id_boutique? : number, @Query() limit? : number, @Query() page? : number,@Query() commandable? : boolean, @Query() orderby?:string): Promise<any> 
    {
        return await catalogservice.GetArticles(id_boutique,limit,page,commandable,orderby)        
    }

    @Post()
    public async CreateArticle(@Body() article: Article ): Promise<any> 
    {                  
        return await catalogservice.CreateArticle(article)               
    }
}

