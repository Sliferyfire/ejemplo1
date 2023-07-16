var ruta=require("express").Router();
const { where } = require("sequelize");
var {Usuario}=require('../conexion');

ruta.get("/", (req, res)=>{
    Usuario.findAll({where:{status:1}})
    .then((usu)=>{
        //console.log(usu);
        res.render("mostrarUsuarios",{usuarios:usu});
    })
    .catch((err)=>{
        console.log("Error " + err)
        res.end();
    });

});

ruta.get("/nuevoUsuario", (req, res)=>{
    res.render("nuevoUsuario");
});

ruta.post("/capturarUsuario",(req, res)=>{
    //console.log(req.body);
    Usuario.create(req.body)
    .then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log("No se pudo insertar el usuario "+ err);
        res.redirect("/");
    });
    
});

ruta.get("/editarUsuario/:id",(req,res)=>{
    Usuario.findByPk(req.params.id)
    .then((usuario)=>{
        res.render("modificarUsuario",{usuario:usuario});
    })
    .catch((err)=>{
        console.log("Error...." + err);
        res.redirect("/");
    });
    
});

ruta.post("/modificarUsuario",(req, res)=>{
    Usuario.update(req.body, {where:{id:req.body.id}})
    .then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log("Error............." +err);
        res.redirect("/");
    });
});

ruta.get("/borrarUsuario/:id",(req, res)=>{
    Usuario.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log("Error.........." + err);
        res.redirect("/");
    });
});

ruta.get("/borrarUsuario2/:id",(req, res)=>{

    Usuario.update({status:0}, {where:{id:req.params.id}})
    .then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log("Error............." +err);
        res.redirect("/");
    });
});

module.exports=ruta;