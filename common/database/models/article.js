const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    code_article: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    intitule_article: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dimension_1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dimension_2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dimension_3: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    couleur: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    prix_achat: {
      type: DataTypes.DECIMAL(6,0),
      allowNull: false
    },
    commandable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    note_moyenne: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'article',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code_article" },
        ]
      },
    ]
  });
};
