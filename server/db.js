const Pool = require("pg").Pool;

const pool = new Pool({
    user : "sparta",
    password : "sparta@123",
    host : "localhost",
    port : 5432,
    database : "phonebookdb"
});

module.exports = pool;
