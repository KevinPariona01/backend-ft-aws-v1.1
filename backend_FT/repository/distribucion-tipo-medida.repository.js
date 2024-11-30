const { pool, db } = require('../database/config');
const util = require('util');
const dbAll = util.promisify(db.all).bind(db);

const getDistribucionTipoMedida = async (request)=> {

    let n_id_tipo_medida = request.body.n_id_tipo_medida;

    //QUERYS
    let query1 = `SELECT dtm.n_id_distribucion_tipo_medida, dtm.c_nombre_distribucion_tipo_medida, tm.c_nombre_tipo_medida, tm.n_id_tipo_medida, dtm.f_distribucion_tipo_medida, dtm.c_descripcion_distribucion_tipo_medida, dtm.n_orden
    FROM distribucion_tipo_medida dtm
    INNER JOIN tipo_medida tm on tm.n_id_tipo_medida = dtm.n_id_tipo_medida and tm.b_estado = 1
    WHERE dtm.b_estado = 1 and dtm.n_id_tipo_medida = ${n_id_tipo_medida}
    ORDER BY n_orden ASC
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

const saveDistribucionTipoMedida = async (request)=> {
    //QUERYS
    let n_id_tipo_medida = request.body.n_id_tipo_medida;
    let c_nombre_distribucion_tipo_medida = request.body.c_nombre_distribucion_tipo_medida;
    let f_distribucion_tipo_medida = request.body.f_distribucion_tipo_medida;
    let c_descripcion_distribucion_tipo_medida = request.body.c_descripcion_distribucion_tipo_medida;

    let query1 = `INSERT INTO distribucion_tipo_medida(n_id_tipo_medida, c_nombre_distribucion_tipo_medida, f_distribucion_tipo_medida, c_descripcion_distribucion_tipo_medida)
    VALUES(${n_id_tipo_medida}, '${c_nombre_distribucion_tipo_medida}', '${f_distribucion_tipo_medida}', '${c_descripcion_distribucion_tipo_medida}')`;

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

const updateDistribucionTipoMedida = async (request)=> {
    //QUERYS
    let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;
    let n_id_tipo_medida = request.body.n_id_tipo_medida;
    let c_nombre_distribucion_tipo_medida = request.body.c_nombre_distribucion_tipo_medida;
    let f_distribucion_tipo_medida = request.body.f_distribucion_tipo_medida;
    let c_descripcion_distribucion_tipo_medida = request.body.c_descripcion_distribucion_tipo_medida;

    let query1 = `UPDATE distribucion_tipo_medida SET n_id_tipo_medida = ${n_id_tipo_medida}, c_nombre_distribucion_tipo_medida = '${c_nombre_distribucion_tipo_medida}', c_descripcion_distribucion_tipo_medida = '${c_descripcion_distribucion_tipo_medida}', f_distribucion_tipo_medida = ${f_distribucion_tipo_medida}
    WHERE n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida}`;

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

const deleteDistribucionTipoMedida = async (request)=> {
    //QUERYS
    let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;

    let query1 = `UPDATE distribucion_tipo_medida SET b_estado = 0 WHERE n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida}`;

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

const cambiarOrdenDistribucionTipoMedida = async (request)=> {
    //QUERYS
    let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;
    let n_orden = request.body.n_orden;

    let query1 = `UPDATE distribucion_tipo_medida SET n_orden = ${n_orden}
    WHERE n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida}`;

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

const obtenerListaMedidaXGrupo = async (request)=> {
    //QUERYS
    let n_id_grupo = request.body.n_id_grupo;

    let query1 = `SELECT 
        distribucion_tipo_medida.n_id_distribucion_tipo_medida,
        distribucion_tipo_medida.c_nombre_distribucion_tipo_medida
    FROM distribucion_tipo_medida
    INNER JOIN producto ON producto.n_id_tipo_medida = distribucion_tipo_medida.n_id_tipo_medida
    INNER JOIN grupo ON grupo.n_id_grupo = producto.n_id_grupo
    WHERE grupo.n_id_grupo = ${n_id_grupo} AND grupo.b_estado = 1
    GROUP BY distribucion_tipo_medida.c_nombre_distribucion_tipo_medida
    ORDER BY distribucion_tipo_medida.n_orden, distribucion_tipo_medida.n_id_distribucion_tipo_medida;`;

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

const actualizarPorcentajePorProducto = async (request)=> {
    
    //QUERYS
    let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;
    let n_id_producto = request.body.n_id_producto;
    let n_id_grupo = request.body.n_id_grupo;
    let f_valor_porcentaje = request.body.f_valor_porcentaje;


    let query1 = `UPDATE porcentaje_distribucion_producto set f_valor_porcentaje = ${f_valor_porcentaje}
    WHERE n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida} AND n_id_producto = ${n_id_producto} AND n_id_grupo = ${n_id_grupo}`;

    console.log("query1 => ", query1);

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
        console.log("error => ", error);
        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

const actualizarEstaticoPorProducto = async (request)=> {
    //QUERYS
    let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;
    let n_id_producto = request.body.n_id_producto;
    let n_id_grupo = request.body.n_id_grupo;
    let f_precio_estatico = request.body.f_precio_estatico;


    let query1 = `UPDATE porcentaje_distribucion_producto set f_precio_estatico = ${f_precio_estatico}
    WHERE n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida} AND n_id_producto = ${n_id_producto} AND n_id_grupo = ${n_id_grupo}`;

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
    getDistribucionTipoMedida,
    saveDistribucionTipoMedida,
    updateDistribucionTipoMedida,
    deleteDistribucionTipoMedida,
    cambiarOrdenDistribucionTipoMedida,
    obtenerListaMedidaXGrupo,
    actualizarPorcentajePorProducto,
    actualizarEstaticoPorProducto
}