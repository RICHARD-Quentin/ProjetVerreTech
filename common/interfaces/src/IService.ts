import {CreateOptions, InstanceDestroyOptions, Model, ModelAttributes} from "sequelize";

export default interface IService {
    find(parameters?: any): Promise<any[]>;

    findAndCount(parameters?: any): Promise<{ rows: any[]; count: number }>;

    findOne(parameters?: any): Promise<any[]>;

    findById(id: number): Promise<undefined>;

    create(data?: any): Promise<Model>;

    update(id: number, data?: any): Promise<Model>;

    delete(id: number): void;

    upsert(data: any, includes: { include: any[]; association: any }[]): Promise<any[]>
}
