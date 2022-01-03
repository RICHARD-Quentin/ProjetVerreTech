// this shim is required
import { createExpressServer } from 'routing-controllers';
import { TemplateController } from './src/controller/template.controller';

// creates express app, registers all controllers routes and returns you express app instance
const app = createExpressServer({
    controllers: [TemplateController], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(3000);