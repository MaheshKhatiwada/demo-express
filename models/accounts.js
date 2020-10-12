const mongoose = require("mongoose");
const Joi = require("joi");

const accountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  age: {
    type: Number,
    require: true,
    $gte: 15,
  },
});

const Account = mongoose.model("Account", accountSchema);

function validateAccount(account) {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    age: Joi.number().required(),
  });

  return schema.validate(account);
}

module.exports.Account = Account;
module.exports.validate = validateAccount;
