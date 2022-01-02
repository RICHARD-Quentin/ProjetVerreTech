import IService from "interfaces/src/IService";
import {CreateOptions, Model, Op, where} from "sequelize";
import {models as db , sequelize} from '../../../common/database'

export default class PaysService implements IService {
    public model = db.pays

    async create(data?: any): Promise<any> {
        return this.model.create(data)
    }

    async upsert(data: any, includes: any): Promise<void | any[]> {
        return this.model.upsert(data)
    }

    async delete(id: number): Promise<any> {
        return Promise.resolve([]);
    }

    async find(parameters?: any): Promise<any[]> {
        // @ts-ignore
        if (typeof parameters.query.search != "undefined") {
            return this.model.findAll({

                where:{
                    // @ts-ignore
                    pays: {[Op.like]: '%' + parameters.query.search + '%'},
                }
            });
        } else {
            return this.model.findAll();
        }

    }

    async findAndCount(parameters?: any): Promise<{ rows: any[]; count: number }> {
        return this.model.findAndCountAll(parameters)
    }

    async findById(id: number): Promise<any> {
        return this.model.findByPk(id);
    }

    async findOne(parameters?: any, include?: any): Promise<any> {
        return this.model.findOne({where: parameters, include: include});
    }

    async update(id: number, data?: any): Promise<any> {
        return Promise.resolve([]);
    }

}