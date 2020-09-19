const messages = require("../default/messages.controller")
const http = require("http");
const path = require("path");
const fs = require("fs");



module.exports = {
    upload:(req,res)=>{
        console.log("Cargando")
        console.log(req.file)
        messages.success(req.file.path, res)
    }
}