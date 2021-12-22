import {content,OrderResult,Order, OrderPayment} from '../models/order'
import models, {models as db , sequelize} from '../../../common/database'

export async function getOrdersOfClient(id:number)
{
  return await db.commande.findAll({
    attributes: ['n_commande','montant','date_commande','date_retrait','statut','payment'],
    where: { id_client: id},
    include : [
      {model: db.boutique, as: "boutique"},
      {model: db.facture, as: "factures"},
      {model: db.contenu, as: "contenus", include :[{model:db.article,as:"article",attributes: ['intitule_article','prix_achat']}]}
    ]
  })
}

export async function cancelOrder(id:number)
{
  return "Not implemented !"
}

export async function getOrder(idOrder:number)
{
  return await db.commande.findOne({where: { n_commande: idOrder},include : [
    {model: db.client, as: "client"}
]})
}

export async function getAllOrders()
{
  return await db.commande.findAll()
}

export async function CreateOrder(customerOrder:Order,id_client:number,date_retrait:Date, id_boutique:number,orderResult:OrderResult, paymentType:OrderPayment) {
  
  //CreateOrder is an BIG SQL Transaction ! ! ! 📝 
  
    try
    {     
      const order = await sequelize.transaction(async(t) => {
       
        orderResult.content.forEach(async order=>{
          await db.stock.update(
            { quantité : order.quantité },
            

            { where : { code_article : order.code_article, id_boutique : id_boutique },
            transaction:t })
          })

        const newOrder = await db.commande.create({
          id_boutique: id_boutique,
          id_client: id_client,
          montant: orderResult.totalPrice,
          date_commande: new Date(),
          date_retrait: customerOrder.date_retrait,
          statut: "Preperation",
          payment: paymentType == OrderPayment.Shop ? "Shop":"Website"
          },
          {transaction:t})
         

          const contents = await db.contenu.bulkCreate(customerOrder.contents.map(e =>{
            return {n_commande:newOrder.n_commande,
              code_article: e.code_article,
              quantite: e.quantité}
          }),{transaction:t})
          
          //Create Invoice if there has been payment
          if(paymentType == OrderPayment.Website)
          {
            await db.facture.create(
              {
                id_client:id_client,
                n_commande: newOrder.n_commande,
                date_facture:new Date()
              },{transaction:t})
          }                 
          return newOrder
                    
      }).catch(err=>{return err})
      return order;
     
    } 
  catch(error)
  {
      return null;
  }
  
}

export async function VerifyInventoryList(content: Array<content>, id_boutique:number) : Promise<OrderResult>
{
 
  return new Promise((resolve,reject) =>
  {
    
  db.article.findAll({
    where : { code_article: content.map(e=>e.code_article)}, 
    attributes: ['prix_achat','code_article','commandable'],
    include : [
        {
            model: db.stock, as: "stocks", 
            attributes:[['quantité','quantity']],
            where : {id_boutique: id_boutique}
        }
    ]
  }).then(result => {

    let stockUpdated: Array<content> = new Array<content>();
    let errors:Array<object> = []
    let totalPriceAmount:number = 0

    content.forEach(order=>{
        const articleId:any = result.find(e=> (e.code_article == order.code_article))
    
        if(articleId)
        {
            if(!articleId.commandable)return errors.push({message:"Order disabled in database",article_id:order.code_article})
            if(articleId.stocks[0] == undefined)return errors.push({message:"No stock for this item",article_id:order.code_article})
            if(order.quantité > articleId.stocks[0].dataValues.quantity)errors.push({message:"The item quantity is not available in stock ",article_id:order.code_article})
                    
            let newStock:content = {
              code_article : articleId.code_article,
              quantité : articleId.stocks[0].dataValues.quantity - order.quantité

            };
            stockUpdated.push(newStock)

            totalPriceAmount += (articleId.prix_achat * order.quantité)
        }
        else
        {
            errors.push({message:"Article id do not exist in the database !",article_id:order.code_article})
        }
    })
  
    if(errors.length>0)return reject(errors)
   
    const res:OrderResult = {
      totalPrice:totalPriceAmount,content:stockUpdated
    }

    return resolve(res)

  })

})
  
}