import { Router } from "express";
import { IncidentsController } from "../controllers/incidents.controller.js";
import { body, query } from "express-validator";
import multer from "multer";
import { storage } from "../middlewares/imagesMiddleware.js";
const upload = multer({ storage })
/*import { autorizacionMiddleware } from "./middlewares.js";*/

const routerIncidents = Router();
const controller = new IncidentsController;

// POST routes
routerIncidents.post('/incidents/create', controller.createIncident, [body('nombre').notEmpty().isString()]); // ✅
routerIncidents.post('/incidents/diagnose', controller.createDiagnose,[body('tiempoEstimado').notEmpty().isNumeric()]); // ✅
routerIncidents.post('/incidents/assign', controller.assignIncidence);
routerIncidents.post('/incidents/images', upload.single('file'), controller.saveImageCreated);
routerIncidents.post('/incidents/images/diagnose', upload.single('file'), controller.saveImageDiagnose);
routerIncidents.post('/incidents/statusBinnacle/create', controller.saveStatusBinnacle);

// Update routes
routerIncidents.patch('/incidents/updateCategories/:codigoIncidencia', controller.updateCategories);
routerIncidents.put('/incidents/updateStatus/:codigoIncidencia', controller.updateStatus);
routerIncidents.patch('/incidents/changeStatus/:codigoIncidencia', controller.updateStatus);
routerIncidents.patch('/incidents/changeCost/:codigoIncidencia', controller.updateCost);
routerIncidents.patch('/incidents/close/:codigoIncidencia', controller.updateClose);

// GET routes
routerIncidents.get('/incidents/byUser', controller.getIncidences); // ✅
routerIncidents.get('/incidents/one', controller.getIncidence); // ✅
routerIncidents.get('/incidents', controller.getAllIncidences); // ✅
routerIncidents.get('/incidents/diagnose/one/:codigoDiagnostico', controller.getDiagnose);
routerIncidents.get('/incidents/report', controller.getReport);


export default routerIncidents;
