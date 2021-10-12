import {FindAndCountOptions, FindOptions, InstanceDestroyOptions} from "sequelize";
import { Model, Sequelize } from "sequelize";
import IAbstractService from "./IAbstractService";
import db from "../../databaseTs";

export abstract class AbstractService implements IAbstractService {
    protected abstract repository: any;

    public async create(data?: any): Promise<Model[]> {
        return await this.repository.create(data);
    }

    public async delete(id: InstanceDestroyOptions): Promise<void> {
        return await this.repository.destroy(id);
    }

    public async find(parameters?: FindOptions): Promise<[Model[], number]> {
        const [total, data] = await this.repository.findAll(parameters);
        return [total, data];
    }

    public async findAndCount(parameters?: FindAndCountOptions): Promise<[Model[], number]> {
        let total: any;
        let data: any;
        [total, data] = await this.repository.findAndCountAll(parameters);
        return [total, data];
    }

    public async findById(id: number): Promise<any[]> {
        return await this.repository.findOne({
            where: {
                id: id
            }
        });
    }

    public async findOne(parameters?: any): Promise<Model[]> {
        return await this.repository.findOne(parameters);
    }

    public async update(id: number, data?: Model): Promise<Model> {
        return await this.repository.update(data, {
            where: {
                id: id
            }
        });
    }
}
