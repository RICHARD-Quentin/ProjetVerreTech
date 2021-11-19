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
    
}
