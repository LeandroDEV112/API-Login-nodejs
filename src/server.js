const express = require('express');
const app = express();

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

const cors = require('cors');
app.use(cors());

// Database

require('./app/model/User');
require('./config/database')
    .authenticate()
    .then( () => { console.log('connection database') })
    .catch( e => { console.log(e) });

// Routes

app.use('/api', require('./app/routes/index'));
app.listen(8080, () => { console.log('API online') });