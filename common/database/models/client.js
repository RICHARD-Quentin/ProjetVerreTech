const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Client = sequelize.define('client', {
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    telephone_p: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    d_crea_compte: {
      type: DataTypes.DATE,
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    mdp: {
      type: DataTypes.STRING(15),
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
<<<<<<< HEAD
  return Client
=======
>>>>>>> 2675ca1 (ajout de sequelize + premiere migration + import models depuis db + export pour utilisation dans le projet)
};
