import {Request, Response} from "express";
import UserService from "../services/user.service";
import IService from "interfaces/src/IService";
import {ICommonDataRes, ICommonResFailed, ICommonResSuccess} from "interfaces/src/IResponse";
import {models as db , sequelize} from '../../../common/database'
import {Error} from "sequelize";

class UserController {
    public service: IService = new UserService

    async search(req: Request, res: Response): Promise<Response>
    {
        const query = req.query
        const limit = parseInt(<string>query.limit) > 0 ? parseInt(<string>query.limit) : 10
        const skip = parseInt(<string>query.skip) > 0 ? parseInt(<string>query.skip) : 0

        const result = await this.service.findAndCount({
            limit,
            skip,
            query
        })

        return res.status(200).json({
            data: result.rows,
            total: result.count
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
                validations: this.getValidation(err.errors) ,
            } as ICommonResFailed)
        }
    }

    async findByAuthId(req: Request, res: Response): Promise<Response> {
        try{
            const include = db.adresse

            const client = await this.service.findOne({authId: req.params.id})
            const adresses = await client.getAdresses()
            return res.status(200).json({
                client,
                adresses
            })
        } catch (err: any) {
            return res.status(402).json({
                message: err.name,
                validations: err.message,
            } as ICommonResFailed)
        }
    }

    async upsert(req: Request, res: Response): Promise<Response>
    {
        try {
            const body = req.body.client
            const adresses = req.body.adresses

            const includes = {
                include: db.adresse
            }

            const data = await this.service.upsert?.(req.body, includes)

            return res.status(200).json({
                data
            } as ICommonResSuccess)
        } catch (err: any) {
            return res.status(402).json({
                message: err.name,
                validations: err.message,
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
                validations: err.errors,
            } as ICommonResFailed)
        }
    }

    private getValidation(errors: Array<any>): Array<any> {
        const validations = errors.map( error => {
            const validation = []
            const key = error.path
            const message = error.message

            validation[key] = message

            return { ...validation }
        })
        return validations
    }

}

export const userController = new UserController()

