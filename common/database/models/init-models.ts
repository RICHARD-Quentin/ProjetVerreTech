import type { Sequelize, Model } from "sequelize";
import { SequelizeMeta } from "./SequelizeMeta";
import type { SequelizeMetaAttributes, SequelizeMetaCreationAttributes } from "./SequelizeMeta";
import { adresse } from "./adresse";
import type { adresseAttributes, adresseCreationAttributes } from "./adresse";
import { article } from "./article";
import type { articleAttributes, articleCreationAttributes } from "./article";
import { boutique } from "./boutique";
import type { boutiqueAttributes, boutiqueCreationAttributes } from "./boutique";
import { client } from "./client";
import type { clientAttributes, clientCreationAttributes } from "./client";
import { commande } from "./commande";
import type { commandeAttributes, commandeCreationAttributes } from "./commande";
import { commentaire } from "./commentaire";
import type { commentaireAttributes, commentaireCreationAttributes } from "./commentaire";
import { contenu } from "./contenu";
import type { contenuAttributes, contenuCreationAttributes } from "./contenu";
import { facture } from "./facture";
import type { factureAttributes, factureCreationAttributes } from "./facture";
import { pays } from "./pays";
import type { paysAttributes, paysCreationAttributes } from "./pays";
import { stock } from "./stock";
import type { stockAttributes, stockCreationAttributes } from "./stock";
import { ville } from "./ville";
import type { villeAttributes, villeCreationAttributes } from "./ville";

export {
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

export type {
  SequelizeMetaAttributes,
  SequelizeMetaCreationAttributes,
  adresseAttributes,
  adresseCreationAttributes,
  articleAttributes,
  articleCreationAttributes,
  boutiqueAttributes,
  boutiqueCreationAttributes,
  clientAttributes,
  clientCreationAttributes,
  commandeAttributes,
  commandeCreationAttributes,
  commentaireAttributes,
  commentaireCreationAttributes,
  contenuAttributes,
  contenuCreationAttributes,
  factureAttributes,
  factureCreationAttributes,
  paysAttributes,
  paysCreationAttributes,
  stockAttributes,
  stockCreationAttributes,
  villeAttributes,
  villeCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  SequelizeMeta.initModel(sequelize);
  adresse.initModel(sequelize);
  article.initModel(sequelize);
  boutique.initModel(sequelize);
  client.initModel(sequelize);
  commande.initModel(sequelize);
  commentaire.initModel(sequelize);
  contenu.initModel(sequelize);
  facture.initModel(sequelize);
  pays.initModel(sequelize);
  stock.initModel(sequelize);
  ville.initModel(sequelize);

  commentaire.belongsTo(article, { as: "article", foreignKey: "code_article"});
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
    SequelizeMeta: SequelizeMeta,
    adresse: adresse,
    article: article,
    boutique: boutique,
    client: client,
    commande: commande,
    commentaire: commentaire,
    contenu: contenu,
    facture: facture,
    pays: pays,
    stock: stock,
    ville: ville,
  };
}
