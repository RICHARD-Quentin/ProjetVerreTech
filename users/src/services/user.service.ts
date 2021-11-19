import IService from "interfaces/src/IService";
import {CreateOptions, Model, where} from "sequelize";
import {models as db , sequelize} from '../../../common/database'

export default class UserService implements IService {
    public model = db.client

    async create(data?: any): Promise<any> {
        return this.model.create(data)
    }

    async upsert(data: any, includes: { include: any[]; association: any }[]): Promise<any> {

        return await sequelize.transaction().then(async t => {
            return await this.model.upsert(data.userData.client, {transaction: t}).then(async res => {
                const adresses = data.userData.adresses as Array<any>
                const id_client = res[0].id_client
                return adresses.forEach(async adresse => {
                    await db.adresse.create({...adresse, id_client}, {transaction: t})
                });
            }).then(() => {
                return t.commit()
            }).catch(err => {
                console.log(err)
                return t.rollback()
            })
        })
    }

    async delete(id: number): Promise<number> {
        return this.model.destroy({where: {id_client: id}})
    }

    async find(parameters?: any): Promise<any[]> {
        return Promise.resolve([]);
    }

    async findAndCount(parameters?: any): Promise<{ rows: any[]; count: number }> {
        return this.model.findAndCountAll(parameters)
    }

    async findById(id: number): Promise<any> {
        return this.model.findByPk(id);
    }

    async findOne(parameters?: any): Promise<any> {
        return this.model.findOne(parameters);
    }

    async update(id: number, data?: any): Promise<any> {
        return this.model.update(data, {where: {id_client: id}})
    }

}