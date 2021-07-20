const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('boutique', {
    id_boutique: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    intitule: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    enseigne: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    adresse_magasin: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'boutique',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_boutique" },
        ]
      },
    ]
  });
};
