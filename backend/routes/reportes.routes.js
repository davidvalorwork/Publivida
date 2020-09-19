const dashboard = require('../controllers/reportes/dashboard-admin')
const route = "/reportes"
module.exports = (app,db) => {
    app.get(`${route}`,(req,res)=>dashboard(db,req,res));
}