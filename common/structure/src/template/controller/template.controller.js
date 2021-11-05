"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = require("../../AbstractController");
class TemplateController extends AbstractController_1.AbstractController {
    constructor(service) {
        super();
        this.service = service;
    }
}
exports.TemplateController = TemplateController;
