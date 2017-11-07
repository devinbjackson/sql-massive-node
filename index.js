const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const massive = require('massive');
const products_controller = require('./db/products_controller');


const port = process.env.PORT || 3000;

const app = express();

app.use( bodyParser.json() );
app.use( cors() );

app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}.`);
});

massive( process.env.CONNECTION_STRING ).then( dbInstance => {
   return app.set('db', dbInstance);
})


app.get('/api/products', products_controller.getAll);
app.get('/api/product/:id', products_controller.getOne);
app.put('/api/product/:id', products_controller.update);
app.delete('/api/product/:id', products_controller.delete);
app.post('/api/product', products_controller.create);