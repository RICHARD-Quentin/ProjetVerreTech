// this shim is required
import { createExpressServer } from 'routing-controllers';
import router from "./routes";
import express from "express";
import bodyParser from "body-parser";

const index = express()

index.use(bodyParser.json())

// creates express index, registers all controller routes and returns you express index instance
index.use(router)

// run express application on port 3000
index.listen(3001, () => console.log('Le serveur ecoute le port ' + 3001));