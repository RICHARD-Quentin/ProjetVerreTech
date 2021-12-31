const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contenu', {
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
};
