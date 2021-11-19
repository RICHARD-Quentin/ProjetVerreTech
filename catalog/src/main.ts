import express from 'express';
import cors from 'cors';

//import * as order from './services/orderExceeded.js';

import CatalogRouter from './routes/catalog'

const app = express();

//CORS
const allowedOrigins = ['http://localhost:3002','http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

app.use(express.json())

app.use(CatalogRouter)

app.listen(3002, () => {
    console.log('Server app listening on port ' + 3002);
});
