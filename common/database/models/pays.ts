import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { adresse, adresseId } from './adresse';
import type { facture, factureId } from './facture';
import type { ville, villeId } from './ville';

export interface paysAttributes {
  id_pays: number;
  pays: string;
}

export type paysPk = "id_pays";
export type paysId = pays[paysPk];
export type paysCreationAttributes = Optional<paysAttributes, paysPk>;

export class pays extends Model<paysAttributes, paysCreationAttributes> implements paysAttributes {
  id_pays!: number;
  pays!: string;

  // pays hasMany adresse via id_pays
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
  // pays hasMany facture via id_pays
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
  // pays hasMany ville via id_pays
  villes!: ville[];
  getVilles!: Sequelize.HasManyGetAssociationsMixin<ville>;
  setVilles!: Sequelize.HasManySetAssociationsMixin<ville, villeId>;
  addVille!: Sequelize.HasManyAddAssociationMixin<ville, villeId>;
  addVilles!: Sequelize.HasManyAddAssociationsMixin<ville, villeId>;
  createVille!: Sequelize.HasManyCreateAssociationMixin<ville>;
  removeVille!: Sequelize.HasManyRemoveAssociationMixin<ville, villeId>;
  removeVilles!: Sequelize.HasManyRemoveAssociationsMixin<ville, villeId>;
  hasVille!: Sequelize.HasManyHasAssociationMixin<ville, villeId>;
  hasVilles!: Sequelize.HasManyHasAssociationsMixin<ville, villeId>;
  countVilles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof pays {
    pays.init({
    id_pays: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pays: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pays',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pays" },
        ]
      },
    ]
  });
  return pays;
  }
}
