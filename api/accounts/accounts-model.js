const db = require("../../data/db-config")

const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return await db("accounts").where("id",id).first()
}

const create = account => {
  const [ id ] = await db("accounts").insert(account);
  return getById(id)
}

const updateById = (id, account) => {
  await db("accounts").where("id",id).update(account);
  console.log(getById(id));
  return getById(id)
}

const deleteById = id => {
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
