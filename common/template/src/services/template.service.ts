import db from "../../../databaseTs/models";
import {FindAndCountOptions, FindOptions, InstanceDestroyOptions, Model} from "sequelize";
//import IService from "../../interfaces/IService";

export class TemplateService {
    constructor(public repository: any) {
        this.repository = db.models.article;
    }

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
        const [total, data] = await this.repository.findAndCountAll(parameters);
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
