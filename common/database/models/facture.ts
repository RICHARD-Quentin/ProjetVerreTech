import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { client, clientId } from './client';
import type { commande, commandeId } from './commande';
import type { pays, paysId } from './pays';
import type { ville, villeId } from './ville';

export interface factureAttributes {
  no_facture: number;
  id_client: number;
  n_commande: number;
  date_facture: Date;
  id_pays?: number;
  id_ville?: number;
  adresse?: string;
}

export type facturePk = "no_facture";
export type factureId = facture[facturePk];
export type factureCreationAttributes = Optional<factureAttributes, facturePk>;

export class facture extends Model<factureAttributes, factureCreationAttributes> implements factureAttributes {
  no_facture!: number;
  id_client!: number;
  n_commande!: number;
  date_facture!: Date;
  id_pays?: number;
  id_ville?: number;
  adresse?: number;

  // facture belongsTo client via id_client
  id_client_client!: client;
  getId_client_client!: Sequelize.BelongsToGetAssociationMixin<client>;
  setId_client_client!: Sequelize.BelongsToSetAssociationMixin<client, clientId>;
  createId_client_client!: Sequelize.BelongsToCreateAssociationMixin<client>;
  // facture belongsTo commande via n_commande
  n_commande_commande!: commande;
  getN_commande_commande!: Sequelize.BelongsToGetAssociationMixin<commande>;
  setN_commande_commande!: Sequelize.BelongsToSetAssociationMixin<commande, commandeId>;
  createN_commande_commande!: Sequelize.BelongsToCreateAssociationMixin<commande>;
  // facture belongsTo pays via id_pays
  id_pays_pay!: pays;
  getId_pays_pay!: Sequelize.BelongsToGetAssociationMixin<pays>;
  setId_pays_pay!: Sequelize.BelongsToSetAssociationMixin<pays, paysId>;
  createId_pays_pay!: Sequelize.BelongsToCreateAssociationMixin<pays>;
  // facture belongsTo ville via id_ville
  id_ville_ville!: ville;
  getId_ville_ville!: Sequelize.BelongsToGetAssociationMixin<ville>;
  setId_ville_ville!: Sequelize.BelongsToSetAssociationMixin<ville, villeId>;
  createId_ville_ville!: Sequelize.BelongsToCreateAssociationMixin<ville>;

  static initModel(sequelize: Sequelize.Sequelize): typeof facture {
    facture.init({
    no_facture: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id_client'
      }
    },
    n_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commande',
        key: 'n_commande'
      }
    },
    date_facture: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_pays: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pays',
        key: 'id_pays'
      }
    },
    id_ville: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ville',
        key: 'id_ville'
      }
    },
    adresse: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'facture',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "no_facture" },
        ]
      },
      {
        name: "id_client",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
      {
        name: "n_commande",
        using: "BTREE",
        fields: [
          { name: "n_commande" },
        ]
      },
      {
        name: "FK_facture_pays",
        using: "BTREE",
        fields: [
          { name: "id_pays" },
        ]
      },
      {
        name: "FK_facture_ville",
        using: "BTREE",
        fields: [
          { name: "id_ville" },
        ]
      },
    ]
  });
  return facture;
  }
}
