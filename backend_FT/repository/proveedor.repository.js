const { pool, db } = require('../database/config');
const util = require('util');
const dbAll = util.promisify(db.all).bind(db);

const getProveedor= async ()=> {
    //QUERYS
    let query1 = `SELECT n_id_proveedor, c_nombre_proveedor, c_ruc_proveedor, c_numero_proveedor, c_descripcion_proveedor FROM proveedor WHERE b_estado = 1 ORDER BY n_id_proveedor ASC`;
    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
    };
    try{
        let response1 = await dbAll(query1);

        body.response1 = response1;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

const saveProveedor= async (request)=> {
    //QUERYS
    let c_nombre_proveedor = request.body.c_nombre_proveedor;
    let c_ruc_proveedor = request.body.c_ruc_proveedor;
    let c_numero_proveedor = request.body.c_numero_proveedor;
    let c_descripcion_proveedor = request.body.c_descripcion_proveedor;

    let query1 = `INSERT INTO proveedor(c_nombre_proveedor, c_ruc_proveedor, c_numero_proveedor, c_descripcion_proveedor)
    VALUES('${c_nombre_proveedor}', '${c_ruc_proveedor}', '${c_numero_proveedor}', '${c_descripcion_proveedor}')`;

    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
    };
    try{
        let response1 = await dbAll(query1);

        body.response1 = response1;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

const updateProveedor = async (request)=> {
    //QUERYS
    let n_id_proveedor = request.body.n_id_proveedor;
    let c_nombre_proveedor = request.body.c_nombre_proveedor;
    let c_ruc_proveedor = request.body.c_ruc_proveedor;
    let c_numero_proveedor = request.body.c_numero_proveedor;
    let c_descripcion_proveedor = request.body.c_descripcion_proveedor;

    let query1 = `UPDATE proveedor SET c_nombre_proveedor = '${c_nombre_proveedor}', c_ruc_proveedor = '${c_ruc_proveedor}', c_numero_proveedor = '${c_numero_proveedor}', c_descripcion_proveedor = '${c_descripcion_proveedor}' 
    WHERE n_id_proveedor = ${n_id_proveedor}`;

    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
    };
    try{
        let response1 = await dbAll(query1);
        
        body.response1 = response1;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

const deleteProveedor = async (request)=> {
    //QUERYS
    let n_id_proveedor = request.body.n_id_proveedor;

    let query1 = `UPDATE proveedor SET b_estado = 0 WHERE n_id_proveedor = ${n_id_proveedor}`;

    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
    };
    try{
        let response1 = await dbAll(query1);

        body.response1 = response1;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

module.exports = {
    getProveedor,
    saveProveedor,
    updateProveedor,
    deleteProveedor
}