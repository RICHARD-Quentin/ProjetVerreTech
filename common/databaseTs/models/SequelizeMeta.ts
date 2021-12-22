import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SequelizeMetaAttributes {
  name: string;
}

export type SequelizeMetaPk = "name";
export type SequelizeMetaId = SequelizeMeta[SequelizeMetaPk];
export type SequelizeMetaOptionalAttributes = "name";
export type SequelizeMetaCreationAttributes = Optional<SequelizeMetaAttributes, SequelizeMetaOptionalAttributes>;

export class SequelizeMeta extends Model<SequelizeMetaAttributes, SequelizeMetaCreationAttributes> implements SequelizeMetaAttributes {
  name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof SequelizeMeta {
    SequelizeMeta.init({
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'SequelizeMeta',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  return SequelizeMeta;
  }
}
