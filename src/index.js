const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost/mevnDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(db => console.log('la base de datos esta conectada'))
    .catch(err => console.error(err))

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

//routes
app.use('/api/tasks', require('./routes/tasks'))

//static files
app.use(express.static(__dirname + '/public'));

//escucha
app.listen(app.get('port'), () => console.log('escuchando en el puerto', app.get('port')));