import {Response} from "express";
import {Model, QueryOptions} from "sequelize";
import {Controller, Param, Body, Get, Post, Put, Delete, Req, Res, HttpCode} from 'routing-controllers';

export interface IController {
    search(): Promise<Response>

    create(): Promise<Response>

    update(): Promise<Model[]>

    delete(): Promise<Model[]>
}