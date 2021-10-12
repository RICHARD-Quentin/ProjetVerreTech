"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractService_1 = require("../../AbstractService");
class TemplateService extends AbstractService_1.AbstractService {
    constructor(repository) {
        super();
        this.repository = repository;
    }
}
exports.TemplateService = TemplateService;
