const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commande', {
    n_commande: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_boutique: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'boutique',
        key: 'id_boutique'
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
    montant: {
      type: DataTypes.DECIMAL(5,0),
      allowNull: false
    },
    date_commande: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_retrait: {
      type: DataTypes.DATE,
      allowNull: false
    },
    statut: {
      type: DataTypes.ENUM('Ready','Preperation','BackInStock','TookOf','Cancelled'),
      allowNull: false
    },
    payment: {
      type: DataTypes.ENUM('Website','Shop'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'commande',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "n_commande" },
        ]
      },
      {
        name: "id_boutique",
        using: "BTREE",
        fields: [
          { name: "id_boutique" },
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
