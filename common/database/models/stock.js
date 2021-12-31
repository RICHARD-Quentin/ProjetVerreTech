const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stock', {
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
};
