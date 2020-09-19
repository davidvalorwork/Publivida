
const express = require("express"),
      jwt = require('jsonwebtoken'),
      config = require('./config/config'),
      db = require("./models"),
      api = require('./routes/index.routes'),
      init = require("./controllers/default/init.controller"),
      app = express(),
      jwtMiddleware = require("./middlewares/jwt"),
      cors = require('cors');

const http = require("http");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const upload = multer({
  dest: "./uploads"
});
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.set('llave', config.llave);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("app/public"));

const protegerRutas = jwtMiddleware.protegerRutas(app,express,jwt);
api(app,db,protegerRutas,upload);

db.sequelize.sync().then(() => {
  app.listen(3002,() => console.log("¡API escuchando en el puerto 3001!"));
  init.verificar(db);
});

app.use("/uploads", express.static("uploads"));
app.get("/", express.static(path.join(__dirname, "./uploads")));
