const db = require('../common/database')
const Client = db.client

module.exports = {
    getAllClients: (req, res, next) => {
        return Client.findAll();
    }
}