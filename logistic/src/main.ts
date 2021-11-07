import express from 'express';

import cors from 'cors';
//import * as order from './services/orderExceeded.js';

import StockRouter from './routes/stocks'
import OrdersRouter from './routes/orders';
import SwaggerRouter from './routes/swagger';

const app = express();

//CORS
const allowedOrigins = ['http://localhost:3001'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

app.use(express.json())

app.use(StockRouter)
app.use(OrdersRouter)

app.use(SwaggerRouter)

app.listen(3001, () => {
    console.log('Server app listening on port ' + 3001);
});
