"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this shim is required
const routing_controllers_1 = require("routing-controllers");
const user_controller_1 = require("./controllers/user.controller");
// creates express app, registers all controller routes and returns you express app instance
const index = (0, routing_controllers_1.createExpressServer)({
    controllers: [user_controller_1.UserController], // we specify controllers we want to use
});
// run express application on port 3000
index.listen(3000);
//# sourceMappingURL=app.js.map