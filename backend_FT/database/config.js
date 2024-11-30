const  Pool  = require('pg').Pool
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const pool = new Pool({

    user: 'postgres',
    host: 'localhost',
    database: 'ft_v3',
    password: '123',
    port: 5432,

});

//const sqlFile = fs.readFileSync('bd/ft_backup_v3.sql', 'utf8');

const db = new sqlite3.Database('bd/ft_v1.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        //console.log('Conectado a la base de datos SQLite.');
    }
});

module.exports={
    pool,
    db
}