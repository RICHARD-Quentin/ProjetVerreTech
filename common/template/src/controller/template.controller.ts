// lib/controllers/nodes.controllers.ts
import {Request, Response} from "express";
import {TemplateService} from "../services/template.service";
import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Res,
    HttpCode,
    QueryParam,
    JsonController
} from 'routing-controllers';
import {Model} from "sequelize";
import {ICommonDataRes, ICommonDataTotalRes} from "../../../interfaces/src/IResponse";


@JsonController('/template')
export class TemplateController {
    constructor(protected service: TemplateService) {
    }

    @Get()
    async findAndCount(@QueryParam('') query: any, @Res() res: Response): Promise<Response> {
        const [data, total] = await this.service.findAndCount()
        return res.status(200).json({
            data,
            total
        } as ICommonDataTotalRes)
    }

    @Get('/:id')
    async findById(@Param('id') id: number, @Res() res: Response): Promise<Response> {
        const data = await this.service.findById(id)
        return res.status(200).json({
            data,
        } as ICommonDataRes)
    }

    create(res, query): Promise<Response> {
        return Promise.resolve(undefined);
    }

    delete(res, query): Promise<[]> {
        return Promise.resolve([]);
    }

    update(res, query): Promise<[]> {
        return Promise.resolve([]);
    }
}
