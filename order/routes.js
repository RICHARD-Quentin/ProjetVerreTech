import * as order from './controllers/order.js';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { swaggerDocument } from './swagger/swaggerDocument.js';

const router = express.Router();

router.use("/api",swaggerUI.serve,swaggerUI.setup(swaggerDocument));

router.route('/order').post(order.createOrder);
router.route('/order/:id').get(order.getOrdersOfClient);
// ...

export default router;