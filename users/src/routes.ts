import { userController } from './controllers/user.controller';
import { adresseController } from './controllers/adresse.controller'
import express from 'express';
// import UserService from "./services/user.service";
// import swaggerUI from 'swagger-ui-express';
// import { swaggerDocument } from './swagger';

const router = express.Router();

const user = userController
const adresse = adresseController

const baseUrl = '/user'

// router.use(`${baseUrl}/api`, swaggerUI.serve);
// router.get(`${baseUrl}/api`, swaggerUI.setup(swaggerDocument));

router.get(`${baseUrl}`, (req, res) => {user.search(req, res)});
router.post(`${baseUrl}`, (req, res) => {user.upsert(req, res)});

router.get(`${baseUrl}/:id`, (req, res) => {user.findByAuthId(req, res)});
router.put(`${baseUrl}/:id`, (req, res) => {user.update(req, res)});
router.delete(`${baseUrl}/:id`, (req, res) => {user.delete(req, res)});

router.post(`${baseUrl}/adresse`, (req, res) => {adresse.upsert(req, res)});

// ...

export default router;