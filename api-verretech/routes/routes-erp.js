const fs = require('fs');

var express = require('express');
var router = express.Router();
var verifytoken = require('../middleware/auth');

var UserController = require('../controllers/users')
var StoreController = require('../controllers/store')
var ArticleController = require('../controllers/article')
var RateLimit = require('express-rate-limit');
var limiter = new RateLimit({
    windowMs: 1*60*1000, // 1 minute
    max: 5
});

router.use(limiter)

router.route('/').get(function(req, res)
    {
        let rawdata = fs.readFileSync('./swagger.json');
        let swagger = JSON.parse(rawdata);

        var data = {
            Api: 'Verre-Tech SimulatorAPI',
            Version: '1.0',
            Copright: '2020 FenrirProject',
            Swagger: swagger
        };
        res.json(data)
            
    });

router.route('/user/login').get(UserController.getLogsUser);
router.route('/oauth/authorize').get(UserController.getAuthorizationUser);
router.route('/user/:username').get(UserController.getUserByName);
router.route('/user/').post(UserController.createUser);
router.route('/user/:username').put(UserController.updateUser);
router.route('/user/:username').delete(UserController.deleteUser);
router.route('/user/logout').get(UserController.getLogsOutUser);

router.route('/article/:id').get(ArticleController.findArticleById);
router.route('/article/:id').post(ArticleController.updateArticle);
router.route('/article/:id').delete(ArticleController.DeleteArticle);
router.route('/article/:id/uploadImage').post(ArticleController.UploadImage);
router.route('/article').post(ArticleController.AddNewArticleToTheStore);
router.route('/article').put(ArticleController.UpdateAnExistingArticle);
router.route('/article/findByStatus').get(ArticleController.FindsArticleByStatus);

router.route('/store/inventory').get(StoreController.ArticlesInventories);
router.route('/store/order/:orderid').get(StoreController.GetOrderById);
router.route('/store/order/:orderid').delete(StoreController.DeleteOrderById);
router.route('/store/order').post(StoreController.PlaceOrderForArticle);

router.route('/src/:id').get(ArticleController.GetImageUrl);

module.exports = router;