const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client', {
    id_client: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    date_naissance: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    telephone_f: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    telephone_p: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    d_crea_compte: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    mail: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    authId: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'client',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
    ]
  });
};
