import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import { Router } from "express";

const routerDocs = Router();
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "SGI API", version: "1.0.0" }
    },
    apis: ["src/routes/incidents.routes.js", "src/routes/users.routes.js"]
}

//DOC Json format
const swaggerSpec = swaggerJSDoc(options);

// function to setup our docs


routerDocs.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
routerDocs.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
})

export default routerDocs