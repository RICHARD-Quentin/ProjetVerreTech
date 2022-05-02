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
import rateLimit from 'express-rate-limit'
const limiter = rateLimit({
    windowMs: 5*60*1000, // 1 minute
    max: 5
});

app.use(limiter)

app.use(cors(options));

app.use(express.json())

app.use(SwaggerRouter)
app.use(checkJwt)

app.use(StockRouter,checkJwt.unless({ path: ['stock/shop/:id', '/stock/:shop'], method: "GET"}))
app.use(OrdersRouter,checkJwt)

app.listen(3001, () => {
    console.log('Listening on port 3001');
  });

export default app 