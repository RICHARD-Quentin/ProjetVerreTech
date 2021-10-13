import {Request, Response} from "express";
import {validationResult} from 'express-validator';
import { VerifyInventoryList, CreateOrder as CreateOrder } from "../services/inventory";
import { Order,OrderResult, OrderStatus } from "../models/order";
import { PaymentMethod} from "../models/payment";
import Payment  from "../services/payment/payment";

export async function createOrder(req :Request,res :Response)
{
    if(validationResult(req).array().length > 0){
        return res.status(400).send({sucess:false,message:validationResult(req).array()})
    }

    const order:Order = req.body;

    VerifyInventoryList(order.contents,order.id_boutique).then(inventoryVerified =>{
        const orderResult:OrderResult = inventoryVerified;

        const paymentMethod = order.payment.method as PaymentMethod;
        
        const payment:Payment = new Payment(paymentMethod,order.payment.params);

        //Customer pays on the spot 🦄
        ////////////////////////////
        if(PaymentMethod.None == Number(PaymentMethod[paymentMethod]))
        {
            CreateOrder(order,order.id_client,order.date_retrait,order.id_boutique,orderResult,OrderStatus.ToPay).then(orderCreated=>{
                return res.status(200).send({sucess:true,message : orderCreated})
            }).catch(error=>{return res.status(400).send({sucess:false,message:error})})
        }
        ////////////////////////////

        // Customer want to pay 🦄
        ////////////////////////////
        payment.ValidatePayment().then(paymentResult =>
        {
            if(paymentResult == true)
            {
                CreateOrder(order,order.id_client,order.date_retrait,order.id_boutique,orderResult,OrderStatus.Paid).then(orderCreated=>{
                    return res.status(200).send({sucess:true,message : orderCreated})
                }).catch(error=>{return res.status(400).send({sucess:false,message:error})})             
            }
            else
            {
                return res.status(400).send({sucess:false,message:"Invalid payment !"})
            }
        })
        .catch(err =>
        {
            return res.status(400).send({sucess:false,message:err})
        })
        ////////////////////////////
                 
    }).catch(err => {console.log(err) ;return res.status(400).send({sucess:false,message:err})})
}


export async function getOrder(req :Request,res :Response)
{


}

export async function getOrders(req :Request,res :Response)
{

}

/*
export async function createOrder (req, res) 
{
    if(!req.body.id_boutique 
        && !req.body.payment
        && !req.body.id_client
        && !req.body.contenus )return res.status(400).send("Parameters are missing ! (id_boutique,id_client,contenus,payment");
    if(!Array.isArray(req.body.contenus))return res.status(400).send('Argument "contenus" must be an array of articles ! ex: [{code_article:1,quantité:5},{code_article:2,quantité:2}]');
    if(req.body.contenus.length === 0)return res.status(400).send('We can not create order without articles, your array is empty ');
   
    const now = moment(new Date()),end = moment(Date.parse(req.body.date_retrait))
    var hours = end.diff(now, 'hours');
    if(hours < 3)return res.status(400).send('Invalid date_retrait ! The order must be picked up within 3 hours !');

    const transaction = await db.Sequelize.transaction();

    db.article.findAll({
        where : { code_article: req.body.contenus.map(e=>e.code_article)}, 
        attributes: ['prix_achat','code_article','commandable'],
        include : [
            {
                model: db.stock, as: "stocks", 
                attributes:[['quantité','quantity']],
                where : {id_boutique: req.body.id_boutique}
            }
        ]
    }).then(result => {

        let stockUpdated = {}
        let errors = []
        let totalPriceAmount = 0
   
        req.body.contenus.forEach(order=>{
            const articleId = result.find(e=> (e.code_article == order.code_article))
            
            if(articleId)
            {
                if(!articleId.commandable)return errors.push({message:"Order disabled in database",article_id:order.code_article})
                if(articleId.stocks[0] == undefined)return errors.push({message:"No stock for this item",article_id:order.code_article})
                if(order.quantité > articleId.stocks[0].dataValues.quantity)errors.push({message:"The item quantity is not available in stock ",article_id:order.code_article})
                
                stockUpdated[order.code_article] = articleId.stocks[0].dataValues.quantity - order.quantité;
                totalPriceAmount += (articleId.prix_achat * order.quantité)
            }
            else
            {
                errors.push({message:"Article id do not exist in the database !",article_id:order.code_article})
            }
        })

        if(errors.length>0)return res.send({message:"Errors for articles",errors:errors}).status(400);
        
        const payment = new Payment(req.body.payment);

        const paymentAcheived = payment.ExecutePayment(totalPriceAmount);

        //PAypal

        try
        {
            req.body.contenus.forEach(order=>{
                db.stock.update(
                    { quantité : stockUpdated[order.code_article] },
                    { where : { code_article : order.code_article, id_boutique : req.body.id_boutique }},
                    { transaction: transaction }); 
            })

            db.commande.create({
                id_boutique: req.body.id_boutique,
                id_client: req.body.id_client,
                montant: totalPriceAmount,
                date_commande: new Date(),
                date_retrait: Date.parse(req.body.date_retrait),
                statut: 0
            },{transaction: transaction}).then(orderCreated=>{
                transaction.commit();
                return res.status(200).send({message:"Sucessfull creation of order !",order:orderCreated});
            });

        }catch(error)
        {
            transaction.rollback();
            return res.status(400).send({message:"Errors during the modifications of database",errors:error});
        }
        
    }).catch(err=>res.status(400).send(err))

}

export async function getExceededOrders (req, res) 
{  
   
}


export async function OrderVerification(req)
{
    return new Promise((resolve,reject)=>
    {
        if(!req.body.id_boutique 
            && !req.body.id_client
            && !req.body.contenus 
            && !req.body.date_retrait)return reject("Parameters are missing ! (id_boutique,id_client,contenus,date_retrait");
        if(!Array.isArray(req.body.contenus))return reject('Argument "contenus" must be an array of articles ! ex: [{code_article:1,quantité:5},{code_article:2,quantité:2}]');
        if(req.body.contenus.length === 0)return reject('We can not create order without articles, your array is empty ');
        if(Date.parse(req.body.date_retrait) == NaN)return reject('date_retrait must be an date !');
    
        const now = moment(new Date()),end = moment(Date.parse(req.body.date_retrait))
        var hours = end.diff(now, 'hours');
        if(hours < 3)return reject('Invalid date_retrait ! The order must be picked up within 3 hours !');
    
        db.article.findAll({
            where : { code_article: req.body.contenus.map(e=>e.code_article)}, 
            attributes: ['prix_achat','code_article','commandable'],
            include : [
                {
                    model: db.stock, as: "stocks", 
                    attributes:[['quantité','quantity']],
                    where : {id_boutique: req.body.id_boutique}
                }
            ]
        }).then(result=>{
    
            let stockUpdated = {}
            let errors = []
            let totalPriceAmount = 0
       
            req.body.contenus.forEach(order=>{
                const articleId = result.find(e=> (e.code_article == order.code_article))
                
                if(articleId)
                {
                    if(!articleId.commandable)return errors.push({message:"Order disabled in database",article_id:order.code_article})
                    if(articleId.stocks[0] == undefined)return errors.push({message:"No stock for this item",article_id:order.code_article})
                    if(order.quantité > articleId.stocks[0].dataValues.quantity)errors.push({message:"The item quantity is not available in stock ",article_id:order.code_article})
                    
                    stockUpdated[order.code_article] = articleId.stocks[0].dataValues.quantity - order.quantité;
                    totalPriceAmount += (articleId.prix_achat * order.quantité)
                }
                else
                {
                    errors.push({message:"Article id do not exist in the database !",article_id:order.code_article})
                }
            })
    
            if(errors.length>0)return reject({message:"Errors for articles",errors:errors})

            resolve({totalPriceAmount:totalPriceAmount,stockUpdated:stockUpdated})
        })
    })
    
}


export async function getOrdersOfClient (req, res,next) 
{  
    db.commande.findAll({where: { id_client: req.params.id}}).then(result=>
        {
            if(result.length>0)
            {
                res.send(result);
            }
            else
            {
                res.status(404).send("Orders not found");
            }
            
    }).catch(e=> res.status(403).send("Bad request"))
}

*/