import * as order from './controllers/order.js';
import express from 'express';

const router = express.Router();

router.route('/order').post(order.createOrder);
router.route('/order/:id').get(order.getOrdersOfClient);
// ...

export default router;