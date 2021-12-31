
import models, {models as db , sequelize} from '../../../common/database'
import { Article } from '../models/Article'

export default class 
{
    filters = {}
    commandable : boolean = false

    public async CreateArticle(article:Article)
    {
        return await models.article.create({
                intitule_article: article.intitule_article,
                dimension_1: article.dimension_1,
                dimension_2: article.dimension_2,
                dimension_3: article.dimension_3,
                couleur: article.couleur,
                prix_achat: article.prix_achat,
                commandable: article.commandable,
                image: article.image,
                note_moyenne: article.note_moyenne,
                description: article.description    
        })         
    }

    
    public async GetArticles(idOfShop?: number, limit?:number, page?:number, commandable?:boolean,orderby?:string)
    {
        let query:any = {}
        let ordersStock:any = []
        let ordersArticle:any = []

        let WherefilterArticle = {}
        let WherefilterStock = {}

        if(commandable)WherefilterArticle["commandable"] = commandable
        if(idOfShop)WherefilterStock["id_boutique"] = idOfShop.toString()

        if(limit != null && page != null){
            query["limit"] = Number(limit)
            query["offset"] = (page * limit)- limit 
        }
        if(orderby)
        {
            switch(orderby)
            {
            case "note":
                    ordersStock = [[db.article,'note_moyenne','DESC']]
                    ordersArticle =  [['note_moyenne','DESC']]
                break;
            case "price":      
                    ordersStock = [[db.article,'prix_achat','ASC']] 
                    ordersArticle =  [['prix_achat','ASC']]       
                break;
            case "date":
                break;
            }
        }
    
        if(idOfShop != null)
        {          
            query["where"] = WherefilterStock         
            query["include"] = [{model: db.article, as: "article", where: WherefilterArticle}]
            query["order"] = ordersStock 
            return await models.stock.findAndCountAll(query)
        }
        else
        {    
            query["order"] = ordersArticle       
            return await models.article.findAndCountAll(query)
        }
       
    }

    public async GetArticle(id: Number, shopId? : Number)
    {
        if(shopId != null)
        {
            
            return await models.stock.findOne({where: {id_boutique : shopId.toString(), code_article : id.toString()},include : [
                {model: db.article, as: "article", include: [{model: db.commentaire, as: "commentaires",required:false,where: {code_article:id.toString()}, include: [ {model: db.client, as: "client"}]}]}               
              ]})
        }
        else
        {
            return await models.article.findOne({where : {code_article : id.toString()},include : [
                {model: db.commentaire, as: "commentaires",include: [ {model: db.client, as: "client"}]}
              ]})
        }
       
    }

    public async UpdateArticle(article: Article, id :number)
    {

        return await models.article.update({
            intitule_article: article.intitule_article,
            dimension_1: article.dimension_1,
            dimension_2: article.dimension_2,
            dimension_3: article.dimension_3,
            couleur: article.couleur,
            prix_achat: article.prix_achat,
            commandable: article.commandable,
            image: article.image,
            note_moyenne: article.note_moyenne,
            description: article.description    
        },{where: { code_article : id.toString() }})

    }

    public async RemoveArticle(request: any)
    {
        const deletingInCascade = await sequelize.transaction(async(t) => {
            await models.stock.destroy({where : {code_article : request.params.id},transaction:t })
            await models.contenu.destroy({where : {code_article : request.params.id},transaction:t })
            await models.commentaire.destroy({where : {code_article : request.params.id},transaction:t })
            await models.article.destroy({ where : {code_article :request.params.id},transaction:t })
        })
        return deletingInCascade
    }

    // Not recommended ! 
    public async RemoveAllArticles()
    {
        return await sequelize.transaction(async(t) => {
            await models.stock.truncate({where : {},transaction:t })
            await models.contenu.truncate({where : {},transaction:t })
            await models.commentaire.truncate({where : {},transaction:t })
            await models.article.truncate({ where : {},transaction:t })
        })      
    }
    
    
}
