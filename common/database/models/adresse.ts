import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { client, clientId } from './client';
import type { pays, paysId } from './pays';
import type { ville, villeId } from './ville';

export interface adresseAttributes {
  id_adresse: number;
  id_client: number;
  id_pays?: number;
  id_ville?: number;
  adresse: string;
}

export type adressePk = "id_adresse";
export type adresseId = adresse[adressePk];
export type adresseCreationAttributes = Optional<adresseAttributes, adressePk>;

export class adresse extends Model<adresseAttributes, adresseCreationAttributes> implements adresseAttributes {
  id_adresse!: number;
  id_client!: number;
  id_pays?: number;
  id_ville?: number;
  adresse!: string;

  // adresse belongsTo client via id_client
  id_client_client!: client;
  getId_client_client!: Sequelize.BelongsToGetAssociationMixin<client>;
  setId_client_client!: Sequelize.BelongsToSetAssociationMixin<client, clientId>;
  createId_client_client!: Sequelize.BelongsToCreateAssociationMixin<client>;
  // adresse belongsTo pays via id_pays
  id_pays_pay!: pays;
  getId_pays_pay!: Sequelize.BelongsToGetAssociationMixin<pays>;
  setId_pays_pay!: Sequelize.BelongsToSetAssociationMixin<pays, paysId>;
  createId_pays_pay!: Sequelize.BelongsToCreateAssociationMixin<pays>;
  // adresse belongsTo ville via id_ville
  id_ville_ville!: ville;
  getId_ville_ville!: Sequelize.BelongsToGetAssociationMixin<ville>;
  setId_ville_ville!: Sequelize.BelongsToSetAssociationMixin<ville, villeId>;
  createId_ville_ville!: Sequelize.BelongsToCreateAssociationMixin<ville>;

  static initModel(sequelize: Sequelize.Sequelize): typeof adresse {
    adresse.init({
    id_adresse: {
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
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'adresse',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_adresse" },
        ]
      },
      {
        name: "id_client",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
    ]
  });
  return adresse;
  }
}
