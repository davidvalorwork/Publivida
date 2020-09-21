const crud = require('../controllers/default/crud.controller');
const route = `/productos`;
const reporte = require('../controllers/reportes/top-productos')
const {upload} = require('../controllers/productos/upload');

module.exports = (app,db,multer) => {
    app.get(`${route}/top`,(req,res)=>reporte(db,req,res));
    app.get(`${route}/:id`,(req,res)=>crud.find(db.productos,req,res));
    app.get(`${route}`,(req,res)=>crud.findAll(db.productos,req,res));
    app.post(`${route}/condicion`,(req,res)=>crud
        .findByCondition(db.productos,req.body.condicion,res));
    app.post(`${route}`,(req,res)=>crud.create(db.productos,req,res));
    app.post(`${route}/:id`,(req,res)=>crud.update(db.productos,req,res));
    app.post(`${route}/upload/product-img`,
        multer.single("file"),(req,res)=>upload(req,res));
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.productos,req,res));
}