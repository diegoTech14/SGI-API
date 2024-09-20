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





    async setIncidenceToTechnician(req) { // END MY WORK
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
            const incidence = await prisma.t_incidencias.findFirst(
                {
                    where: {
                        codigoIncidencia: req.query.idIncidence
                    },
                    select: {
                        codigoIncidencia: true,
                        nombre: true,
                        Estado: true,
                        Prioridad: true,
                        Categoria: true,
                        Riesgo: true,
                        Afectacion: true,
                        fechaRegistro: true,
                        costo: true,
                        duracionGestion: true,
                        lugarIncidencia: true,
                        imagenes: true,
                        diagnostico: true
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
            const updatedIncident = await prisma.t_incidencias.update({
                where: {
                    codigoIncidencia: req.params.codigoIncidencia
                },
                data: {
                    idEstado: parseInt(req.body.idEstado),
                    idAfectacion: parseInt(req.body.idAfectacion),
                    idRiesgo: parseInt(req.body.idRiesgo),
                    idPrioridad: parseInt(req.body.idPrioridad),
                }
            })
            return updatedIncident;
        } catch (error) {

            return this.#response = false;
        }
    }

    async gettingStatusFromIncidence(idIncidencia) {
        try {
            const incidence = await prisma.t_incidencias.findFirst(
                {
                    where: {
                        codigoIncidencia: idIncidencia
                    },
                    select: {
                        Estado: true,
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
            const newRecord = await prisma.t_bitacora_cambio_estado.create(
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
            const currentlyStatus = await this.gettingStatusFromIncidence(req.params.codigoIncidencia);
            const updateIncident = await prisma.t_incidencias.update({
                where: {
                    codigoIncidencia: req.params.codigoIncidencia
                },
                data: {
                    idEstado: parseInt(req.body.idEstado),
                }
            })
            await this.saveStatusBinnacle({
                idIncidencia: req.params.codigoIncidencia,
                fechaCambio: new Date().toISOString(),
                idEstadoAnterior: currentlyStatus.Estado.id,
                idEstadoActual: parseInt(req.body.idEstado),
                idUsuario: req.body.idUsuario
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
                    codigoIncidencia: req.params.codigoIncidencia
                },
                data: {
                    justificacionCierre: req.body.justificacion,
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
            const diagnose = await prisma.t_diagnostico.findFirst({
                where: {
                    codigoDiagnostico: parseInt(req.params.codigoDiagnostico)
                }, select: {
                    codigoDiagnostico: true,
                    fechaDiagnostico: true,
                    diagnostico: true,
                    tiempoEstimado: true,
                    observacion: true,
                    compra: true,
                    imagenes: true
                }
            })
            return diagnose;
        } catch (error) {
            console.log(error)
            return this.#response = false;
        }
    }

    async setCost(req) {
        try {
            const updateIncident = await prisma.t_incidencias.update({
                where: {
                    codigoIncidencia: req.params.codigoIncidencia
                },
                data: {
                    costo: parseInt(req.body.costo),
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
                    codigoIncidencia: req.params.codigoIncidencia
                },
                data: {
                    justificacionCierre: req.body.close,
                }
            })

            return updateIncident;
        } catch (error) {
            console.log(error)
            return this.#response = false;
        }
    }

  
}