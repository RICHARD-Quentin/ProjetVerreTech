const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require('./routes/routes-erp');
const auth = require('./middleware/auth')
const cors = require("cors");
require("dotenv").config();



//app.use(require('./middleware/auth'),'/api/v1', require('./routes/verretech-api.js'));
app.get('/',function(req,res)
{
  res.redirect('/api/v1/')
})

app.use('/api/v1/', routes);

require("./config/db.js");
const port = 3000


app.listen(port, () => {
  console.log(`API-VerreTech listening at http://localhost:${port}`)
})


