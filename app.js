const express = require('express');
const routes = require('./routes');
const mongoClient = require('./mongoClient');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());

// sample middleware functions 
const requestTime = (req, res, next) => {
	req.requestTime = Date.now()
	next()
}

app.use(requestTime);
app.use('/data', routes.data);
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
	mongoClient.connect();
});