import IService from "interfaces/src/IService";
import {CreateOptions, Model, where} from "sequelize";
import {models as db , sequelize} from '../../../common/database'

export default class UserService implements IService {
    public model = db.client

    async create(data?: any): Promise<any> {
        return this.model.create(data)
    }

    async upsert(data: any, includes: { include: any[]; association: any }[]): Promise<any[]> {
        return this.model.upsert(data)
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