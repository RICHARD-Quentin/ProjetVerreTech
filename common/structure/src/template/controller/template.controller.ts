// lib/controllers/nodes.controllers.ts
import {Request, Response} from "express";
import {AbstractController} from "../../AbstractController";
import {TemplateService} from "../services/template.service";

export class TemplateController extends AbstractController {
    constructor(protected service: any) {
        super();
    }
}
