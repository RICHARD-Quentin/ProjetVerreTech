const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adresse', {
    id_adresse: {
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
    id_pays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pays',
        key: 'id_pays'
      }
    },
    id_ville: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ville',
        key: 'id_ville'
      }
    },
    adresse: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'adresse',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_adresse" },
        ]
      },
      {
        name: "id_pays",
        using: "BTREE",
        fields: [
          { name: "id_pays" },
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
        name: "id_ville",
        using: "BTREE",
        fields: [
          { name: "id_ville" },
        ]
      },
    ]
  });
};
