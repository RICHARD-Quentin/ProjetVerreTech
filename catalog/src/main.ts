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
app.use(cors(options));

app.use(express.json())

app.use(SwaggerRouter)
app.use(checkJwt)

app.use(ArticleRouter)
app.use(ShopRouter)
app.use(CommentRouter)


app.listen(3002, () => {
    console.log('Server app listening on port ' + 3002);
});


export default app //using for unit tests 🧸