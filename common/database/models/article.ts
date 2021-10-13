import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { commentaire, commentaireId } from './commentaire';
import type { contenu, contenuId } from './contenu';
import type { stock, stockId } from './stock';

export interface articleAttributes {
  code_article: number;
  code_modele: number;
  intitule_article: string;
  dimension_1: number;
  dimension_2: number;
  dimension_3: number;
  couleur: string;
  prix_achat: number;
  commandable: number;
  note_moyenne: number;
  description: string;
}

export type articlePk = "code_article";
export type articleId = article[articlePk];
export type articleCreationAttributes = Optional<articleAttributes, articlePk>;

export class article extends Model<articleAttributes, articleCreationAttributes> implements articleAttributes {
  code_article!: number;
  code_modele!: number;
  intitule_article!: string;
  dimension_1!: number;
  dimension_2!: number;
  dimension_3!: number;
  couleur!: string;
  prix_achat!: number;
  commandable!: number;
  note_moyenne!: number;
  description!: string;

  // article hasMany commentaire via code_article
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
  // article hasMany contenu via code_article
  contenus!: contenu[];
  getContenus!: Sequelize.HasManyGetAssociationsMixin<contenu>;
  setContenus!: Sequelize.HasManySetAssociationsMixin<contenu, contenuId>;
  addContenu!: Sequelize.HasManyAddAssociationMixin<contenu, contenuId>;
  addContenus!: Sequelize.HasManyAddAssociationsMixin<contenu, contenuId>;
  createContenu!: Sequelize.HasManyCreateAssociationMixin<contenu>;
  removeContenu!: Sequelize.HasManyRemoveAssociationMixin<contenu, contenuId>;
  removeContenus!: Sequelize.HasManyRemoveAssociationsMixin<contenu, contenuId>;
  hasContenu!: Sequelize.HasManyHasAssociationMixin<contenu, contenuId>;
  hasContenus!: Sequelize.HasManyHasAssociationsMixin<contenu, contenuId>;
  countContenus!: Sequelize.HasManyCountAssociationsMixin;
  // article hasMany stock via code_article
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

  static initModel(sequelize: Sequelize.Sequelize): typeof article {
    article.init({
    code_article: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code_modele: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    intitule_article: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    dimension_1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dimension_2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dimension_3: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    couleur: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    prix_achat: {
      type: DataTypes.DECIMAL(6,0),
      allowNull: false
    },
    commandable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    note_moyenne: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'article',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code_article" },
        ]
      },
    ]
  });
  return article;
  }
}
