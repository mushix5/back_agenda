const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var routes = require('./routes');
const { config } = require('./config/index');
var cors = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Agenda'));

app.use('/agenda', routes);

app.listen(config.port, function() {
  console.log(`http://localhost: ${config.port}`);
});