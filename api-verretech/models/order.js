module.exports = (sequielize,DataTypes) => sequielize.define('order', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "article",
        key: "id"
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shipDate: {
      type: DataTypes.DATE,
      allowNull: true
    },        
    status: {
      type: DataTypes.ENUM('placed','approved','delivered'),
      allowNull: true
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }},
    {
      timestamps: false,
      tableName: "order",
      freezeTableName: false,
    }
);


