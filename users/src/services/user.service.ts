import IService from "interfaces/src/IService";
import {CreateOptions, Model, where} from "sequelize";
import {models as db , sequelize} from '../../../common/database'

export default class UserService implements IService {
    public model = db.client

    async create(data?: any): Promise<any> {
        return this.model.create(data)
    }

    async upsert(data: any, includes: any): Promise<void | any[]> {
        //return await this.model.upsert(data.client)
        return await sequelize.transaction().then(async t => {
            return await this.model.upsert(data.client, {transaction: t}).then(async client => {
                const adresses = data.adresses as Array<any>
                const deletedAdresses = data.deletedAdresses as Array<any>
                const id_client = client[0].id_client
                let promises = []

                if (deletedAdresses.length > 0) {
                    deletedAdresses.map(async adresse => {
                        const deleted = await db.adresse.findByPk(adresse.id_adresse)
                        if (deleted) {
                            promises.push(await deleted.destroy())
                        }
                    })
                }

                for (const adresse of adresses) {
                    const payload = {...adresse, id_client}
                    //return await client[0].addAdress(payload, {transaction: t})
                    promises.push(await db.adresse.upsert(payload, {transaction: t}))
                }
                return Promise.all(promises).then(() => t.commit()).catch(() => t.rollback())
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
        return db.adresse.findAll(parameters)
    }

    async findAndCount(parameters?: any): Promise<{ rows: any[]; count: number }> {
        return this.model.findAndCountAll(parameters)
    }

    async findById(id: number): Promise<any> {
        return this.model.findByPk(id);
    }

    async findOne(parameters?: any, include?: any ): Promise<any> {
        return this.model.findOne({where: parameters, include: include});
    }

    async update(id: number, data?: any): Promise<any> {
        return this.model.update(data, {where: {id_client: id}})
    }

    async findFacturationAdresse(id: number): Promise<any> {
        return db.adresse.findAll({where: {
                id_client: id,
                is_facturation: true,
            }})
    }

}