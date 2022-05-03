const db  = require('../config/db.js');
var fs = require('fs');
const { nextTick } = require('process');
const url = require("url");
var sanitize = require("sanitize-filename")


exports.findArticleById = async(req, res,next) =>{
    const idParsed= parseInt(req.params.id)

    if(isNaN(req.params.id)){next();return;}
    db.Article.findOne({
        attributes: ['id', 'name', 'photoUrls','status'],
        where: { id: req.params.id},
        include:[{model: db.Category, as:'category'}] })
            .then(article => {
                article != null ? res.send(article):res.status(404).send({Success:false, Message:"Article not founded"});                
            })
            .catch((err=>{res.send("Article not found",404)}))
        
}

exports.updateArticle = function (req, res) {
    db.Article.findOne({ where: { id: req.param('id') } })
        .then(article => {
            article.update({
                name: req.body.name,
                status: req.body.status,
                photoUrls: req.body.photoUrls,
                categoryid: req.body.categoryid
            })
                .then(function () { res.send("successful operation", 200) })
                .catch(err => res.send("Invalid user supplied" + err, 400))
        })

        .catch(err => {
            db.Article.create({
                id: req.param('id'),
                name: req.body.name,
                status: req.body.status,
                photoUrls: req.body.photoUrls,
                categoryid: req.body.categoryid
            })
                .then(function () { res.send("successful operation", 200) })
                .catch(err => res.send("Invalid user supplied" + err, 400))
        })
};

exports.DeleteArticle = async(req, res) =>{
    db.Article.destroy({
        where: {id: req.param('id')}
      }).then(function (){ res.send("successful operation",200)})
      .catch(err=>res.send("Article not found",404))
};

exports.UploadImage = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.AddNewArticleToTheStore = async(req, res) =>{
    db.Article.create({
        name: req.body.name,
        status: req.body.status,
        photoUrls: req.body.photoUrls,
        categoryid: req.body.category_id
    })
        .then(function (){ res.send("successful operation",200)})
.catch(err=>res.send("Invalid user supplied",400))
        
};

exports.UpdateAnExistingArticle = function(req, res) {
    db.Article.findOne({ where: { id: req.param('id')} })
    .then(article => {   
    if (article) {
        article.update({
        name: req.body.name,
        status: req.body.status,
        photoUrls: req.body.photoUrls,
        categoryid: req.body.category_id  
      })
      .then(function (){ res.send("successful operation",200)})
      .catch(err=>{res.send("Invalid user supplied",400);})
    }else{res.send("User not found",404)}
  }).catch(err=>res.send("Invalid user supplied",400))
};

exports.FindsArticleByStatus = function(req, res) {
    console.log(req.params.status)
    db.Article.findAll({ 
        attributes: ['id', 'name', 'photoUrls','status'],
        where: { status: req.body.status},
        include:[{model: db.Category, as:'category'}] })
    .then(articles => {res.send(articles)})
    .catch(err=>res.status(200).send({Success:"false",Message: "Invalid status Message ! Status what u can uses : available, pending and sold."},400))
};

exports.GetImageUrl = function(req,res) {
    const path = './images/'+req.params.id
    fs.readFile(sanitize(path) , (err, data) => {
        if (err){return res.status(404).send("File not found.")}
        res.set('Content-Type', 'image/png');
        res.status(200).send(data)
        }
)}


