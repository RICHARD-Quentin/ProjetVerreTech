import express from 'express';
import  Erp from 'erp-verretech'
import http from 'http';

const app = express();

//Test du module erp-verretch
let erp = await new Erp("paps","verretech");
const inventory = await erp.store.GetInventory()

console.log(inventory);

const server = http.createServer(app);
server.listen(3001);