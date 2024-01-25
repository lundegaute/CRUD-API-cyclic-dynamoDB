var express = require("express");
var router = express.Router();
const CyclicDB = require("@cyclic.sh/dynamodb");
const db = CyclicDB(process.env.CYCLIC_DB);
let users = db.collection("users");

/* GET users listing. */
router.get("/", async function (req, res, next) {
    const list = await users.list();
    res.send(list);
});

router.get("/:key", async function ( req, res, next ) {
  const email = req.params.key;
  const user = await users.get(email)
  res.send(user)
})

router.post("/", async function (req, res, next) {
    const { email, firstName, lastName, age } = req.body;
    await users.set(email, {
        firstName: firstName,
        lastName: lastName,
        age: age,
    });
    res.send("User Created");
});

router.put("/", async function (req, res, next) {
  const { email, firstName, lastName, age } = req.body;
  await users.set(email, {
      name: firstName,
      lastName: lastName,
      age: age,
  });
  res.send(list);
});

router.delete("/", async function (req, res, next ) {
  const {email} = req.body
  await users.delete(email)
  res.send("Delete Successful")
})

module.exports = router;
