import {InstanceDestroyOptions, Model, ModelAttributes} from "sequelize";

export default interface IService {
    find(parameters?: any): Promise<any[]>;

    findAndCount(parameters?: any): Promise<any[]>;

    findOne(parameters?: any): Promise<any[]>;

    findById(id: number): Promise<any[] | null>;

    create(data?: any): Promise<any[]>;

    update(id: number, data?: any): Promise<Model>;

    delete(id: InstanceDestroyOptions): void;
}
