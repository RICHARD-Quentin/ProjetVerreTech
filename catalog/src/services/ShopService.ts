import models, {models as db , sequelize} from '../../../common/database'

export default class 
{
    public async GetShops(request: any)
    {          
        return await models.boutique.findAll()         
    }

    public async GetShop(request: any)
    {          
        return await models.boutique.findOne({where : {id_boutique : request.params.id}})         
    }

    public async CreateShop(request:any)
    {
        console.log(request.enseigne)
        return await models.boutique.create({
                intitule: request.intitule,
                enseigne: request.enseigne,
                adresse_magasin : request.adresse_magasin               
        })         
    }

    public async UpdateShop(request:any)
    {
        return await models.boutique.update({
            intitule: request.intitule,
            enseigne: request.enseigne,
            adresse_magasin : request.adress_magasin               
        },{where : {id_boutique: request.id_boutique}})     
    }

    public async RemoveShop(request: any)
    {
        const deletingInCascade = await sequelize.transaction(async(t) => {
            await models.stock.destroy({where : {id_boutique : request.params.id},transaction:t })
            await models.boutique.destroy({ where : {id_boutique :request.params.id},transaction:t })
        })
        return deletingInCascade
    }

}

