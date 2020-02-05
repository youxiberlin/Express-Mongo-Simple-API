const MongoClient = require('mongodb').MongoClient;
const { dbName, dbCollection, dbUrl } = require('./config');
const assert = require('assert');
const util = require('util');

const client = new MongoClient(dbUrl, {
	useUnifiedTopology: true,
});

let collection;

const connect = () => {
	client.connect(function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to monogoDB server");
		db = client.db(dbName);
		collection = db.collection(dbCollection);
	});
}

const insert = docs =>
	collection.insert(docs)
		.then(res => console.log(`Inserted ${util.inspect(res.ops)}`))

const insertOne = data =>
	collection.insertOne(data)
		.then(res => console.log(`Inserted ${util.inspect(res.ops)}`))

const findOne = data => collection.findOne(data);

module.exports = {
	connect,
	insert,
	insertOne,
	findOne
};