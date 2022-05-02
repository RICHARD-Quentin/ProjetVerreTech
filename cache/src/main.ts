import express from 'express';
import cors from 'cors';

//import * as order from './services/orderExceeded.js';
// import SwaggerRouter from './routes/swagger'

import Routes from './routes'

import { checkJwt } from '../../common/auth/middleware';

const app = express();

//CORS
const allowedOrigins = ['http://localhost:3002','http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
import rateLimit from 'express-rate-limit'
const limiter = rateLimit({
    windowMs: 1*60*1000, // 1 minute
    max: 5
});

app.use(limiter)
app.use(cors(options));

app.use(express.json({limit: '50mb'}))

// app.use(SwaggerRouter)
app.use(Routes)


app.listen(3004, () => {
    console.log('Server app listening on port ' + 3004);
});


export default app //using for unit tests 🧸