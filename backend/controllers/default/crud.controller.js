const messages = require('./messages.controller');
module.exports = {
  findAll: (table, req, res) => {
    table.findAll({where:{borrado:0}})
      .then((result) => messages.success(result, res))
      .catch((error) => messages.error(error, res))
  },
  find: (table, req, res) => {
    table.findByPk(`${req.params.id}`)
      .then((result) => messages.success(result, res))
      .catch((error) => messages.error(error, res))
  },
  findByCondition: (table,condition,res)=>{
    console.log(condition)
    table.findAll(condition)
      .then(result=>{console.log(result);messages.success(result,res)})
      .catch(err=>messages.error(err,res))
  },
  create: (table, req, res) => {
    table.create(req.body)
      .then((result) => messages.success(result, res))
      .catch((error) => messages.error(error, res))
  },
  update: (table, req, res) => {
    console.log(req.body)
    let id = {}
    id[req.body.nombre_id] = req.params.id
    table.update(req.body,
      {
        where: id
      }).then((result) => messages.success(result, res))
      .catch((error) => messages.error(error, res))
  },
  delete: (table, req, res) => {
    console.log(req.params);
    let condition = {}
    condition[`id_${table.name}`] =req.params.id
    console.log(condition)
    table.update({borrado:1},
    {
      where: condition
    })
      .then((result) => messages.success(result, res))
      .catch((error) => messages.error(error, res))
  }
}