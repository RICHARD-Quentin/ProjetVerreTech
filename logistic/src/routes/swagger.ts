import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../utils/swagger/swagger.json';

const router = express.Router();

router.use("/doc",swaggerUI.serve,swaggerUI.setup(swaggerDoc));

export default router