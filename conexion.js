var Sequelize= require("sequelize"); //para conectar a mysql
var usuarioModelo= require("./modelos/usuarios");
require("dotenv").config();

var db = process.env.DB_MYSQL;
var usuario = process.env.USUARIO_MYSQL;
var password = process.env.PASSWORD_MYSQL;
var host = process.env.HOST_MYSQL;
var port = process.env.PORT_MYSQL;

var conexion= new Sequelize(db, usuario, password, {
    host:host,
    port:port,
    dialect:'mysql',
    dialectOptions:{
        ssl:{
            rejectUnathorized:true
        }
    },
    define:{
        timestamps:false
    }
});


conexion.sync({force:false})
.then(()=>{
    console.log("conectado a MYSQL de planetScale");
})
.catch((err)=>{
    console.log("Error al conectarse a MYSQL de planetScale"+err);
    console.log("intentar una conexion al local");
    db =  process.env.DB_LOCAL;
    usuario =  process.env.USUARIO_LOCAL;
    password =  process.env.PASSWORD_LOCAL;
    host =  process.env.HOST_LOCAL;
    port = process.env.PORT_LOCAL;

    conexion= new Sequelize(db, usuario, password, {
        host:host,
        port:port,
        dialect:'mysql',
        dialectOptions:{
        ssl:{
            rejectUnathorized:true
        }
    },
    define:{
        timestamps:false
    }
    });
    conexion.sync({force:false})
    .then(()=>{
        console.log("conectado a MYSQL local");
    })
    .catch(()=>{
        console.log("Error al conectarse a MYSQL local");
    });
});

var Usuario =usuarioModelo(conexion);

module.exports={
    Usuario:Usuario
}