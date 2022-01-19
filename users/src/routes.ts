import { userController } from './controllers/user.controller';
import { villeController } from './controllers/villes.controller'
import express from 'express';
// import UserService from "./services/user.service";
// import swaggerUI from 'swagger-ui-express';
// import { swaggerDocument } from './swagger';
import {checkJwt, checkPermissions} from "../../common/auth/middleware";
import {SendResponse} from "../../common/controllers/response";
import {paysController} from "./controllers/pays.controller";

const router = express.Router();

const user = userController
const ville = villeController
const pays = paysController

const baseUrl = '/user'

// router.use(`${baseUrl}/api`, swaggerUI.serve);
// router.get(`${baseUrl}/api`, swaggerUI.setup(swaggerDocument));
router.get(`${baseUrl}/villes`, (req, res) => {ville.search(req, res)});
router.get(`${baseUrl}/pays`, (req, res) => {pays.search(req, res)});
router.get(`${baseUrl}/villes/:id`, (req, res) => {ville.findById(req, res)});
router.get(`${baseUrl}/pays/:id`, (req, res) => {pays.findById(req, res)});

router.use(checkJwt)
router.get(`${baseUrl}`, (req, res) => {user.search(req, res)});
router.post(`${baseUrl}`, (req, res) => {user.upsert(req, res)});

router.get(`${baseUrl}/:id`, (req, res) => {user.findById(req, res)});
router.get(`${baseUrl}/auth/:id`, (req, res) => {user.findByAuthId(req, res)});
router.put(`${baseUrl}/:id`, (req, res) => {user.update(req, res)});

router.get(`${baseUrl}/adresses/facturation/:id`, (req, res) => {user.getFacturationAdresse(req, res)})

router.use(checkPermissions('delete:user'))
router.delete(`${baseUrl}/:id`, (req, res) => {user.delete(req, res)});


// router.use(checkJwt)
// router.get(`${baseUrl}`, (request: any, response: any, next: any) => {
//     SendResponse(user.search, response, request)
// });
// router.post(`${baseUrl}`, (request: any, response: any, next: any) => {
//     SendResponse(user.upsert, response, request, request.body)
// });
//
// router.get(`${baseUrl}/:id`, (request: any, response: any, next: any) => {
//     SendResponse(user.findByAuthId, request, response, request.body)
// })
//
// router.put(`${baseUrl}/:id`, (request: any, response: any, next: any) => {
//     SendResponse(user.update, response, request, request.body)
// });
//
// router.use(checkPermissions('delete:user'))
// router.delete(`${baseUrl}/:id`, (request: any, response: any, next: any) => {
//     SendResponse(user.delete, response, request, request.body)
// });
//
// router.post(`${baseUrl}/adresponsese`, (request: any, response: any, next: any) => {
//     SendResponse(adresse.upsert, response, request, request.body)
// });

export default router;