const Accounts = require("./accounts-model")


exports.checkAccountPayload = (req, res, next) => {
  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: "name and budget are required" })
  } else if (typeof req.body.name !== "string") {
    res.status(400).json({ message: "name of account must be a string" })
  } else if (res.body.name.trim().length < 3 || res.body.name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof req.body.budget !== "int") {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  const { name } = req.body;
  Accounts.getByName(name)
    .then(account => {
      if (account) {
        res.status(400).json({ message: "that name is taken" })
      } else {
        next()
      }
    })
}

exports.checkAccountId = (req, res, next) => {
  const { id } = req.params
  Accounts.getById(id)
    .then(account => {
      if (!account) {
        res.status(404).json({ message: "account not found" })
      } else {
        next()
      }
    })
}

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
}