import express from 'express';
import models, {models as db , sequelize} from '../../common/database'
import cors from 'cors';
import StockRouter from './routes/stocks'
import OrdersRouter from './routes/orders';
import SwaggerRouter from './routes/swagger';
import { checkJwt } from '../../common/auth/middleware';

const app = express();

//CORS
const allowedOrigins = ['http://localhost:3001','http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

app.use(express.json())

app.use(SwaggerRouter)
app.use(checkJwt)

app.use(StockRouter,checkJwt.unless({ path: ['stock/shop/:id', '/stock/:shop'], method: "GET"}))
app.use(OrdersRouter,checkJwt)

app.listen(3001, () => {
    console.log('started');
  });

export default app 