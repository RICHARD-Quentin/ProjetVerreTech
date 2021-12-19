import models, {models as db , sequelize} from '../../../common/database'
import { Article } from '../models/Article'

export default class 
{

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

    
    public async GetArticles(idOfShop: Number)
    {
        console.log(idOfShop)

        if(idOfShop != null)
        {
            
            return await models.stock.findAll({attributes: ['quantité','no_stock'],where: { id_boutique : idOfShop.toString()}, include : [
                {model: db.article, as: "article", required: false}
            ]})
        }
        else
        {
            return await models.article.findAll()
        }

        
    }

    public async GetArticle(id: Number, shopId? : Number)
    {
        if(shopId != null)
        {
            return await models.stock.findOne({where: {id_boutique : shopId.toString(), code_article : id.toString()},include : [
                {model: db.article, as: "article"}
              ]})
        }
        else
        {
            return await models.article.findOne({where : {code_article : id.toString()}})
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
