const router = require('express').Router()
const Accounts = require("./accounts-model")
const mw = require("./accounts-middleware")

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
          message: 'Error retrieving the actions',
      })
    })
})

router.get('/:id',mw.checkAccountId, (req, res, next) => {
})

router.post('/',mw.checkAccountPayload, mw.checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id',mw.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id',mw.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
