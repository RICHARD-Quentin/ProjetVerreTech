import * as order from './controllers/order';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { checkSchema } from 'express-validator';
import {OrderSchema} from './models/order'

//import { swaggerDocument } from './swagger/swaggerDocument.js';

const router = express.Router();

//router.use("/api",swaggerUI.serve,swaggerUI.setup(swaggerDocument));

router.route('/order').post(checkSchema(OrderSchema),order.createOrder);
router.route('/order/{id}').get(order.getOrder);
router.route('/order').get(order.getOrders);
//router.route('/order/:id').get(order.getOrdersOfClient);
// ...

export default router;