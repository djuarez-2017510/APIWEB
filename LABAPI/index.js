const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); 

// Datos de prueba
const incidents = [
    { id: 1, reporter: "Juan Perez", description: "La impresora se traba", status: "pendiente", created_at: "2025-01-01" },
    { id: 2, reporter: "Pedro Lopez", description: "La computadora tira pantallazo azul", status: "en proceso", created_at: "2025-01-02" }
];

// Obtenemos los datos de prueba 
app.get("/incidents", (req, res) => {
    res.json(incidents);
});

// Obtenemos los datos por medio de su id
app.get("/incidents/:id", (req, res) => {
    const incident = incidents.find(i => i.id === parseInt(req.params.id));
    if (!incident) {
        return res.status(404).json({ error: "Incidente no encontrado" });
    }
    res.json(incident);
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
