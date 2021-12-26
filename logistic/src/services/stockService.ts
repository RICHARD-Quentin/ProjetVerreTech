import models, {models as db , sequelize} from '../../../common/database'
import {Stock}  from '../models/stock'

export async function GetStockOFShop(id:number)
{
    return await db.stock.findAll({where:{id_boutique:id}, include : [ {model: db.article, as: "article"},{model: db.boutique, as: "boutique"}]})
}

export async function GetStockWithArticleId(id:number)
{
    return await db.stock.findAll({where:{code_article:id}, include : [ {model: db.article, as: "article"},{model: db.boutique, as: "boutique"}]})
}

export async function ModifyStock(stock:Stock)
{
    return await db.stock.upsert(stock)
}

export async function AddStock(stock:Stock)
{
    return await db.stock.create(stock)
}

export async function Remove(id:number)
{
    return await db.stock.destroy({where:{no_stock : id}})
}

export async function RemoveAllStockOfShop(id:number)
{
    return await db.stock.destroy({where:{id_boutique : id}})
}

export async function RemoveAllStockOfArticle(id:number)
{
    return await db.stock.destroy({where:{code_article : id}})
}

export async function GetAllStock()
{
    return await db.stock.findAll({include:[ {model: db.article, as: "article"},{model: db.boutique, as: "boutique"}]})
}

export async function GetStockWithId(id:number)
{
    return await db.stock.findOne({where: {no_stock : id},include:[ {model: db.article, as: "article"},{model: db.boutique, as: "boutique"}]})
}