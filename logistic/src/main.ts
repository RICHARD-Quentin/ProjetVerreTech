import express from 'express';
import router from './routes';
import cors from 'cors';
//import * as order from './services/orderExceeded.js';

const app = express();

//CORS
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));


app.use(express.json())



app.use(router);
//app.use("/api",swaggerUI.serve,swaggerUI.setup(swaggerDocument))

app.listen(3001, () => {
    console.log('Server app listening on port ' + 3001);
});
