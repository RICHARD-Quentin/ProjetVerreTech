import {Request, Response} from "express";
import {AbstractService} from "./AbstractService";
import IAbstractService from "./IAbstractService";
import {ICommonDataTotalRes} from "./IResponse";

export abstract class AbstractController {
    protected abstract service: AbstractService & IAbstractService;

    public async findAndCount(req: Request, res: Response) {
        const params = req.body;
        try {
            const [data, total] = await this.service.findAndCount(params)

            return res.status(200)
                .json({
                    data,
                    total
                } as ICommonDataTotalRes);
        }catch (e) {
            console.log(e)
        }
    }
}
