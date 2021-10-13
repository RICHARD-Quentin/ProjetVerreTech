import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { article, articleId } from './article';
import type { client, clientId } from './client';

export interface commentaireAttributes {
  id_commentaire: number;
  code_article: number;
  id_client: number;
  commentaire: string;
  date: string;
  note_client: number;
}

export type commentairePk = "id_commentaire";
export type commentaireId = commentaire[commentairePk];
export type commentaireCreationAttributes = Optional<commentaireAttributes, commentairePk>;

export class commentaire extends Model<commentaireAttributes, commentaireCreationAttributes> implements commentaireAttributes {
  id_commentaire!: number;
  code_article!: number;
  id_client!: number;
  commentaire!: string;
  date!: string;
  note_client!: number;

  // commentaire belongsTo article via code_article
  code_article_article!: article;
  getCode_article_article!: Sequelize.BelongsToGetAssociationMixin<article>;
  setCode_article_article!: Sequelize.BelongsToSetAssociationMixin<article, articleId>;
  createCode_article_article!: Sequelize.BelongsToCreateAssociationMixin<article>;
  // commentaire belongsTo client via id_client
  id_client_client!: client;
  getId_client_client!: Sequelize.BelongsToGetAssociationMixin<client>;
  setId_client_client!: Sequelize.BelongsToSetAssociationMixin<client, clientId>;
  createId_client_client!: Sequelize.BelongsToCreateAssociationMixin<client>;

  static initModel(sequelize: Sequelize.Sequelize): typeof commentaire {
    commentaire.init({
    id_commentaire: {
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
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id_client'
      }
    },
    commentaire: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    note_client: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'commentaire',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_commentaire" },
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
        name: "id_client",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
    ]
  });
  return commentaire;
  }
}
