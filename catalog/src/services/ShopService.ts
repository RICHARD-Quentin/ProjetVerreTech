import models, {models as db , sequelize} from '../../../common/database'
import { Shop } from '../models/Shop'

export default class 
{
    public async GetShops()
    {          
        return await models.boutique.findAll()         
    }

    public async GetShop(id: number)
    {          
        return await models.boutique.findOne({where : {id_boutique : id.toString()}})         
    }

    public async CreateShop(shop:Shop)
    {
        return await models.boutique.create({
                intitule: shop.intitule,
                enseigne: shop.enseigne,
                adresse_magasin : shop.adresse_magasin,
                lat: shop.lat,
                lng: shop.lng               
        })         
    }

    public async UpdateShop(shop:Shop, id : number)
    {  
        return await models.boutique.update({
            intitule: shop.intitule,
            enseigne: shop.enseigne,
            adresse_magasin : shop.adresse_magasin               
        },{where : {id_boutique: id.toString()}})     
    }

    public async RemoveShop(id: number)
    {
        const deletingInCascade = await sequelize.transaction(async(t) => {
            await models.stock.destroy({where : {id_boutique : id},transaction:t })
            await models.boutique.destroy({ where : {id_boutique :id},transaction:t })
        })
        return deletingInCascade
    }

}

