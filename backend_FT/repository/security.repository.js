const { pool, db } = require('../database/config');
const util = require('util');
const dbAll = util.promisify(db.all).bind(db);

const validateCredentials= async (request)=> {
    let c_user = request.body.c_user;
    let c_password = request.body.c_password;
    //QUERYS
    let query1 = `SELECT c_user, c_password FROM user WHERE c_user = '${c_user}' AND c_password = '${c_password}'`;
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
    validateCredentials
}