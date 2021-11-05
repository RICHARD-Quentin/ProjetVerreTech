// lib/config/routes.ts
import {Request, Response} from "express";
import {TemplateController} from "./controller/template.controller";
import {TemplateService} from "./services/template.service";

export class Routes {
    public templateController: TemplateController = new TemplateController(TemplateService);

    public routes(app: any): void {
        app.route("/").get(this.templateController.findAndCount);
    }
}
