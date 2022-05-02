// this shim is required
import { createExpressServer } from 'routing-controllers';
import router from "./routes";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

const index = express()
const allowedOrigins =['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
var RateLimit = require('express-rate-limit');
var limiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 5
});

index.use(limiter)
index.use(cors(options));


index.use(bodyParser.json())

// creates express index, registers all controllers routes and returns you express index instance
index.use(router)

// run express application on port 3000
index.listen(3003, () => console.log('Le serveur ecoute le port ' + 3003));