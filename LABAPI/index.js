const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Client } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a PostgreSQL
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

// Ruta GET para obtener todos los incidentes
app.get("/incidents", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM incidents");
    res.json(result.rows); // Devuelve los datos desde la base de datos
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los incidentes" });
  }
});


// Ruta GET para obtener un incidente por su id
app.get("/incidents/:id", async (req, res) => {
  const incidentId = req.params.id;

  try {
    const result = await client.query("SELECT * FROM incidents WHERE id = $1", [incidentId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Incidente no encontrado" });
    }
    res.json(result.rows[0]); // Devuelve el incidente encontrado
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el incidente" });
  }
});

// Ruta POST para crear un nuevo incidente
app.post("/incidents", async (req, res) => {
    const { reporter, description} = req.body;
  
    if (!reporter || !description || description.length < 10) {
      return res.status(400).json({ error: "Datos inválidos." });
    }
  
    try {
      const query = "INSERT INTO incidents (reporter, description) VALUES ($1, $2) RETURNING *";
      const values = [reporter, description];
  
      const result = await client.query(query, values);
      const newIncident = result.rows[0];
  
      res.status(201).json(newIncident); // Devuelve el incidente creado
    } catch (err) {
      console.error("Error al crear el incidente:", err);
      res.status(500).json({ error: "Error en el servidor." });
    }
  });
  

// Ruta PUT para actualizar el estado de un incidente
app.put("/incidents/:id", async (req, res) => {
    const incidentId = req.params.id;
    const { status } = req.body;
  
    const validStatuses = ["pendiente", "en proceso", "resuelto"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Estado inválido. Los estados válidos son 'pendiente', 'en proceso', o 'resuelto'" });
    }
  
    try {
      const result = await client.query(
        "UPDATE incidents SET status = $1 WHERE id = $2 RETURNING *",
        [status, incidentId]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Incidente no encontrado" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error al actualizar el incidente:", err);
      res.status(500).json({ error: "Error al actualizar el incidente" });
    }
  });


// Ruta DELETE para eliminar un incidente
app.delete("/incidents/:id", async (req, res) => {
    const incidentId = req.params.id;
  
    try {
      const result = await client.query("DELETE FROM incidents WHERE id = $1 RETURNING *", [incidentId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Incidente no encontrado" });
      }


      
    } catch (err) {
      console.error("Error al eliminar el incidente:", err);
      res.status(500).json({ error: "Error al eliminar el incidente" });
    }
  });


// Puerto para el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});