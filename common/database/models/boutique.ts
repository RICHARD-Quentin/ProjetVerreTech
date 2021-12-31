import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { commande, commandeId } from './commande';
import type { stock, stockId } from './stock';

export interface boutiqueAttributes {
  id_boutique: number;
  intitule: string;
  enseigne: string;
  adresse_magasin: string;
  lat?: number;
  lng?: number;
}

export type boutiquePk = "id_boutique";
export type boutiqueId = boutique[boutiquePk];
export type boutiqueCreationAttributes = Optional<boutiqueAttributes, boutiquePk>;

export class boutique extends Model<boutiqueAttributes, boutiqueCreationAttributes> implements boutiqueAttributes {
  id_boutique!: number;
  intitule!: string;
  enseigne!: string;
  adresse_magasin!: string;
  lat?: number;
  lng?: number;

  // boutique hasMany commande via id_boutique
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
  // boutique hasMany stock via id_boutique
  stocks!: stock[];
  getStocks!: Sequelize.HasManyGetAssociationsMixin<stock>;
  setStocks!: Sequelize.HasManySetAssociationsMixin<stock, stockId>;
  addStock!: Sequelize.HasManyAddAssociationMixin<stock, stockId>;
  addStocks!: Sequelize.HasManyAddAssociationsMixin<stock, stockId>;
  createStock!: Sequelize.HasManyCreateAssociationMixin<stock>;
  removeStock!: Sequelize.HasManyRemoveAssociationMixin<stock, stockId>;
  removeStocks!: Sequelize.HasManyRemoveAssociationsMixin<stock, stockId>;
  hasStock!: Sequelize.HasManyHasAssociationMixin<stock, stockId>;
  hasStocks!: Sequelize.HasManyHasAssociationsMixin<stock, stockId>;
  countStocks!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof boutique {
    boutique.init({
    id_boutique: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    intitule: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    enseigne: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    adresse_magasin: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(20,6),
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL(20,6),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'boutique',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_boutique" },
        ]
      },
    ]
  });
  return boutique;
  }
}
