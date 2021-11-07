import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { adresse, adresseId } from './adresse';
import type { commande, commandeId } from './commande';
import type { commentaire, commentaireId } from './commentaire';
import type { facture, factureId } from './facture';

export interface clientAttributes {
  id_client: number;
  nom: string;
  prenom: string;
  date_naissance: string;
  telephone_f: string;
  telephone_p: string;
  d_crea_compte?: Date;
  mail: string;
  authId: string;
}

export type clientPk = "id_client";
export type clientId = client[clientPk];
export type clientCreationAttributes = Optional<clientAttributes, clientPk>;

export class client extends Model<clientAttributes, clientCreationAttributes> implements clientAttributes {
  id_client!: number;
  nom!: string;
  prenom!: string;
  date_naissance!: string;
  telephone_f!: string;
  telephone_p!: string;
  d_crea_compte?: Date;
  mail!: string;
  authId!: string;

  // client hasMany adresse via id_client
  adresses!: adresse[];
  getAdresses!: Sequelize.HasManyGetAssociationsMixin<adresse>;
  setAdresses!: Sequelize.HasManySetAssociationsMixin<adresse, adresseId>;
  addAdress!: Sequelize.HasManyAddAssociationMixin<adresse, adresseId>;
  addAdresses!: Sequelize.HasManyAddAssociationsMixin<adresse, adresseId>;
  createAdress!: Sequelize.HasManyCreateAssociationMixin<adresse>;
  removeAdress!: Sequelize.HasManyRemoveAssociationMixin<adresse, adresseId>;
  removeAdresses!: Sequelize.HasManyRemoveAssociationsMixin<adresse, adresseId>;
  hasAdress!: Sequelize.HasManyHasAssociationMixin<adresse, adresseId>;
  hasAdresses!: Sequelize.HasManyHasAssociationsMixin<adresse, adresseId>;
  countAdresses!: Sequelize.HasManyCountAssociationsMixin;
  // client hasMany commande via id_client
  commandes!: commande[];
  getCommandes!: Sequelize.HasManyGetAssociationsMixin<commande>;
  setCommandes!: Sequelize.HasManySetAssociationsMixin<commande, commandeId>;
  addCommande!: Sequelize.HasManyAddAssociationMixin<commande, commandeId>;
  addCommandes!: Sequelize.HasManyAddAssociationsMixin<commande, commandeId>;
  createCommande!: Sequelize.HasManyCreateAssociationMixin<commande>;
  removeCommande!: Sequelize.HasManyRemoveAssociationMixin<commande, commandeId>;
  removeCommandes!: Sequelize.HasManyRemoveAssociationsMixin<commande, commandeId>;
  hasCommande!: Sequelize.HasManyHasAssociationMixin<commande, commandeId>;
  hasCommandes!: Sequelize.HasManyHasAssociationsMixin<commande, commandeId>;
  countCommandes!: Sequelize.HasManyCountAssociationsMixin;
  // client hasMany commentaire via id_client
  commentaires!: commentaire[];
  getCommentaires!: Sequelize.HasManyGetAssociationsMixin<commentaire>;
  setCommentaires!: Sequelize.HasManySetAssociationsMixin<commentaire, commentaireId>;
  addCommentaire!: Sequelize.HasManyAddAssociationMixin<commentaire, commentaireId>;
  addCommentaires!: Sequelize.HasManyAddAssociationsMixin<commentaire, commentaireId>;
  createCommentaire!: Sequelize.HasManyCreateAssociationMixin<commentaire>;
  removeCommentaire!: Sequelize.HasManyRemoveAssociationMixin<commentaire, commentaireId>;
  removeCommentaires!: Sequelize.HasManyRemoveAssociationsMixin<commentaire, commentaireId>;
  hasCommentaire!: Sequelize.HasManyHasAssociationMixin<commentaire, commentaireId>;
  hasCommentaires!: Sequelize.HasManyHasAssociationsMixin<commentaire, commentaireId>;
  countCommentaires!: Sequelize.HasManyCountAssociationsMixin;
  // client hasMany facture via id_client
  factures!: facture[];
  getFactures!: Sequelize.HasManyGetAssociationsMixin<facture>;
  setFactures!: Sequelize.HasManySetAssociationsMixin<facture, factureId>;
  addFacture!: Sequelize.HasManyAddAssociationMixin<facture, factureId>;
  addFactures!: Sequelize.HasManyAddAssociationsMixin<facture, factureId>;
  createFacture!: Sequelize.HasManyCreateAssociationMixin<facture>;
  removeFacture!: Sequelize.HasManyRemoveAssociationMixin<facture, factureId>;
  removeFactures!: Sequelize.HasManyRemoveAssociationsMixin<facture, factureId>;
  hasFacture!: Sequelize.HasManyHasAssociationMixin<facture, factureId>;
  hasFactures!: Sequelize.HasManyHasAssociationsMixin<facture, factureId>;
  countFactures!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof client {
    client.init({
    id_client: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    date_naissance: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    telephone_f: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    telephone_p: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    d_crea_compte: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    mail: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    authId: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'client',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
    ]
  });
  return client;
  }
}
