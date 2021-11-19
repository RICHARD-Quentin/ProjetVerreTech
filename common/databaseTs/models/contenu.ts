import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { article, articleId } from './article';
import type { commande, commandeId } from './commande';

export interface contenuAttributes {
  id_commande: number;
  n_commande: number;
  code_article: number;
  quantite: number;
}

export type contenuPk = "id_commande";
export type contenuId = contenu[contenuPk];
export type contenuOptionalAttributes = "id_commande";
export type contenuCreationAttributes = Optional<contenuAttributes, contenuOptionalAttributes>;

export class contenu extends Model<contenuAttributes, contenuCreationAttributes> implements contenuAttributes {
  id_commande!: number;
  n_commande!: number;
  code_article!: number;
  quantite!: number;

  // contenu belongsTo article via code_article
  code_article_article!: article;
  getCode_article_article!: Sequelize.BelongsToGetAssociationMixin<article>;
  setCode_article_article!: Sequelize.BelongsToSetAssociationMixin<article, articleId>;
  createCode_article_article!: Sequelize.BelongsToCreateAssociationMixin<article>;
  // contenu belongsTo commande via n_commande
  n_commande_commande!: commande;
  getN_commande_commande!: Sequelize.BelongsToGetAssociationMixin<commande>;
  setN_commande_commande!: Sequelize.BelongsToSetAssociationMixin<commande, commandeId>;
  createN_commande_commande!: Sequelize.BelongsToCreateAssociationMixin<commande>;

  static initModel(sequelize: Sequelize.Sequelize): typeof contenu {
    contenu.init({
    id_commande: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    n_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commande',
        key: 'n_commande'
      }
    },
    code_article: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'article',
        key: 'code_article'
      }
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'contenu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_commande" },
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
        name: "n_commande",
        using: "BTREE",
        fields: [
          { name: "n_commande" },
        ]
      },
    ]
  });
  return contenu;
  }
}
