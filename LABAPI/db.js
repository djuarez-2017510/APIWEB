const { Client } = require('pg');
require('dotenv').config(); 


const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT,
  });
  
  client.connect()
    .then(() => console.log("Conexión exitosa a la base de datos"))
    .catch(err => console.error("Error al conectar a la base de datos", err.stack));
  