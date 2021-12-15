const db = require("../../data/db-config")

async function getAll() {
  return db("accounts")
}

async function getById(id) {
  return await db("accounts").where("id",id).first()
}

async function create(account) {
  const [ id ] = await db("accounts").insert(account)
  return getById(id)
}

async function updateById(id, account) {
  await db("accounts").where("id",id).update(account)
  return getById(id)
}

async function deleteById(id) {
  const deleted = await getById(id)
  await db("accounts").where("id",id).delete()
  return deleted
}

async function getByName(name) {
  return db("accounts").where("name",name).first()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
}
