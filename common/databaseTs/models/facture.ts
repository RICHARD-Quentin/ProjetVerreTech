import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { client, clientId } from './client';
import type { commande, commandeId } from './commande';

export interface factureAttributes {
  no_facture: number;
  id_client: number;
  n_commande: number;
  date_facture: Date;
}

export type facturePk = "no_facture";
export type factureId = facture[facturePk];
export type factureOptionalAttributes = "no_facture";
export type factureCreationAttributes = Optional<factureAttributes, factureOptionalAttributes>;

export class facture extends Model<factureAttributes, factureCreationAttributes> implements factureAttributes {
  no_facture!: number;
  id_client!: number;
  n_commande!: number;
  date_facture!: Date;

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
    ]
  });
  return facture;
  }
}
