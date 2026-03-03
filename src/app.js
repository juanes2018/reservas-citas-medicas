require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const app = express();

const LogerMiddleware = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');




const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(LogerMiddleware);
app.use(errorHandler);
app.use('/api', routes);




app.get('/', (req, res) => {
  res.send(`
    <h1>Reservas de Citas Médicas</h1>
    <p>Esto es una aplicación Node.js con Express.js</p>
    <p>Corre en el puerto ${PORT}</p>
  `);
});

app.get('/error', (req, res, next) => {
  next(new Error("Error intencional"));
});




module.exports = app;   




