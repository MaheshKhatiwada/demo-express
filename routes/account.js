const express = require("express");
const { Account, validate } = require("../models/accounts");
const router = express.Router();

router.get("/", async (req, res) => {
  const account = await Account.find();
  res.send(account);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let account = new Account({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
  });
  account = await account.save();
  res.send(account);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const account = await Account.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
    },
    { new: true }
  )
    .then((account) => res.send(account))
    .catch((err) =>
      res.status(400).send("The account with given id is not found")
    );
});
router.delete("/:id", async (req, res) => {
  const account = await Account.findByIdAndDelete(req.params.id)
    .catch((err) =>
    res.status(404).send("The account with given id is not found")
  );

  //if (!account)
  //return res.status(404).send("The account with given id is not found");

  res.send(account);
});

module.exports = router;
