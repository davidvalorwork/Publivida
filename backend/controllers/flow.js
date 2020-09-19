
const config = require("../config.json");
const axios = require("axios");
const CryptoJS = require("crypto-js")
const messages = require('../controllers/default/messages.controller')
// const db = require('../database/db');
// const enviarCorreo = require("./mailCtrl")


const flow = {
    pago: async(db,req,res)=>{
        console.log('pago')
        const {
            monto,
            pedidoID
        } = req.body
        const commerceOrder = Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100
        console.log(commerceOrder)
        try{
            console.log("Dentro del try")
            let params = {
                "apiKey":config.apiKey,
                "subject": `Publivida Web Pay`,
                "currency": "CLP",
                "amount": monto,
                "email": "publivida@gmail.com",
                "commerceOrder": commerceOrder,
                "urlConfirmation": config.baseURL+'/pedidos/flow/result' ,
                "urlReturn": config.frontURL ,
            };
            let data = await getPack(params);
            let firma = await firmar(params)
            const serviceName = "payment/create";
            const url =`${config.apiURL}/${serviceName}`;
            axios.post(url,`${data}&s=${firma}`).then((data)=>{
                console.log(data.data)
                console.log(db)
                let response = data.data
                db.pagos.create({
                    monto:monto,
                    borrado:0,
                    flow_token:response.token,
                    pedidoIdPedidos:pedidoID,
                    estado:"Pendiente"
                })
                // let sql =  `INSERT INTO pagos(id_ordenes, flow_order,token,monto,estatus_pago) VALUES
                //              ('${id_ordenes}','${response.flowOrder}','${response.token}','${monto}','pendiente')`
                // db.query(sql,(err,result)=>{
                //     if(err){
                //         console.log(err)
                //         console.log("A ocurrido un error al insertar el pago en la BD")
                //     }else{console.log("Pago insertado con exito.")}
                // })
                // sql = `UPDATE ordenes SET estado='pendiente' where id=${id_ordenes}`
                // db.query(sql,(err,result)=>{
                //     if(err){
                //         console.log(err)
                //         console.log("A ocurrido un error al cambiar el estatus de la orden.")
                //     }else{console.log("Orden en estado pendiente.")}
                // })
                let redirect = response.url + "?token=" + response.token;
                console.log(response)
                messages.success(redirect,res)
            })
            .catch(error => {
                console.log(error)
                console.log("A ocurrido un error antes de enviar el post")
                res.send("A ocurrido un error por favor vuelva a intentar.")
            });
        }catch(error) {
            console.log(error)
            res.send('error')
        }
    },
    result: async(db,req,res)=>{
        console.log("Respuesta de pago realizado")
        console.log(req.body.token)
        const pago = await db.pagos.findOne({where:{flow_token:req.body.token}})
        console.log(pago)
        pago.estado = "Pagado"
        await pago.save()
        const pedido = await db.pedidos.findOne({where:{id_pedidos:pago.dataValues.pedidoIdPedidos}})
        pedido.estadosPedidoIdEstadosPedidos = 3
        await pedido.save()
        res.status(200).send("ok")
    },
    pago_realizado: async(req,res)=>{
        console.log(req.body)
        const {order_id} = req.body
        db.query(`UPDATE ordenes SET estado='pago' WHERE id=${order_id}`,(err,result)=>{
            if(err){
                res.json({ok:false,msj:"no se pudo eliminar la orden"})
            }else{
                res.json({ok:true,msj:"orden pagada",result})
            }
        })
        // res.send("ok")
    }
}

const firmar = async(params) => {
    const keys = Object.keys(params)
      .map(key => key)
      .sort((a, b) => {
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0;
      });
    let toSign = [];
    keys.map(key => {
      toSign.push(key + "=" + params[key]);
    });
    toSign = toSign.join("&");

    return CryptoJS.HmacSHA256(toSign, config.secretKey);
  }
const getPack =async(params) => {
const keys = Object.keys(params)
    .map(key => key)
    .sort((a, b) => {
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
    });
let data = [];
keys.map(key => {
    data.push(key + "=" + params[key]);
});
return data.join("&");
}
module.exports = flow



// CREDENCIALES CLIENTE
// {
//   "apiKey": "2EF9AF26-A2DB-40DF-8A99-953A0BA87L32",
//   "secretKey": "358a67d403dabed24d8695b3cfd99ee8daf3e492",
//   "apiURL": "https://www.flow.cl/api",
//   "baseURL": "http://18.218.87.159:3030/flow",
//   "frontURL":"http://18.218.87.159/"
// }
