const router = require('express').Router()
const Accounts = require("./accounts-model")
const mw = require("./accounts-middleware")

router.get('/', (req, res, next) => {
  try {
    const data = await Accounts.getAll()
    res.status(200).json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Error retrieving the account'})
  }
})

router.get('/:id', (req, res, next) => {
  try {
    const data = await Accounts.getById(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Error retrieving the account'})
  }
})

router.post('/', (req, res, next) => {
  const newAccount = req.body;
  newAccount.name = newAccount.name.trim()

  try {
    const data = await Accounts.create(newAccount)
    res.status(201).json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Error creating the account'})
  }
})

router.put('/:id', (req, res, next) => {
  const newAccount = req.body;
  newAccount.name = newAccount.name.trim()

  try {
    const data = await Accounts.updateById(req.params.id,newAccount)
    res.status(204).json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Error updating the account'})
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const data = await Accounts.deleteById(req.params.id)
    res.status(204).json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Error deleting the account'})
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
