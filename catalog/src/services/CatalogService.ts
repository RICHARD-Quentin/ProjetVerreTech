import models, {models as db , sequelize} from '../../../common/database'

export default class 
{

    public async CreateArticle(request:any)
    {
        return await models.article.create({
                intitule_article: request.intitule_article,
                dimension_1: request.dimension_1,
                dimension_2: request.dimension_2,
                dimension_3: request.dimension_3,
                couleur: request.couleur,
                prix_achat: request.prix_achat,
                commandable: request.commandable,
                image: request.image,
                note_moyenne: request.note_moyenne,
                description: request.description    
        })         
    }

    
    public async GetArticles(request: any)
    {
        if(request.query.id_boutique != null)
        {
            
            return await models.stock.findAll({attributes: ['quantité','no_stock'],where: { id_boutique : request.query.id_boutique}, include : [
                {model: db.article, as: "article", required: false}
            ]})
        }
        else
        {
            return await models.article.findAll()
        }

        
    }

    public async GetArticle(request: any)
    {
        if(request.query.id_boutique != null)
        {
            return await models.stock.findOne({where: {id_boutique : request.query.id_boutique, code_article : request.params.id},include : [
                {model: db.article, as: "article"}
              ]})
        }
        else
        {
            return await models.article.findOne({where : {code_article : request.query.id}})
        }
       
    }

    public async UpdateArticle(request: any)
    {
        const res = await models.article.update({
            intitule_article: request.intitule_article,
            dimension_1: request.dimension_1,
            dimension_2: request.dimension_2,
            dimension_3: request.dimension_3,
            couleur: request.couleur,
            prix_achat: request.prix_achat,
            commandable: request.commandable,
            image: request.image,
            note_moyenne: request.note_moyenne,
            description: request.description    
        },{where: { code_article : request.code_article }, returning : true})
       return res
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
        const deletingInCascade = await sequelize.transaction(async(t) => {
            await models.stock.truncate({where : {},transaction:t })
            await models.contenu.truncate({where : {},transaction:t })
            await models.commentaire.truncate({where : {},transaction:t })
            await models.article.truncate({ where : {},transaction:t })
        })
        return deletingInCascade
    }
    
    
}
