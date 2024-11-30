const { pool, db } = require('../database/config');
const util = require('util');
const dbAll = util.promisify(db.all).bind(db);

const getConstantes= async ()=> {
    //QUERYS
    let query1 = `SELECT * FROM constantes WHERE b_estado = 1`;
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

const saveConstante= async (request)=> {

    let c_valor_id_constante = request.body.c_valor_id_constante;
    let c_valor_constante = request.body.c_valor_constante;
    let c_descripcion_constante = request.body.c_descripcion_constante;

    //QUERYS
    let query1 = `INSERT INTO constantes(c_valor_id_constante, c_valor_constante, c_descripcion_constante)
    VALUES("${c_valor_id_constante}", "${c_valor_constante}", "${c_descripcion_constante}")`;
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

const updateConstante= async (request)=> {

    let c_valor_id_constante = request.body.c_valor_id_constante;
    let c_valor_constante = request.body.c_valor_constante;
    let c_descripcion_constante = request.body.c_descripcion_constante;

    //QUERYS
    let query1 = `UPDATE constantes SET c_valor_constante = '${c_valor_constante}', c_descripcion_constante = '${c_descripcion_constante}'
    WHERE c_valor_id_constante = '${c_valor_id_constante}'
    `;
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

const getDolar= async ()=> {
    //QUERYS
    let query1 = `SELECT c_valor_constante FROM constantes WHERE c_valor_id_constante = 'TX_ID_DOLAR' and b_estado = 1`;
    let query2 = `SELECT c_valor_constante FROM constantes WHERE c_valor_id_constante = 'TX_ID_IGV' and b_estado = 1`;
    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
        response2:null,
    };
    try{
        let response1 = await dbAll(query1);
        let response2 = await dbAll(query2);

        body.response1 = response1;
        body.response2 = response2;

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
    getConstantes,
    saveConstante,
    updateConstante,
    getDolar
}