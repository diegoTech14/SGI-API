import { Router } from "express";
import { IncidentsController } from "../controllers/incidents.controller.js";
import { body, query } from "express-validator";
import multer from "multer";
import { storage } from "../middlewares/imagesMiddleware.js";
const upload = multer({ storage })
/*import { autorizacionMiddleware } from "./middlewares.js";*/

const routerIncidents = Router();
const controller = new IncidentsController;
/**
 * @swagger
 * components:
 *  schemas:
 *    Incidents:
 *      type: object
 *      properties:
 *       nombre:
 *          type: string
 *          description: the incident name
 *      required:
 *          - nombre
 *          - descripcion
 *          - lugarIncidencia
 *          - idUsuario
 *          - idEstado
 *          - justificacionCierre
 *          - costo
 *          - duracionGestion
 *          - idAfectacion
 *          - idRiesgo
 *          - idCategoria
 *          - idPrioridad
 *      example:
 *          nombre: Tuberia dañada  
 *          descripcion: Daño de impresora, no imprime
 *          lugarIncidencia: SGI
 *          idUsuario: 70266019113
 *          idEstado: 1
 *          justificacionCierre: ""
 *          costo: 0
 *          duracionGestion: 0
 *          idAfectacion: 1
 *          idRiesgo: 1
 *          idCategoria: 1
 *          idPrioridad: 1
 *    AllIncidents:
 *      type: object
 *      properties:
 *       rol:
 *          type: int
 *          description: user rol
 *      required:
 *          - rol
 *      example:
 *          rol: 2
 *    IncidencesByUser:
 *      type: object
 *      properties:
 *       idUsuario:
 *          type: string
 *          description: user id
 *      required:
 *          - idUsuario
 *      example:
 *          idUsuario: "702660192"
 *    OneIncide:
 *      type: object
 *      properties:
 *       idUsuario:
 *          type: string
 *          description: user id
 *      required:
 *          - idUsuario
 *      example:
 *          idUsuario: "702660192" 
 */

/**
 * @swagger
 * /api/incidents/create:
 *   post:
 *      summary: create a new incident
 *      tags: [Incidents]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Incidents'
 *      responses:
 *          200:
 *              description: New incident created!
*/
routerIncidents.post('/incidents/create', controller.createIncident,
    [
        body('nombre').notEmpty().isString()
    ]
);
routerIncidents.post('/incidents/diagnose', controller.createDiagnose,
    [
        body('tiempoEstimado').notEmpty().isNumeric()
    ]
);
routerIncidents.post('/incidents/assign', controller.assignIncidence)
routerIncidents.post('/incidents/images', upload.single('file'), controller.saveImageCreated);
routerIncidents.post('/incidents/images/diagnose', upload.single('file'), controller.saveImageDiagnose);
routerIncidents.patch('/incidents/updateCategories/:codigoIncidencia', controller.updateCategories)
routerIncidents.put('/incidents/updateStatus/:codigoIncidencia', controller.updateStatus)
/**
 * @swagger
 * /api/incidents/byUser:
 *   get:
 *     summary: Get all user incidents
 *     tags: [Incidents]
 *     parameters:
 *       - in: query
 *         name: idUsuario
 *         schema:
 *           type: string
 *         description: ID of the user to filter incidents
 *     responses:
 *       200:
 *         description: All incidents by user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IncidencesByUser'
 */

routerIncidents.get('/incidents/byUser', controller.getIncidences);


routerIncidents.get('/incidents/one', controller.getIncidence);

/**
 * @swagger
 * /api/incidents:
 *   get:
 *     summary: Get all incidents
 *     tags: [Incidents]
 *     parameters:
 *       - in: query
 *         name: rol
 *         schema:
 *           type: integer
 *         description: rol of the user to validate the authorization
 *     responses:
 *       200:
 *         description: All incidents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AllIncidents'
 */
routerIncidents.get('/incidents', controller.getAllIncidences);
routerIncidents.get('/incidents/diagnose/one/:codigoDiagnostico', controller.getDiagnose);
routerIncidents.get('/incidents/report', controller.getReport);
routerIncidents.patch('/incidents/changeStatus/:codigoIncidencia', controller.updateStatus);
routerIncidents.patch('/incidents/changeCost/:codigoIncidencia', controller.updateCost);
routerIncidents.patch('/incidents/close/:codigoIncidencia', controller.updateClose);
routerIncidents.post('/incidents/statusBinnacle/create', controller.saveStatusBinnacle);
export default routerIncidents;
