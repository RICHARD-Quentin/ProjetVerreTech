const express = require('express')
const router = express.Router

function AbstractRouter(controller) {
    this._controller = controller
}

AbstractRouter.prototype.routes = function () {
    
}