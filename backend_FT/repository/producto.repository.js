const { pool, db } = require('../database/config');
const util = require('util');
const dbAll = util.promisify(db.all).bind(db);
const dbRun = util.promisify(db.run).bind(db);

const getProducto = async (request)=> {
    let n_id_grupo = request.body.n_id_grupo || null;
    //QUERYS
    let query1 = `
    SELECT 
        p.n_id_producto,
        p.n_id_tipo_medida,
        p.n_id_grupo,
        p.n_id_proveedor,
        p.c_codigo_producto,
        p.c_nombre_producto,
        p.c_detalle_primario_producto,
        p.c_descripcion_producto,
        p.f_precio_producto,
        p.b_igv_producto,
        p.b_dolar_producto,
        p.b_par_producto,
        tp.c_nombre_tipo_medida,
        p.n_cantidad_viene_producto,
        p.n_precio_por_cantidad_viene_producto,
        p.n_id_producto_asociado,
        ps.c_nombre_producto || ps.c_detalle_primario_producto  as nombreProductoAsociado,
        p.c_color,
        p.n_stock1,
        p.n_stock2,
        p.n_stock3,
        p.c_fec_actu_stock1,
        p.c_fec_actu_stock2,
        p.c_fec_actu_stock3,
        p.n_pedido1,
        p.n_pedido2,
        p.n_pedido3,
        p.c_fec_actu_pedido1,
        p.c_fec_actu_pedido2,
        p.c_fec_actu_pedido3,
        p.c_descripcion_pedido,
        p.n_activo
    FROM 
    producto p
    LEFT JOIN tipo_medida tp on tp.n_id_tipo_medida = p.n_id_tipo_medida and tp.b_estado = 1
    LEFT JOIN grupo g on g.n_id_grupo = p.n_id_grupo and g.b_estado = 1
    LEFT JOIN producto ps on p.n_id_producto_asociado = ps.n_id_producto
    where  (p.n_id_grupo = ${n_id_grupo}) and p.b_estado = 1`;
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

const getProductoXNombre = async (request)=> {
    let c_nombre_producto = request.body.c_nombre_producto || null;
    //QUERYS
    let query1 = ``;

    if(c_nombre_producto != '' && c_nombre_producto!=null){
        query1 = `SELECT 
            p.c_nombre_producto,
            p.c_detalle_primario_producto,
            p.c_descripcion_producto,
            p.f_precio_producto,
            p.b_igv_producto,
            p.b_dolar_producto,
            p.b_par_producto,
            g.c_nombre_grupo,
            tp.c_nombre_tipo_medida,
            p.n_cantidad_viene_producto,
            p.n_precio_por_cantidad_viene_producto,
            p.n_id_producto_asociado,
            ps.c_nombre_producto || ps.c_detalle_primario_producto  as nombreProductoAsociado,
            p.c_color
        FROM 
        producto p
        LEFT JOIN tipo_medida tp on tp.n_id_tipo_medida = p.n_id_tipo_medida and tp.b_estado = 1
        LEFT JOIN grupo g on g.n_id_grupo = p.n_id_grupo and g.b_estado = 1
        LEFT JOIN producto ps on p.n_id_producto_asociado = ps.n_id_producto
        where  p.b_estado = 1 and 1 = 1`
        query1 = query1 + ` and p.c_nombre_producto || p.c_detalle_primario_producto like '%${c_nombre_producto}%'`;
    }

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

const getDatesForEdit= async (request)=> {
    //QUERYS
    let id_producto = request.body.n_id_producto;
    let n_id_grupo = request.body.n_id_grupo;

    let query1 = 'SELECT n_id_tipo_medida, c_nombre_tipo_medida FROM tipo_medida WHERE b_estado = 1';
    let query2 = 'SELECT n_id_grupo, c_nombre_grupo FROM grupo  WHERE b_estado = 1';
    let query3 = 'SELECT n_id_proveedor, c_nombre_proveedor FROM proveedor  WHERE b_estado = 1';
    let query5 = `SELECT 
        dtm.n_id_distribucion_tipo_medida,
        CASE WHEN pdp.n_id_producto IS NOT NULL THEN 1 ELSE 0 END AS actualizar
    FROM producto p
    INNER JOIN tipo_medida tp on tp.n_id_tipo_medida = p.n_id_tipo_medida and tp.b_estado = 1
    INNER JOIN distribucion_tipo_medida dtm on dtm.n_id_tipo_medida = tp.n_id_tipo_medida and dtm.b_estado = 1
    LEFT OUTER JOIN porcentaje_distribucion_producto pdp on pdp.n_id_distribucion_tipo_medida = dtm.n_id_distribucion_tipo_medida and pdp.n_id_producto = p.n_id_producto
    WHERE p.n_id_producto = ${id_producto}`;
    //let query6 = 'SELECT * FROM producto  WHERE b_estado = 1';


    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
        response2:null,
        response3:null,
        response4:null,
    };
    try{
        let response1 = await dbAll(query1);
        let response2 = await dbAll(query2);
        let response3 = await dbAll(query3);
        //let response6 = await dbAll(query6);
        let response4 = null;
        let responseInsert = null;
        if(id_producto!==null){
            responseInsert = await dbAll(query5);
            for(let r of responseInsert){
                if(!r.actualizar){
                    let query = `INSERT INTO porcentaje_distribucion_producto(n_id_distribucion_tipo_medida, n_id_producto, n_id_grupo, f_valor_porcentaje, f_precio_estatico)
                    VALUES(${r.n_id_distribucion_tipo_medida}, ${id_producto}, ${n_id_grupo}, 0, 0)`;
                    await dbAll(query);
                }
            }

            let query4 = `SELECT 
                dtm.n_id_distribucion_tipo_medida,
                pdp.n_id_grupo,
                p.c_nombre_producto,
                p.c_detalle_primario_producto,
                p.f_precio_producto,
                dtm.f_distribucion_tipo_medida,
                dtm.c_nombre_distribucion_tipo_medida,
                CASE WHEN pdp.n_id_producto IS NOT NULL THEN 1 ELSE 0 END AS actualizar,
                pdp.f_valor_porcentaje,
                pdp.f_precio_estatico
            FROM producto p
            INNER JOIN tipo_medida tp on tp.n_id_tipo_medida = p.n_id_tipo_medida and tp.b_estado = 1
            INNER JOIN distribucion_tipo_medida dtm on dtm.n_id_tipo_medida = tp.n_id_tipo_medida and dtm.b_estado = 1
            LEFT OUTER JOIN porcentaje_distribucion_producto pdp on pdp.n_id_distribucion_tipo_medida = dtm.n_id_distribucion_tipo_medida and pdp.n_id_producto = p.n_id_producto
            WHERE p.n_id_producto = ${id_producto}`;

            response4 = await dbAll(query4);
        }

        body.response1 = response1;
        body.response2 = response2;
        body.response3 = response3;
        body.response4 = response4;
        //body.response6 = response6;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

const saveProducto = async (request)=> {
    //QUERYS
    let n_id_tipo_medida = request.body.n_id_tipo_medida;
    let n_id_grupo = request.body.n_id_grupo;
    let n_id_proveedor = request.body.n_id_proveedor;
    let c_codigo_producto = request.body.c_codigo_producto;
    let c_nombre_producto = request.body.c_nombre_producto;
    let c_descripcion_producto = request.body.c_descripcion_producto;
    let c_detalle_primario_producto = request.body.c_detalle_primario_producto;
    let f_precio_producto = request.body.f_precio_producto;
    let b_igv_producto = request.body.b_igv_producto;
    let b_dolar_producto = request.body.b_dolar_producto;
    let b_par_producto = request.body.b_par_producto;
    let n_cantidad_viene_producto = request.body.n_cantidad_viene_producto;
    let n_precio_por_cantidad_viene_producto = request.body.n_precio_por_cantidad_viene_producto;
    let n_id_producto_asociado = request.body.n_id_producto_asociado;
    let c_color = request.body.c_color;
    
    let id_producto = null;

    let query1 = `INSERT INTO producto(n_id_tipo_medida, n_id_grupo, n_id_proveedor,  c_codigo_producto, c_nombre_producto, c_descripcion_producto, c_detalle_primario_producto, f_precio_producto, n_cantidad_viene_producto, n_precio_por_cantidad_viene_producto, b_igv_producto, b_dolar_producto, b_par_producto, c_color, n_id_producto_asociado)
    VALUES(${n_id_tipo_medida}, ${n_id_grupo}, ${n_id_proveedor},'${c_codigo_producto}' ,'${c_nombre_producto}', '${c_descripcion_producto}', '${c_detalle_primario_producto}', ${f_precio_producto}, ${n_cantidad_viene_producto}, ${n_precio_por_cantidad_viene_producto}, ${b_igv_producto}, ${b_dolar_producto}, ${b_par_producto}, '${c_color}', ${n_id_producto_asociado})
    `;

    let query2 = `SELECT last_insert_rowid() AS id;`;

    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
        response2:null,
        response3:null,
    };
    try{
        let response1 = await dbRun(query1);
        let response2 = await dbAll(query2);
        //console.log("response2 => ", response2);
        id_producto = response2[0].id;
        //console.log("id_producto => ", id_producto);

        let query3 = `SELECT 
            dtm.n_id_distribucion_tipo_medida
        FROM producto p
        INNER JOIN tipo_medida tp on tp.n_id_tipo_medida = p.n_id_tipo_medida and tp.b_estado = 1
        INNER JOIN distribucion_tipo_medida dtm on dtm.n_id_tipo_medida = tp.n_id_tipo_medida and dtm.b_estado = 1
        LEFT OUTER JOIN porcentaje_distribucion_producto pdp on pdp.n_id_distribucion_tipo_medida = dtm.n_id_distribucion_tipo_medida and pdp.n_id_producto = p.n_id_producto
        WHERE p.n_id_producto = ${id_producto}`;



        body.response1 = response1;
        body.response2 = response2;
        let responseInsert = await dbAll(query3);

        for(let r of responseInsert){
            let query = `INSERT INTO porcentaje_distribucion_producto(n_id_distribucion_tipo_medida, n_id_producto, n_id_grupo, f_valor_porcentaje, f_precio_estatico)
            VALUES(${r.n_id_distribucion_tipo_medida}, ${id_producto}, ${n_id_grupo}, 0, 0)`;

            await dbAll(query);
        };

        let query4 = `SELECT 
            dtm.n_id_distribucion_tipo_medida,
            pdp.n_id_grupo,
            p.c_nombre_producto,
            p.c_detalle_primario_producto,
            p.f_precio_producto,
            dtm.f_distribucion_tipo_medida,
            dtm.c_nombre_distribucion_tipo_medida,
            CASE WHEN pdp.n_id_producto IS NOT NULL THEN 1 ELSE 0 END AS actualizar,
            pdp.f_valor_porcentaje,
            pdp.f_precio_estatico
        FROM producto p
        INNER JOIN tipo_medida tp on tp.n_id_tipo_medida = p.n_id_tipo_medida and tp.b_estado = 1
        INNER JOIN distribucion_tipo_medida dtm on dtm.n_id_tipo_medida = tp.n_id_tipo_medida and dtm.b_estado = 1
        LEFT OUTER JOIN porcentaje_distribucion_producto pdp on pdp.n_id_distribucion_tipo_medida = dtm.n_id_distribucion_tipo_medida and pdp.n_id_producto = p.n_id_producto
        WHERE p.n_id_producto = ${id_producto}`;

        
        
        let response3 = await dbAll(query4);
        body.response3 = response3;
        

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

const updateProducto = async (request)=> {
    //QUERYS
    let n_id_producto = request.body.n_id_producto;
    let n_id_tipo_medida = request.body.n_id_tipo_medida;
    let n_id_grupo = request.body.n_id_grupo;
    let n_id_proveedor = request.body.n_id_proveedor;
    let c_codigo_producto = request.body.c_codigo_producto == null ? '' : request.body.c_codigo_producto;
    let c_nombre_producto = request.body.c_nombre_producto;
    let c_detalle_primario_producto = request.body.c_detalle_primario_producto;
    let c_descripcion_producto = request.body.c_descripcion_producto;
    let f_precio_producto = request.body.f_precio_producto;
    let b_igv_producto = request.body.b_igv_producto;
    let b_dolar_producto = request.body.b_dolar_producto;
    let b_par_producto = request.body.b_par_producto;
    let b_actualizarGrupoPorcentaje = request.body.b_actualizarGrupoPorcentaje;
    let n_cantidad_viene_producto = request.body.n_cantidad_viene_producto;
    let n_precio_por_cantidad_viene_producto = request.body.n_precio_por_cantidad_viene_producto;
    let n_id_producto_asociado = request.body.n_id_producto_asociado;
    let c_color = request.body.c_color;
    let c_descripcion_pedido = request.body.c_descripcion_pedido;

    let query1 = `UPDATE producto 
    SET n_id_tipo_medida = ${n_id_tipo_medida}, n_id_grupo=${n_id_grupo}, n_id_proveedor=${n_id_proveedor}, c_codigo_producto='${c_codigo_producto}', c_nombre_producto='${c_nombre_producto}', c_detalle_primario_producto='${c_detalle_primario_producto}',
    c_descripcion_producto='${c_descripcion_producto}', f_precio_producto=${f_precio_producto}, b_igv_producto=${b_igv_producto}, b_dolar_producto=${b_dolar_producto},
    b_par_producto=${b_par_producto}, n_cantidad_viene_producto = ${n_cantidad_viene_producto}, n_precio_por_cantidad_viene_producto = ${n_precio_por_cantidad_viene_producto},
    c_color = '${c_color}', n_id_producto_asociado = ${n_id_producto_asociado}, c_descripcion_pedido = '${c_descripcion_pedido}'
    WHERE n_id_producto = ${n_id_producto}
    `;

    if(b_actualizarGrupoPorcentaje){
        let queryActualizar = `UPDATE porcentaje_distribucion_producto SET n_id_grupo = ${n_id_grupo} 
        WHERE n_id_producto = ${n_id_producto}`;
        await dbAll(queryActualizar);
    }
    
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

const deleteProducto = async (request)=> {
    //QUERYS
    let n_id_producto = request.body.n_id_producto;

    let query1 = `UPDATE producto SET b_estado = 0 WHERE n_id_producto = ${n_id_producto}`;

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

const updateDescripcionPedido = async (request)=> {
    //QUERYS
    let n_id_producto = request.body.n_id_producto;
    let c_descripcion_pedido = request.body.c_descripcion_pedido;

    let query1 = `UPDATE producto SET c_descripcion_pedido = '${c_descripcion_pedido}' WHERE n_id_producto = ${n_id_producto}`;

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

const changeActivo = async (request)=> {
    //QUERYS
    let n_id_producto = request.body.n_id_producto;
    let n_activo = request.body.n_activo;

    let query1 = `UPDATE producto SET n_activo = ${n_activo} WHERE n_id_producto = ${n_id_producto}`;

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

const updateSotck = async (request)=> {
    //QUERYS
    let caseGeneric = request.body.caseGeneric;
    let n_id_producto = request.body.n_id_producto;
    let n_stock = request.body.n_stock;
    let c_fec_actu_stock = request.body.c_fec_actu_stock;

    let query1 = `UPDATE producto SET n_stock${caseGeneric} = ${n_stock}, c_fec_actu_stock${caseGeneric} = '${c_fec_actu_stock}' WHERE n_id_producto = ${n_id_producto}`;

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

const updatePedido = async (request)=> {
    //QUERYS
    let caseGeneric = request.body.caseGeneric;
    let n_id_producto = request.body.n_id_producto;
    let n_pedido = request.body.n_pedido;
    let c_fec_actu_pedido = request.body.c_fec_actu_pedido;

    let query1 = `UPDATE producto SET n_pedido${caseGeneric} = ${n_pedido}, c_fec_actu_pedido${caseGeneric} = '${c_fec_actu_pedido}' WHERE n_id_producto = ${n_id_producto}`;

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

const updatePedidoSegunStock = async (request)=> {
    //QUERYS
    let caseGeneric = request.body.caseGeneric;
    let n_id_producto = request.body.n_id_producto;
    let n_pedido = request.body.n_pedido;
    let n_stock = request.body.n_stock;
    let c_fec_actu_pedido = request.body.c_fec_actu_pedido;
    let c_fec_actu_stock = request.body.c_fec_actu_stock;

    let query1 = `UPDATE producto SET n_stock${caseGeneric} = ${n_stock}, c_fec_actu_stock${caseGeneric} = '${c_fec_actu_stock}', n_pedido${caseGeneric} = ${n_pedido}, c_fec_actu_pedido${caseGeneric} = '${c_fec_actu_pedido}' WHERE n_id_producto = ${n_id_producto}`;

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

const savePorcentajeDistribucionProducto = async (request)=> {
    //QUERYS
    let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;
    let n_id_producto = request.body.n_id_producto;
    let n_id_grupo = request.body.n_id_grupo;
    let f_valor_porcentaje = request.body.f_valor_porcentaje;
    let f_precio_estatico = request.body.f_precio_estatico;
    let query1 = `INSERT INTO porcentaje_distribucion_producto(n_id_distribucion_tipo_medida, n_id_producto, n_id_grupo, f_valor_porcentaje, f_precio_estatico)
    VALUES(${n_id_distribucion_tipo_medida}, ${n_id_producto}, ${n_id_grupo}, ${f_valor_porcentaje}, ${f_precio_estatico})`;

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

const updatePorcentajeDistribucionProducto = async (request)=> {
    //QUERYS
    //console.log("entro, " , request.body);
    let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;
    let n_id_producto = request.body.n_id_producto;
    let n_id_grupo = request.body.n_id_grupo;
    let f_valor_porcentaje = request.body.f_valor_porcentaje;
    let f_precio_estatico = request.body.f_precio_estatico;
    let query1 = `UPDATE porcentaje_distribucion_producto SET f_valor_porcentaje = ${f_valor_porcentaje}, f_precio_estatico = ${f_precio_estatico}
    WHERE n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida} AND n_id_producto = ${n_id_producto} AND n_id_grupo =  ${n_id_grupo}`;
    
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

const getDetalleProducto = async (request)=> {
    //QUERYS
    let n_id_producto = request.body.n_id_producto;
    let n_id_producto_asociado = request.body.n_id_producto_asociado;
    let query1 = `SELECT 
            dtm.n_id_distribucion_tipo_medida,
            pdp.n_id_grupo,
            p.c_nombre_producto,
            p.c_detalle_primario_producto,
            p.f_precio_producto,
            p.b_par_producto,
            dtm.f_distribucion_tipo_medida,
            dtm.c_nombre_distribucion_tipo_medida,
            CASE WHEN pdp.n_id_producto IS NOT NULL THEN 1 ELSE 0 END AS actualizar,
            pdp.f_valor_porcentaje,
            pdp.f_precio_estatico
        FROM producto p
        INNER JOIN tipo_medida tp on tp.n_id_tipo_medida = p.n_id_tipo_medida and tp.b_estado = 1
        INNER JOIN distribucion_tipo_medida dtm on dtm.n_id_tipo_medida = tp.n_id_tipo_medida and dtm.b_estado = 1
        LEFT OUTER JOIN porcentaje_distribucion_producto pdp on pdp.n_id_distribucion_tipo_medida = dtm.n_id_distribucion_tipo_medida and pdp.n_id_producto = p.n_id_producto
        WHERE p.n_id_producto = ${n_id_producto}
        ORDER BY dtm.n_orden ASC
        `;
    
    let query2 = `select * from producto where b_estado = 1 and n_id_producto = ${n_id_producto_asociado}`;

    let query3 = `SELECT 
            dtm.n_id_distribucion_tipo_medida,
            pdp.n_id_grupo,
            p.c_nombre_producto,
            p.c_detalle_primario_producto,
            p.f_precio_producto,
            p.b_par_producto,
            dtm.f_distribucion_tipo_medida,
            dtm.c_nombre_distribucion_tipo_medida,
            CASE WHEN pdp.n_id_producto IS NOT NULL THEN 1 ELSE 0 END AS actualizar,
            pdp.f_valor_porcentaje,
            pdp.f_precio_estatico
        FROM producto p
        INNER JOIN tipo_medida tp on tp.n_id_tipo_medida = p.n_id_tipo_medida and tp.b_estado = 1
        INNER JOIN distribucion_tipo_medida dtm on dtm.n_id_tipo_medida = tp.n_id_tipo_medida and dtm.b_estado = 1
        LEFT OUTER JOIN porcentaje_distribucion_producto pdp on pdp.n_id_distribucion_tipo_medida = dtm.n_id_distribucion_tipo_medida and pdp.n_id_producto = p.n_id_producto
        WHERE p.n_id_producto = ${n_id_producto_asociado}
        ORDER BY dtm.n_orden ASC
        `;
    
    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
        response2:null,
        response3:null,
    };
    try{
        let response1 = await dbAll(query1);
        let response2 = await dbAll(query2);
        let response3 = await dbAll(query3);

        body.response1 = response1;
        body.response2 = response2;
        body.response3 = response3;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }
}

const CambiarPorcentajeGrupal =  async (request) =>{
        //QUERYS
        let lista_productos = request.body.lista_productos;
        let n_id_grupo = request.body.n_id_grupo;
        let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;
        let f_valor_porcentaje = request.body.f_valor_porcentaje;
        /* console.log(" lista_productos => ", lista_productos);
        console.log(" n_id_grupo => ", n_id_grupo);
        console.log(" n_id_distribucion_tipo_medida => ", n_id_distribucion_tipo_medida); */
        let query1 = `UPDATE porcentaje_distribucion_producto
            SET f_valor_porcentaje = ${f_valor_porcentaje}
            WHERE n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida} AND n_id_grupo = ${n_id_grupo} AND  n_id_producto in (${lista_productos})
            `;

        /* let query1 = "SELECT * FROM porcentaje_distribucion_producto"; */
        
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

const getProductoLike= async (request)=> {
    
    //QUERYS
    let c_nombre_producto = request.body.c_nombre_producto;
    let query1 = `SELECT n_id_producto, c_nombre_producto || ' ' ||c_detalle_primario_producto as nombreProductoAsociado  FROM producto WHERE b_estado = 1 and c_nombre_producto like '%${c_nombre_producto}%'`;
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

const getRepetidoCodigoXGrupo= async (request)=> {
    
    //QUERYS
    let c_codigo_producto = request.body.c_codigo_producto;
    let n_id_grupo = request.body.n_id_grupo;
    let n_id_producto = request.body.n_id_producto;

    let query1 = `SELECT c_codigo_producto FROM producto WHERE b_estado = 1 and c_codigo_producto = '${c_codigo_producto}' and n_id_grupo = ${n_id_grupo} and n_id_producto <> ${n_id_producto}`;
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


const getProductoSegunMedidaYDistribucion = async (request)=> {
    
    //QUERYS
    let n_id_grupo = request.body.n_id_grupo;
    let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;
    
    let query1 = `SELECT 
    producto.n_id_producto,
    producto.n_id_tipo_medida,
    producto.b_igv_producto,
    producto.b_dolar_producto,
    producto.n_id_grupo,
    distribucion_tipo_medida.f_distribucion_tipo_medida,
    porcentaje_distribucion_producto.n_id_distribucion_tipo_medida,
    producto.c_nombre_producto,
    producto.c_detalle_primario_producto,
    distribucion_tipo_medida.c_nombre_distribucion_tipo_medida,
    producto.f_precio_producto,
    porcentaje_distribucion_producto.f_valor_porcentaje,
    porcentaje_distribucion_producto.f_precio_estatico
    FROM producto
    INNER JOIN distribucion_tipo_medida on distribucion_tipo_medida.n_id_tipo_medida = producto.n_id_tipo_medida 
    INNER JOIN porcentaje_distribucion_producto ON porcentaje_distribucion_producto.n_id_distribucion_tipo_medida = distribucion_tipo_medida.n_id_distribucion_tipo_medida AND producto.n_id_producto = porcentaje_distribucion_producto.n_id_producto AND producto.n_id_grupo = porcentaje_distribucion_producto.n_id_grupo
    WHERE producto.n_id_grupo = ${n_id_grupo} AND porcentaje_distribucion_producto.n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida} AND producto.b_estado = 1`;
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

        //let lista = separarPorTipoUnidadProducos(response1);
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

const getPedidoProducto = async (request)=> {
    let n_id_grupo = request.body.n_id_grupo || null;
    //QUERYS
    let query1 = `
    SELECT 
        p.n_id_producto,
        p.n_id_tipo_medida,
        p.n_id_grupo,
        p.n_id_proveedor,
        p.c_codigo_producto,
        p.c_nombre_producto,
        p.c_detalle_primario_producto,
        p.c_descripcion_producto,
        p.f_precio_producto,
        p.b_igv_producto,
        p.b_dolar_producto,
        p.b_par_producto,
        tp.c_nombre_tipo_medida,
        p.n_cantidad_viene_producto,
        p.n_precio_por_cantidad_viene_producto,
        p.n_id_producto_asociado,
        ps.c_nombre_producto || ps.c_detalle_primario_producto  as nombreProductoAsociado,
        p.c_color,
        p.n_stock1,
        p.n_stock2,
        p.n_stock3,
        p.c_fec_actu_stock1,
        p.c_fec_actu_stock2,
        p.c_fec_actu_stock3,
        p.n_pedido1,
        p.n_pedido2,
        p.n_pedido3,
        p.c_fec_actu_pedido1,
        p.c_fec_actu_pedido2,
        p.c_fec_actu_pedido3,
        p.n_activo,
        p.c_descripcion_pedido,
        g.c_nombre_grupo
    FROM 
    producto p
    LEFT JOIN tipo_medida tp on tp.n_id_tipo_medida = p.n_id_tipo_medida and tp.b_estado = 1
    LEFT JOIN grupo g on g.n_id_grupo = p.n_id_grupo and g.b_estado = 1
    LEFT JOIN producto ps on p.n_id_producto_asociado = ps.n_id_producto
    WHERE (${n_id_grupo} IS NULL OR p.n_id_grupo = ${n_id_grupo})
    and (p.n_pedido1 != 0 OR p.n_pedido2 != 0 OR p.n_pedido3 != 0)
    and p.b_estado = 1`;
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

const saveStockTmp = async (request)=> {
    //QUERYS
    let n_id_producto = request.body.n_id_producto;
    let n_stock1 = request.body.n_stock1;
    let n_stock2 = request.body.n_stock2;
    let n_stock3 = request.body.n_stock3;

    let query1 = `UPDATE producto SET n_stock1 = '${n_stock1}', n_stock2 = '${n_stock2}', n_stock3 = '${n_stock3}' WHERE n_id_producto = ${n_id_producto}`;

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

const getProductByTipoMedidaDistribucion = async (request)=> {
    //QUERYS
    let n_id_grupo = request.body.n_id_grupo;
    let n_id_tipo_medida = request.body.n_id_tipo_medida;

    let query1 = `SELECT
            dt.n_id_distribucion_tipo_medida, 
            dt.c_nombre_distribucion_tipo_medida
        FROM tipo_medida t
        INNER JOIN distribucion_tipo_medida dt ON dt.n_id_tipo_medida = t.n_id_tipo_medida
        WHERE dt.n_id_tipo_medida  = ${n_id_tipo_medida}
        ORDER BY dt.n_orden ASC`;

    let query2 = `SELECT  
            p.n_id_producto,
            p.c_nombre_producto,
            p.c_detalle_primario_producto,
            p.f_precio_producto,
            p.b_igv_producto,
            p.b_dolar_producto,
            dt.c_nombre_distribucion_tipo_medida,
            dt.f_distribucion_tipo_medida,
            pdp.f_valor_porcentaje,
            pdp.f_precio_estatico
        FROM 
            producto p
        INNER JOIN tipo_medida t ON t.n_id_tipo_medida = p.n_id_tipo_medida
        INNER JOIN distribucion_tipo_medida dt ON dt.n_id_tipo_medida = t.n_id_tipo_medida
        INNER JOIN porcentaje_distribucion_producto pdp ON pdp.n_id_distribucion_tipo_medida = dt.n_id_distribucion_tipo_medida AND pdp.n_id_producto = p.n_id_producto AND pdp.n_id_grupo = p.n_id_grupo
        WHERE
        p.n_activo = 1
        AND
        p.n_id_tipo_medida = ${n_id_tipo_medida}
        AND
        p.n_id_grupo = ${n_id_grupo}
        ORDER BY p.n_id_producto, dt.n_orden ASC`;

    let query3 = `SELECT c_valor_constante FROM constantes WHERE c_valor_id_constante = 'TX_ID_DOLAR' and b_estado = 1`;
    let query4 = `SELECT c_valor_constante FROM constantes WHERE c_valor_id_constante = 'TX_ID_IGV' and b_estado = 1`;

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
        let response3 = await dbAll(query3);
        let response4 = await dbAll(query4);

        

        //LOGICA
        let dolar = parseFloat(response3[0].c_valor_constante);
        let igv = parseFloat(response4[0].c_valor_constante);

        // Extraer nombres de distribuciones ordenados
        let distribuciones = response1.map(row => ({
            nombre: row.c_nombre_distribucion_tipo_medida,
            valor: row.n_id_distribucion_tipo_medida
        }));
        
        // Construir cabecera con orden correcto
        let header = [{'nombre':'NOMBRE - DETALLE', 'valor': 0}];
        distribuciones.forEach(d => {
            header.push({'nombre':d.nombre + ' PORCENTAJE', 'valor':d.valor});                 // f_valor_porcentaje
            header.push({'nombre':d.nombre + ' ESTATICO', 'valor':d.valor});   // f_precio_estatico
            header.push({'nombre':d.nombre + ' PRECIO', 'valor':d.valor});     // Nueva columna con el precio calculado
        });
    
        // Agrupar productos en un Map
        let productosMap = new Map();
    
        response2.forEach(row => {
            let key = row.n_id_producto;
            if (!productosMap.has(key)) {
                let precioProducto = row.f_precio_producto;
    
                // Conversión a dólares
                if (row.b_dolar_producto) {
                    precioProducto *= dolar;
                }
    
                // Aplicar IGV si no tiene
                if (!row.b_igv_producto) {
                    precioProducto = precioProducto + precioProducto * igv;
                }
    
                productosMap.set(key, {
                    n_id_producto: row.n_id_producto,
                    c_nombre_producto: row.c_nombre_producto + ' - ' + row.c_detalle_primario_producto,
                    precioBase: precioProducto,
                    valores: {}
                });
            }
    
            let producto = productosMap.get(key);
            let f_distribucion_tipo_medida = row.f_distribucion_tipo_medida;
            let f_valor_porcentaje = row.f_valor_porcentaje;
    
            // Asignar valores
            producto.valores[row.c_nombre_distribucion_tipo_medida + ' PORCENTAJE'] = row.f_valor_porcentaje;
            producto.valores[row.c_nombre_distribucion_tipo_medida + ' ESTATICO'] = row.f_precio_estatico;
    
            // Calcular nuevo precio según la lógica del front
            let f_valor_venta = Math.ceil((producto.precioBase * f_distribucion_tipo_medida +
                producto.precioBase * f_distribucion_tipo_medida * f_valor_porcentaje) * 10) / 10;
    
            producto.valores[row.c_nombre_distribucion_tipo_medida + ' PRECIO'] = parseFloat(f_valor_venta.toFixed(2));
        });
    
        // Convertir a estructura de filas con el orden correcto
        let rows = Array.from(productosMap.values()).map(producto => {
            let row = [
                producto.n_id_producto,
                producto.c_nombre_producto
            ];
    
            // Insertar valores en el orden de las distribuciones
            distribuciones.forEach(d => {
                row.push(producto.valores[d.nombre + ' PORCENTAJE'] || '');                // f_valor_porcentaje
                row.push(producto.valores[d.nombre + ' ESTATICO'] || '');  // f_precio_estatico
                row.push(producto.valores[d.nombre + ' PRECIO'] || '');    // f_valor_venta calculado
            });
    
            return row;
        });

        body.response1 = header;
        body.response2 = rows;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

const updatePorcentajeDistribucionProductoEstaticoOrPorcentaje = async (request)=> {
    //QUERYS
    //console.log("entro, " , request.body);
    let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;
    let n_id_producto = request.body.n_id_producto;
    let n_id_grupo = request.body.n_id_grupo;
    let f_valor = request.body.f_valor;
    let c_tipo = request.body.c_tipo;

    let query1 = '';
    if(c_tipo == 'ESTATICO'){
        query1 = `UPDATE porcentaje_distribucion_producto SET f_precio_estatico = ${f_valor}
        WHERE n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida} AND n_id_producto = ${n_id_producto} AND n_id_grupo =  ${n_id_grupo}`;
    }else{
        query1 = `UPDATE porcentaje_distribucion_producto SET f_valor_porcentaje = ${f_valor}
        WHERE n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida} AND n_id_producto = ${n_id_producto} AND n_id_grupo =  ${n_id_grupo}`;
    }
    
    
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
    getProducto,
    getProductoXNombre,
    getDatesForEdit,
    saveProducto,
    updateProducto,
    deleteProducto,
    updateDescripcionPedido,
    changeActivo,
    updateSotck,
    updatePedido,
    updatePedidoSegunStock,
    savePorcentajeDistribucionProducto,
    updatePorcentajeDistribucionProducto,
    getDetalleProducto,
    CambiarPorcentajeGrupal,
    getProductoLike,
    getProductoSegunMedidaYDistribucion,
    getRepetidoCodigoXGrupo,
    getPedidoProducto,
    saveStockTmp,
    getProductByTipoMedidaDistribucion,
    updatePorcentajeDistribucionProductoEstaticoOrPorcentaje
}