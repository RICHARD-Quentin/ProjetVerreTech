const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const userRoute = require('./routes/Auth');

app.use( '/auth', userRoute)

// app.get('/',(req, res) => {
//     res.set('Content-Type', 'text/html');
//     res.send('Auth');
// })

app.listen(3000, () => {
    console.log('Server app listening on port ' + port);
});
