import { prisma } from "../db.js";

export class IncidentsService {

    #response = false;

    async #generateIncidentCode() {
        const lastIncident = await prisma.t_incidencias.findFirst({
            orderBy: {
                fechaRegistro: 'desc'
            }
        })

        return lastIncident.codigoIncidencia
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
        const lastId = await prisma.t_diagnostico.findFirst({
            orderBy: {
                fechaDiagnostico: 'desc'
            }
        })
        return lastId.codigoDiagnostico;
    }

    async createIncident(req) {
        try {
            await prisma.t_incidencias.create({
                data: {
                    ...req.body,
                    codigoIncidencia: await this.last(),
                    fechaRegistro: new Date().toISOString()
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
            await prisma.t_diagnostico.create({
                data: {
                    ...req.body,
                    idIncidencia: req.query.incidentId,
                    tiempoEstimado: parseInt(req.body.tiempoEstimado),
                    fechaDiagnostico: new Date().toISOString()
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
            if(req.query.idUsuario==""){
                incidences = await prisma.t_incidencias.findMany(
                    {
                        where: {
                            idUsuario: req.query.idUsuario
                        },
                        select: {
                            codigoIncidencia: true,
                            nombre: true,
                            Estado: true
                        },
    
                    }
                );
            }else{
                incidences = await prisma.t_incidencias.findMany(
                    {
                        select: {
                            codigoIncidencia: true,
                            nombre: true,
                            Estado: true
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
            
            if (req.query.rol == 2) {
                incidences = await prisma.t_incidencias.findMany(
                    {
                        where: {
                            idEstado: {
                                not: 10
                            }
                        },
                        select: {
                            codigoIncidencia: true,
                            nombre: true,
                            Estado: true
                        },

                    }
                );
            } else if (req.query.rol == 4) {
                
                incidences = await prisma.t_incidencias.findMany(
                    {
                        select: {
                            codigoIncidencia: true,
                            nombre: true,
                            Estado: true
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
            await prisma.t_usuario_x_incidencia.create(
                {
                    data: {
                        ...req.body,
                        fechaAsignacion: new Date().toISOString()
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
            const incidence = await prisma.incidents.findFirst(
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
            return incidence;
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
                    prority_id: parseInt(req.body.prority_id),
                }
            })
            return updatedIncident;
        } catch (error) {
            return this.#response = false;
        }
    }

    async gettingStatusFromIncidence(idIncidencia) {
        try {
            const incidence = await prisma.incidents.findFirst(
                {
                    where: {
                        incident_id: incident_id
                    },
                    select: {
                        status: true,
                    },

                }
            );
            return incidence;
        } catch (error) {
            return this.#response = false;
        }
    }

    async saveStatusBinnacle(object) {

        try {
            console.log(object)
            const newRecord = await prisma.log_change_status_incident.create(
                {
                    data: {
                        ...object
                    }
                }
            )
            console.log("eee: ", newRecord)
            this.#response = true;
            return newRecord
        } catch (error) {
            console.log(error)
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
                previous_state: currentlyStatus.incident_status.id,
                current_status: parseInt(req.body.current_status),
                user_dni: req.body.user_dni
            })
            return updateIncident;

        } catch (error) {
            console.log(error)
            return this.#response = false;
        }
    }

    async closeIncidence(req) {
        try {
            const updateIncident = await prisma.incidents.update({
                where: {
                    incidents_id: req.params.incidents_id
                },
                data: {
                    close_justification: req.body.close_justification,
                }
            })
            return updateIncident;
        } catch (error) {
            console.log(error)
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
                    buy: true,
                }
            })
            return diagnosis;
        } catch (error) {
            console.log(error)
            return this.#response = false;
        }
    }

    async setCost(req) {
        try {
            const updateIncident = await prisma.incidents.update({
                where: {
                    incident_id: req.params.incident_id
                },
                data: {
                    cost: parseInt(req.body.cost),
                }
            })
            return updateIncident;
        } catch (error) {
            console.log(error)
            return this.#response = false;
        }
    }

    async closeIncidence(req) {
        try {
            const updateIncident = await prisma.t_incidencias.update({
                where: {
                    incident_id: req.params.incident_id
                },
                data: {
                    close_justification: req.body.close_justification,
                }
            })

            return updateIncident;
        } catch (error) {
            console.log(error)
            return this.#response = false;
        }
    }
}