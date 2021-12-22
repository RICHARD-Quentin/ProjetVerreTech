import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boutique, boutiqueId } from './boutique';
import type { client, clientId } from './client';
import type { contenu, contenuId } from './contenu';
import type { facture, factureId } from './facture';

export interface commandeAttributes {
  n_commande: number;
  id_boutique: number;
  id_client: number;
  montant: number;
  date_commande: Date;
  date_retrait: Date;
  statut: 'Ready' | 'Preperation' | 'BackInStock' | 'TookOf' | 'Cancelled';
  payment: 'Website' | 'Shop';
}

export type commandePk = "n_commande";
export type commandeId = commande[commandePk];
export type commandeCreationAttributes = Optional<commandeAttributes, commandePk>;

export class commande extends Model<commandeAttributes, commandeCreationAttributes> implements commandeAttributes {
  n_commande!: number;
  id_boutique!: number;
  id_client!: number;
  montant!: number;
  date_commande!: Date;
  date_retrait!: Date;
  statut!: 'Ready' | 'Preperation' | 'BackInStock' | 'TookOf' | 'Cancelled';
  payment!: 'Website' | 'Shop';

  // commande belongsTo boutique via id_boutique
  id_boutique_boutique!: boutique;
  getId_boutique_boutique!: Sequelize.BelongsToGetAssociationMixin<boutique>;
  setId_boutique_boutique!: Sequelize.BelongsToSetAssociationMixin<boutique, boutiqueId>;
  createId_boutique_boutique!: Sequelize.BelongsToCreateAssociationMixin<boutique>;
  // commande belongsTo client via id_client
  id_client_client!: client;
  getId_client_client!: Sequelize.BelongsToGetAssociationMixin<client>;
  setId_client_client!: Sequelize.BelongsToSetAssociationMixin<client, clientId>;
  createId_client_client!: Sequelize.BelongsToCreateAssociationMixin<client>;
  // commande hasMany contenu via n_commande
  contenus!: contenu[];
  getContenus!: Sequelize.HasManyGetAssociationsMixin<contenu>;
  setContenus!: Sequelize.HasManySetAssociationsMixin<contenu, contenuId>;
  addContenu!: Sequelize.HasManyAddAssociationMixin<contenu, contenuId>;
  addContenus!: Sequelize.HasManyAddAssociationsMixin<contenu, contenuId>;
  createContenu!: Sequelize.HasManyCreateAssociationMixin<contenu>;
  removeContenu!: Sequelize.HasManyRemoveAssociationMixin<contenu, contenuId>;
  removeContenus!: Sequelize.HasManyRemoveAssociationsMixin<contenu, contenuId>;
  hasContenu!: Sequelize.HasManyHasAssociationMixin<contenu, contenuId>;
  hasContenus!: Sequelize.HasManyHasAssociationsMixin<contenu, contenuId>;
  countContenus!: Sequelize.HasManyCountAssociationsMixin;
  // commande hasMany facture via n_commande
  factures!: facture[];
  getFactures!: Sequelize.HasManyGetAssociationsMixin<facture>;
  setFactures!: Sequelize.HasManySetAssociationsMixin<facture, factureId>;
  addFacture!: Sequelize.HasManyAddAssociationMixin<facture, factureId>;
  addFactures!: Sequelize.HasManyAddAssociationsMixin<facture, factureId>;
  createFacture!: Sequelize.HasManyCreateAssociationMixin<facture>;
  removeFacture!: Sequelize.HasManyRemoveAssociationMixin<facture, factureId>;
  removeFactures!: Sequelize.HasManyRemoveAssociationsMixin<facture, factureId>;
  hasFacture!: Sequelize.HasManyHasAssociationMixin<facture, factureId>;
  hasFactures!: Sequelize.HasManyHasAssociationsMixin<facture, factureId>;
  countFactures!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof commande {
    commande.init({
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
  return commande;
  }
}
