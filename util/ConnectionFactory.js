const {Pool} = require('pg');

module.exports = class ConnectionFactory{
    static getConnection(){
        return new Pool({
            user:'postgres',
            host:'localhost',
            database:'TCC',
            password:'****',
            port:5432
        });
    }
}