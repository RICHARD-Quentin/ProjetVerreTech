import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { adresse, adresseId } from './adresse';
import type { pays, paysId } from './pays';

export interface villeAttributes {
  id_ville: number;
  id_pays: number;
  ville: string;
  code_postal: string;
}

export type villePk = "id_ville";
export type villeId = ville[villePk];
export type villeCreationAttributes = Optional<villeAttributes, villePk>;

export class ville extends Model<villeAttributes, villeCreationAttributes> implements villeAttributes {
  id_ville!: number;
  id_pays!: number;
  ville!: string;
  code_postal!: string;

  // ville belongsTo pays via id_pays
  id_pays_pay!: pays;
  getId_pays_pay!: Sequelize.BelongsToGetAssociationMixin<pays>;
  setId_pays_pay!: Sequelize.BelongsToSetAssociationMixin<pays, paysId>;
  createId_pays_pay!: Sequelize.BelongsToCreateAssociationMixin<pays>;
  // ville hasMany adresse via id_ville
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

  static initModel(sequelize: Sequelize.Sequelize): typeof ville {
    ville.init({
    id_ville: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pays',
        key: 'id_pays'
      }
    },
    ville: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    code_postal: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ville',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ville" },
        ]
      },
      {
        name: "FK_ville_pays",
        using: "BTREE",
        fields: [
          { name: "id_pays" },
        ]
      },
    ]
  });
  return ville;
  }
}
