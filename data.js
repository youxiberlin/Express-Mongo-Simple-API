const express = require('express');
const mongoClient = require('./mongoClient');
const util = require('util');

const router = express.Router();
const makeRandomStr = () => Math.random().toString(36).substring(2);

router.get('/', (req, res) => res.send(`Date requested on: ${req.requestTime}`));

router.get('/:id', async (req, res) => {
	const dataInDb = await mongoClient.findOne({ id: req.params.id })
	if (!dataInDb) {
		const newData = {
			id: req.params.id,
			text: makeRandomStr(),
		}
		await mongoClient.insertOne(newData);
		return res.send('inserted');
	}
	res.send(dataInDb)
});

router.post('', async (req, res) => {
	await mongoClient.insertOne(req.body)
	res.send('posted')
})

module.exports = router;