const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); 

let incidents = [];
let nextId = 1;

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

app.post("/incidents", (req, res) => {
    const { reporter, description } = req.body;

    // Validaciones
    if (!reporter) {
        return res.status(400).json({ error: "El campo 'reporter' es obligatorio." });
    }
    if (!description || description.length < 10) {
        return res.status(400).json({ error: "La descripción debe tener al menos 10 caracteres." });
    }

    const newIncident = {
        id: nextId++,
        reporter,
        description,
        status: "pendiente",
        created_at: new Date().toISOString().split("T")[0],
    };

    incidents.push(newIncident);
    res.status(201).json(newIncident);
});


app.put("/incidents/:id", (req, res) => {
    const { status } = req.body;
    const incident = incidents.find(i => i.id === parseInt(req.params.id));

    if (!incident) {
        return res.status(404).json({ error: "Incidente no encontrado" });
    }

    if (!["pendiente", "en proceso", "resuelto"].includes(status)) {
        return res.status(400).json({ error: "Estado inválido. Debe ser 'pendiente', 'en proceso' o 'resuelto'." });
    }

    incident.status = status;
    res.json(incident);
});


app.delete("/incidents/:id", (req, res) => {
    const incidentIndex = incidents.findIndex(i => i.id === parseInt(req.params.id));

    if (incidentIndex === -1) {
        return res.status(404).json({ error: "Incidente no encontrado" });
    }

    const deletedIncident = incidents.splice(incidentIndex, 1);
    res.json({ message: "Incidente eliminado correctamente", incident: deletedIncident });
});


// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


