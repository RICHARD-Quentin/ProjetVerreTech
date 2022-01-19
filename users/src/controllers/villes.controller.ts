import {Request, Response} from "express";
import AdresseService from "../services/villes.service";
import IService from "interfaces/src/IService";
import {ICommonDataRes, ICommonResFailed, ICommonResSuccess} from "interfaces/src/IResponse";
import {models as db , sequelize} from '../../../common/database'
import {Error} from "sequelize";
import VillesService from "../services/villes.service";

class VillesController {
    public service: IService = new VillesService

    async search(req: Request, res: Response): Promise<Response>
    {
        const query = req.query
        const limit = parseInt(<string>query.limit) > 0 ? parseInt(<string>query.limit) : 10
        const skip = parseInt(<string>query.skip) > 0 ? parseInt(<string>query.skip) : 0

        const result = await this.service.find({
            limit,
            skip,
            query
        })

        return res.status(200).json({
            data: result,
        } as ICommonDataRes)
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try{
            const id = parseInt(req.params.id)
            const data = await this.service.findById(id)
            return res.status(200).json({
                data
            } as ICommonResSuccess)
        } catch (err: any) {
            return res.status(402).json({
                message: err.name,
                validations: err.errors ,
            } as ICommonResFailed)
        }
    }

    async upsert(req: Request, res: Response): Promise<Response>
    {
        try {
            const body = req.body.client
            const adresses = req.body.adresses

            const includes = [{
                association: db.adresse,
                include: [adresses]
            }]

            const data = await this.service.upsert?.(body, includes)

            return res.status(200).json({
                data
            } as ICommonResSuccess)
        } catch (err: any) {
            return res.status(402).json({
                message: err.name,
                validations: err.errors ,
            } as ICommonResFailed)
        }
    }

    public async update(req: Request, res: Response): Promise<Response>
    {
        try {
            const body = req.body.client
            const id = parseInt(req.params.id)


            const data = await this.service.update(id, body)

            return res.status(200).json({
                data,
            } as ICommonResSuccess)
        } catch (err: any) {
            const validations = err

            return res.status(402).json({
                validations: validations
            } as ICommonResFailed)
        }
    }


    public async delete(req: Request, res: Response): Promise<Response>
    {
        try{
            const id = parseInt(req.params.id)
            const data = await this.service.delete(id)

            return res.status(200).json({
                data
            } as ICommonResSuccess)
        }
        catch (err: any) {
            return res.status(402).json({
                message: err.name,
                validations: err.errors ,
            } as ICommonResFailed)
        }
    }

    // private getValidation(errors: Array<any>): Array<any> {
    //     const validations = errors.map( error => {
    //         const validation = []
    //         const key = error.path
    //         const message = error.message
    //
    //         validation[key] = message
    //
    //         return { ...validation }
    //     })
    //     return validations
    // }

}

export const villeController = new VillesController()

