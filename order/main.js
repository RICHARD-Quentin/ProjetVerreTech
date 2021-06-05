const express = require('express');
const app = express();

app.get('/',(req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Commande');
})

app.listen(3000, () => {
    console.log('Server app listening on port ' + 3000);
});
