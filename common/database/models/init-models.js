var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _adresse = require("./adresse");
var _article = require("./article");
var _boutique = require("./boutique");
var _client = require("./client");
var _commande = require("./commande");
var _commentaire = require("./commentaire");
var _contenu = require("./contenu");
var _facture = require("./facture");
var _pays = require("./pays");
var _stock = require("./stock");
var _ville = require("./ville");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var adresse = _adresse(sequelize, DataTypes);
  var article = _article(sequelize, DataTypes);
  var boutique = _boutique(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var commande = _commande(sequelize, DataTypes);
  var commentaire = _commentaire(sequelize, DataTypes);
  var contenu = _contenu(sequelize, DataTypes);
  var facture = _facture(sequelize, DataTypes);
  var pays = _pays(sequelize, DataTypes);
  var stock = _stock(sequelize, DataTypes);
  var ville = _ville(sequelize, DataTypes);

  commentaire.belongsTo(article, { as: "code_article_article", foreignKey: "code_article"});
  article.hasMany(commentaire, { as: "commentaires", foreignKey: "code_article"});
  contenu.belongsTo(article, { as: "code_article_article", foreignKey: "code_article"});
  article.hasMany(contenu, { as: "contenus", foreignKey: "code_article"});
  stock.belongsTo(article, { as: "code_article_article", foreignKey: "code_article"});
  article.hasMany(stock, { as: "stocks", foreignKey: "code_article"});
  commande.belongsTo(boutique, { as: "id_boutique_boutique", foreignKey: "id_boutique"});
  boutique.hasMany(commande, { as: "commandes", foreignKey: "id_boutique"});
  stock.belongsTo(boutique, { as: "id_boutique_boutique", foreignKey: "id_boutique"});
  boutique.hasMany(stock, { as: "stocks", foreignKey: "id_boutique"});
  adresse.belongsTo(client, { as: "id_client_client", foreignKey: "id_client"});
  client.hasMany(adresse, { as: "adresses", foreignKey: "id_client"});
  commande.belongsTo(client, { as: "id_client_client", foreignKey: "id_client"});
  client.hasMany(commande, { as: "commandes", foreignKey: "id_client"});
  commentaire.belongsTo(client, { as: "id_client_client", foreignKey: "id_client"});
  client.hasMany(commentaire, { as: "commentaires", foreignKey: "id_client"});
  facture.belongsTo(client, { as: "id_client_client", foreignKey: "id_client"});
  client.hasMany(facture, { as: "factures", foreignKey: "id_client"});
  contenu.belongsTo(commande, { as: "n_commande_commande", foreignKey: "n_commande"});
  commande.hasMany(contenu, { as: "contenus", foreignKey: "n_commande"});
  facture.belongsTo(commande, { as: "n_commande_commande", foreignKey: "n_commande"});
  commande.hasMany(facture, { as: "factures", foreignKey: "n_commande"});
  adresse.belongsTo(pays, { as: "id_pays_pay", foreignKey: "id_pays"});
  pays.hasMany(adresse, { as: "adresses", foreignKey: "id_pays"});
  ville.belongsTo(pays, { as: "id_pays_pay", foreignKey: "id_pays"});
  pays.hasMany(ville, { as: "villes", foreignKey: "id_pays"});
  adresse.belongsTo(ville, { as: "id_ville_ville", foreignKey: "id_ville"});
  ville.hasMany(adresse, { as: "adresses", foreignKey: "id_ville"});

  return {
    SequelizeMeta,
    adresse,
    article,
    boutique,
    client,
    commande,
    commentaire,
    contenu,
    facture,
    pays,
    stock,
    ville,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
