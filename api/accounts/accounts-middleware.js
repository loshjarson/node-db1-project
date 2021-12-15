const Accounts = require("./accounts-model")


async function checkAccountPayload(req, res, next) {
  const {name, budget} = req.body
  console.log(typeof budget)
  if (name == undefined || budget == undefined) {
    res.status(400).json({ message: "name and budget are required" })
  } else if (typeof budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (typeof name !== "string") {
    res.status(400).json({ message: "name of account must be a string" })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    next()
  }
}

async function checkAccountNameUnique(req, res, next) {
  const { name } = req.body;
  try {
    const data = await Accounts.getByName(name)
    if (data) {
      res.status(400).json({ message: "that name is taken" })
    } else {
      next()
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Error retrieving the account'})
  }
}

async function checkAccountId(req, res, next) {
  const { id } = req.params
  try {
    const data = await Accounts.getById(id)
    if (!data) {
      res.status(404).json({ message: "account not found" })
    } else {
      next()
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'Error retrieving the account',
    })
  }
}

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
}