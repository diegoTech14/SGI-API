import express from 'express';
import routerUsers from './routes/users.routes.js';
import routerIncidents from './routes/incidents.routes.js';
import routerDocs from './swagger.js';
import cors from 'cors'; 
const app = express();

app.use(cors());
app.use(express.static('public'))
app.use(express.json());


// Configurar las rutas bajo el prefijo '/api'
app.use('/api', routerUsers);
app.use('/api', routerIncidents);
app.use('/api', routerDocs)

// Manejar 404 - Endpoint no encontrado
app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint Not Found"
    });
});


app.listen(process.env.PORT);

