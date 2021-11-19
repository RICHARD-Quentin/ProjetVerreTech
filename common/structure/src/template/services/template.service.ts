import models from "../../../../databaseTs/models";
import {AbstractService} from "../../AbstractService";

export class TemplateService extends AbstractService {
    constructor(protected repository: models.article) {
        super();
        this.repository = repository;
    }
}
