const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)
app.use(cors());
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({entended:false}))
app.use(express.json());

//Routes
app.use(require('./routes/default'));//default
app.use('/api/spaces', require('./routes/spaces'));//Espacios
app.use('/api/reservations', require('./routes/reservations'));//Reservaciones

//Start
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});