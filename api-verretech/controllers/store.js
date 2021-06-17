const db  = require('../config/db.js');

exports.ArticlesInventories = function(req, res) {
    db.Inventory.findAll(
        {   attributes: ['articleid','quantity'],
      
        include:[
            {model:db.Article,
            attributes: ['name','status']}]
        })
            .then(article => {res.send(article)})
            .catch({Message:"Invalid Order"},404)
};

exports.DeleteOrderById = function(req, res) {
    db.Order.destroy({
        where: {id: req.param('orderid')}
    }).then(order => {
        res.send("successful operation",200)   
    }).catch(err=>res.send({Message:"Order not found"},404))   
};

exports.PlaceOrderForArticle = function(req, res){
    console.log(req.body.articleId)
    db.Order.create(
        {
        articleId: req.body.articleId,
        quantity: req.body.quantity,
        shipDate: req.body.shipDate,
        status: req.body.status,
        complete: req.body.complete
        })
    .then(function () { res.send("successful operation",200) })
    .catch(err=>res.send({Message:"Invalid order"},400));
};

exports.GetOrderById = function(req, res) {
    db.Order.findOne({where:{ id: req.param('orderid')}})
            .then(order => {
                order != null ? res.send(order):res.status(404).send({Success:false, Message:"Order not founded"}); 
           
            })
            .catch((err=>{res.send("Order not found",404)}))
};