"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_controller_1 = require("./controller/template.controller");
const template_service_1 = require("./services/template.service");
class Routes {
    constructor() {
        this.templateController = new template_controller_1.TemplateController(template_service_1.TemplateService);
    }
    routes(app) {
        app.route("/").get(this.templateController.findAndCount);
    }
}
exports.Routes = Routes;
