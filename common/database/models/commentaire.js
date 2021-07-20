const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commentaire', {
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
};
