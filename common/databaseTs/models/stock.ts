import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { article, articleId } from './article';
import type { boutique, boutiqueId } from './boutique';

export interface stockAttributes {
  no_stock: number;
  code_article: number;
  id_boutique: number;
  'quantité': number;
}

export type stockPk = "no_stock";
export type stockId = stock[stockPk];
export type stockOptionalAttributes = "no_stock";
export type stockCreationAttributes = Optional<stockAttributes, stockOptionalAttributes>;

export class stock extends Model<stockAttributes, stockCreationAttributes> implements stockAttributes {
  no_stock!: number;
  code_article!: number;
  id_boutique!: number;
  'quantité'!: number;

  // stock belongsTo article via code_article
  code_article_article!: article;
  getCode_article_article!: Sequelize.BelongsToGetAssociationMixin<article>;
  setCode_article_article!: Sequelize.BelongsToSetAssociationMixin<article, articleId>;
  createCode_article_article!: Sequelize.BelongsToCreateAssociationMixin<article>;
  // stock belongsTo boutique via id_boutique
  id_boutique_boutique!: boutique;
  getId_boutique_boutique!: Sequelize.BelongsToGetAssociationMixin<boutique>;
  setId_boutique_boutique!: Sequelize.BelongsToSetAssociationMixin<boutique, boutiqueId>;
  createId_boutique_boutique!: Sequelize.BelongsToCreateAssociationMixin<boutique>;

  static initModel(sequelize: Sequelize.Sequelize): typeof stock {
    stock.init({
    no_stock: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code_article: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'article',
        key: 'code_article'
      }
    },
    id_boutique: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'boutique',
        key: 'id_boutique'
      }
    },
    'quantité': {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'stock',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "no_stock" },
        ]
      },
      {
        name: "code_article",
        using: "BTREE",
        fields: [
          { name: "code_article" },
        ]
      },
      {
        name: "id_boutique",
        using: "BTREE",
        fields: [
          { name: "id_boutique" },
        ]
      },
    ]
  });
  return stock;
  }
}
