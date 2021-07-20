const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facture', {
    no_facture: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id_client'
      }
    },
    n_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commande',
        key: 'n_commande'
      }
    },
    date_facture: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'facture',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "no_facture" },
        ]
      },
      {
        name: "id_client",
        using: "BTREE",
        fields: [
          { name: "id_client" },
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
