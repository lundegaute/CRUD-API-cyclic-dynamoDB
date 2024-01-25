var express = require('express');
var router = express.Router();
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let users = db.collection('users')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const list = await users.list()
  res.send(list);
});

module.exports = router;
