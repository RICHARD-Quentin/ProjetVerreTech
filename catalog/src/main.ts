import express from 'express';
import cors from 'cors';

//import * as order from './services/orderExceeded.js';
import SwaggerRouter from './routes/swagger'
import ArticleRouter from './routes/article'
import ShopRouter from './routes/shop'
import CommentRouter from './routes/comment'

import { checkJwt } from '../../common/auth/middleware';

const app = express();

//CORS
const allowedOrigins = ['http://localhost:3002','http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
import rateLimit from 'express-rate-limit'
const limiter = rateLimit({
    windowMs: 60*1000, // 1 minute
    max: 35
})

app.use(limiter)
app.use(cors(options));

app.use(express.json({limit: '50mb'}))

app.use(SwaggerRouter)
app.use(ArticleRouter,checkJwt.unless({ path: ['/article', '/article/:id'], method: "GET"}))
app.use(ShopRouter,checkJwt.unless({ path: ['/shop/:id', '/shop'],  method: "GET"}))
app.use(CommentRouter,checkJwt.unless({ path: ['/comment', '/comment/:id'], method: "GET"}))

app.listen(3002, () => {
    console.log('Server app listening on port ' + 3002);
});


export default app //using for unit tests 🧸