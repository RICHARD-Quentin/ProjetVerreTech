import express from 'express';
import router from './routes.js';
import * as order from './services/orderExceeded.js';

const app = express();

app.use(express.json())
app.use(router);


app.listen(3000, () => {
    console.log('Server app listening on port ' + 3000);
});
