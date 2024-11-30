const express = require('express');
const cors = require('cors');
const path = require('path');
const ruta = '/archivos';
const fs = require('fs'); 
var bodyParser = require('body-parser');
require('dotenv').config();
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //APIS
        this.productoPath = '/api/producto';
        this.grupoPath = '/api/grupo';
        this.proveedorPath = '/api/proveedor';
        this.proveedorPath = '/api/proveedor';
        this.distribucionTipoMedidaPath = '/api/distribucionTipoMedida';
        this.tipoMedidaPath = '/api/tipoMedida';
        this.cambioPorcentajeXGrupoPath = '/api/cambioPorcentajeXGrupo';
        this.constantesPath = '/api/constantes';
        this.securityPath = '/api/security';
        this.movilPath = '/api/movil';

        //MIDDLEWARES
        this.middlewares();

        //ROUTES
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use( cors() );
        
        //Lectura y parseo en json
        this.app.use( express.json() );
        this.app.use('/archivos', express.static((__dirname + ruta).replace('server','')));//BOTA LAS IMAGENES

        

    }

    routes(){
        this.app.get('/', (req, res) => {
            res.status(200).json({ estado: true, mensaje: "Se conecto al API" })
        });
        this.app.use( this.productoPath, require('../routers/producto.route') );
        this.app.use( this.tipoMedidaPath, require('../routers/tipo-medida.route') );
        this.app.use( this.distribucionTipoMedidaPath, require('../routers/distribucion-tipo-medida.route') );
        this.app.use( this.grupoPath, require('../routers/grupo.route') );
        this.app.use( this.proveedorPath, require('../routers/proveedor.route') );
        this.app.use( this.cambioPorcentajeXGrupoPath, require('../routers/cambio-porcentaje-x-grupo.route') );
        this.app.use( this.constantesPath, require('../routers/constantes.route') );
        this.app.use( this.securityPath, require('../routers/security.route') );
        this.app.use( this.movilPath, require('../routers/movil.route') );
    }

    listen(){
        //this.app.listen(this.port, '0.0.0.0',  ()=>{
        this.app.listen(this.port, '0.0.0.0',  ()=>{
            console.log("Servidor corriendo en http://0.0.0.0:", this.port);
        });
    }

}

module.exports = Server;
