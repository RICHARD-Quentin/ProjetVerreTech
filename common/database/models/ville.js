const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ville', {
    id_ville: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pays',
        key: 'id_pays'
      }
    },
    ville: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    code_postal: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ville',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ville" },
        ]
      },
      {
        name: "id_pays",
        using: "BTREE",
        fields: [
          { name: "id_pays" },
        ]
      },
    ]
  });
};
