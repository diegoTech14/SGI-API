import { IncidentsService } from "../services/incidentsService.js";

    export class IncidentsController{
        //Global variable for return a response
        #response;

        constructor(){
            this.service = new IncidentsService();
        }

        createIncident = async (req, res) => {
            const incidentCreated = await this.service.createIncident(req)
            return (incidentCreated) ? this.#response = res.status(200).json(incidentCreated) : this.#response = res.status(500).json({})
        }

        createDiagnose = async (req, res) => {
            const diagnoseCreated = await this.service.diagnoseIncidence(req)
            return (diagnoseCreated) ? this.#response = res.status(200).json(diagnoseCreated) : this.#response = res.status(500).json({})
        }

        getIncidences = async (req, res) => {
            const allIncidences = await this.service.getIncidences(req);
            return (allIncidences) ? this.#response = res.status(200).json(allIncidences) : this.#response = res.status(200).json([])
        }

        saveImageCreated = async(req, res) => {
            const saveImage = await this.service.saveCreatedImages(req);
            return (saveImage) ? this.#response = res.status(200).json(saveImage) : this.#response = res.status(500).json([])
        }

        saveImageDiagnose = async(req, res) => {
            const diagnoseImage = await this.service.saveDiagnoseImages(req);
            return (diagnoseImage) ? this.#response = res.status(200).json(diagnoseImage) : this.#response = res.status(500).json([])
        }
        
        getIncidence = async(req, res) => {
            const incidence = await this.service.getIncidence(req);
            return (incidence) ? this.#response = res.status(200).json(incidence) : this.#response = res.status(200).json([])
        }

        assignIncidence = async(req, res) => {
            const assigned = await this.service.setIncidenceToTechnician(req);
            return (assigned) ? this.#response = res.status(200).json(assigned) : this.#response = res.status(500).json([])    
        }

        getAllIncidences = async(req, res) => {
            const incidences = await this.service.getAllIncidences(req);
            console.log(incidences)
            return (incidences) ? this.#response = res.status(200).json(incidences) : this.#response = res.status(200).json([])    
        }

        updateCategories = async(req, res) => {
            const updatedCategories = await this.service.updateCategoriesIncident(req);
            return (updatedCategories) ? this.#response = res.status(200).json(updatedCategories) : this.#response = res.status(500).json([])
        }

        updateStatus = async(req, res) => {
            const updatedStatus = await this.service.changeStatusIncident(req);
            return (updatedStatus) ? this.#response = res.status(200).json(updatedStatus) : this.#response = res.status(500).json([])
        }

        updateCost = async(req, res) => {
            const updateCostIncidence = await this.service.setCost(req);
            return (updateCostIncidence) ? this.#response = res.status(200).json(updateCostIncidence) : this.#response = res.status(500).json([])
        }

        updateClose = async(req, res) => {
            const updateCloseIncidence = await this.service.closeIncidence(req);
            return (updateCloseIncidence) ? this.#response = res.status(200).json(updateCloseIncidence) : this.#response = res.status(500).json([])
        }

        getDiagnose = async(req, res) => {
            const diagnose = await this.service.getOneDiagnose(req);
            return (diagnose) ? this.#response = res.status(200).json(diagnose) : this.#response = res.status(200).json([])
        }

        saveStatusBinnacle = async (req, res) => {
            const statusBinnacle = await this.service.saveStatusBinnacle(req)
            return (statusBinnacle) ? this.#response = res.status(200).json(statusBinnacle) : this.#response = res.status(500).json({})
        }
        getReport = async(req, res) => {
            const report = await this.service.chargeWorkReport(req);
            return (report) ? this.#response = res.status(200).json(report) : this.#response = res.status(200).json([])    
        }

        
    }