import { prisma } from "../db.js";

export class IncidentsService {

    #response = false;

    async #generateIncidentCode() {
        const lastIncident = await prisma.incidents.findFirst({
            orderBy: {
                record_date: 'desc'
            }
        })

        return lastIncident.incident_id
    }

    async last() {
        const lastId = await this.#generateIncidentCode();
        let parts = lastId.split("-")
        let numbers = parseInt(parts[1])
        const nextNumber = numbers + 1
        const lenNumber = nextNumber.toString().length
        let newNumber = "";

        for (let i = 0; i <= (6 - (lenNumber + 1)); i++) {
            newNumber += "0"
        }

        return parts[0] + "-" + newNumber + nextNumber;
    }

    async lastDiagnoseId() {
        const lastId = await prisma.diagnosis.findFirst({
            orderBy: {
                diagnosis_date: 'desc'
            }
        })
        return lastId.diagnosis_id;
    }

    async createIncident(req) {
        try {
            await prisma.incidents.create({
                data: {
                    ...req.body,
                    incident_id: await this.last(),
                    record_date: new Date().toISOString()
                }
            })
            this.#response = true;
        } catch (error) {
            console.log(error)
            this.#response = false;
        }

        return this.#response;
    }

    async diagnoseIncidence(req) {
        try {
            await prisma.diagnosis.create({
                data: {
                    ...req.body,
                    incident_id: req.query.incidentId,
                    estimated_time: parseInt(req.body.tiempoEstimado),
                    diagnosis_date: new Date().toISOString()
                }
            })
            this.#response = true;
        } catch (error) {
            console.log(error);
            this.#response = false;
        }
        return this.#response;
    }

    async getIncidences(req) {
        try {
            let incidences = []
            if(req.query.user_dni==""){
                incidences = await prisma.incidents.findMany(
                    {
                        where: {
                            user_dni: req.query.idUsuario
                        },
                        select: {
                            incident_id: true,
                            name: true,
                            status: true
                        },
    
                    }
                );
            }else{
                incidences = await prisma.incidents.findMany(
                    {
                        select: {
                            incident_id: true,
                            name: true,
                            status: true
                        },
    
                    }
                );
            }

            return incidences;
        } catch (error) {
            this.#response = false;
        }
    }

    async getAllIncidences(req) {
        
        try {
            let incidences = {};
            
            if (req.query.rol_id == 2) { // it was named rol
                incidences = await prisma.incidents.findMany(
                    {
                        where: {
                            status_id: {
                                not: 10
                            }
                        },
                        select: {
                            incident_id: true,
                            name: true,
                            status: true
                        },

                    }
                );
            } else if (req.query.rol_id == 4) {
                
                incidences = await prisma.incidents.findMany(
                    {
                        select: {
                            incident_id: true,
                            name: true,
                            status: true
                        },
                    }
                );
            }
            return incidences;
        } catch (error) {
            this.#response = false;
        }
    }

    async setIncidenceToTechnician(req) {
        try {
            await prisma.user_x_incident.create(
                {
                    data: {
                        ...req.body,
                        assign_dateMa: new Date().toISOString()
                    }
                }
            )
            this.#response = true;
        } catch (error) {
            this.#response = false;
        }
        return this.#response;
    }

    async getIncidence(req) {
        try {
            const incident = await prisma.incidents.findFirst(
                {
                    where: {
                        incident_id: req.query.incident_id
                    },
                    select: {
                        incident_id: true,
                        name: true,
                        status: true,
                        priority: true,
                        category: true,
                        risk: true,
                        effect: true,
                        record_date: true,
                        cost: true,
                        time_to_solve: true,
                        incident_place: true,
                        diagnosis: true
                    },

                }
            );
            return incident;
        } catch (error) {
            return this.#response = false;
        }
    }

    async updateCategoriesIncident(req) {

        try {
            const updatedIncident = await prisma.incidents.update({
                where: {
                    incident_id: req.params.incident_id
                },
                data: {
                    status_id: parseInt(req.body.status_id),
                    effect_id: parseInt(req.body.effect_id),
                    risk_id: parseInt(req.body.risk_id),
                    prority_id: parseInt(req.body.priority_id),
                }
            })
            return updatedIncident;
        } catch (error) {

            return this.#response = false;
        }
    }

    async gettingStatusFromIncidence(idIncidencia) {
        try {
            const incident = await prisma.incidents.findFirst(
                {
                    where: {
                        incident_id: incident_id
                    },
                    select: {
                        status: true,
                    },

                }
            );
            return incident;
        } catch (error) {
            return this.#response = false;
        }
    }

    async saveStatusBinnacle(object) {

        try {
            const new_log = await prisma.log_change_status_incident.create(
                {
                    data: {
                        ...object
                    }
                }
            )
            return new_log
        } catch (error) {
            this.#response = false;
        }
        return this.#response;
    }

    async changeStatusIncident(req) {
        try {
            const currentlyStatus = await this.gettingStatusFromIncidence(req.params.incident_id);
            const updateIncident = await prisma.incidents.update({
                where: {
                    incident_id: req.params.incident_id
                },
                data: {
                    status_id: parseInt(req.body.status_id),
                }
            })
            await this.saveStatusBinnacle({
                incident_id: req.params.incident_id,
                change_date: new Date().toISOString(),
                previous_state: currentlyStatus.Estado.previous_state,
                current_state: parseInt(req.body.current_state),
                user_dni: req.body.user_dni
            })
            return updateIncident;

        } catch (error) {
            return this.#response = false;
        }
    }

    async closeIncidence(req) {
        try {
            const updateIncident = await prisma.incidents.update({
                where: {
                    incident_id: req.params.incident_id
                },
                data: {
                    close_justification: req.body.close_justification,
                }
            })
            return updateIncident;
        } catch (error) {
            return this.#response = false;
        }
    }

    async getOneDiagnose(req) {
        try {
            const diagnosis = await prisma.diagnosis.findFirst({
                where: {
                    diagnosis_id: parseInt(req.params.diagnosis_id)
                }, select: {
                    diagnosis_id: true,
                    diagnosis_date: true,
                    diagnosis: true,
                    estimated_time: true,
                    observation: true,
                    buy: true
                }
            })
            return diagnosis;
        } catch (error) {
            return this.#response = false;
        }
    }

    async setCost(req) {
        try {
            const updatedIncident = await prisma.incidents.update({
                where: {
                    incident_id: req.params.incident_id
                },
                data: {
                    cost: parseInt(req.body.cost),
                }
            })
            return updatedIncident;
        } catch (error) {
            return this.#response = false;
        }
    }

    async closeIncidence(req) {
        try {
            const closedIncident = await prisma.incidents.update({
                where: {
                    incident_id: req.params.incident_id
                },
                data: {
                    close_justification: req.body.close_justification,
                }
            })

            return closedIncident;
        } catch (error) {
            return this.#response = false;
        }
    }

  
}