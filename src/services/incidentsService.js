import { connect } from "http2";
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
            console.log(req.body)
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

    async saveCreatedImages(req) {
        const lastId = await this.#generateIncidentCode();
        try {
            await prisma.t_imagenes.create(
                {
                    data: {
                        rutaImagen: `/images/${req.file.filename}`,
                        tipoImagen: false,
                        idIncidencia: lastId
                    }
                }
            )
            this.#response = true;
        } catch (error) {
            console.log(error)
            this.#response = false;
        }
        return this.#response;
    }

    async saveDiagnoseImages(req) {
        const lastId = await this.#generateIncidentCode();
        try {
            await prisma.t_imagenes.create(
                {
                    data: {
                        rutaImagen: `/images/${req.file.filename}`,
                        tipoImagen: true,
                        idIncidencia: lastId,
                        idDiagnostico: await this.lastDiagnoseId()
                    }
                }
            )
            this.#response = true;
        } catch (error) {
            console.log(error)
            this.#response = false;
        }
        return this.#response;
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

    async chargeWorkReport() {
        try {
            const result = await prisma.$queryRaw`
            SELECT 
    CONCAT(t_usuarios.ct_nombre, " ", t_usuarios.ct_apellido_uno, " ", t_usuarios.ct_apellido_dos) AS "nombre", 
    SUM(CASE 
            WHEN t_incidencias.cn_id_estado != 10 
            THEN t_incidencias.cn_duracion_gestion 
            ELSE 0 
        END) AS "horasPendientes",
    SUM(CASE 
            WHEN t_incidencias.cn_id_estado = 10 
            THEN t_incidencias.cn_duracion_gestion 
            ELSE 0 
        END) AS "horasTerminadas",
    t_categorias.ct_descripcion AS "descripcion"
FROM 
    t_usuario_x_incidencia 
INNER JOIN 
    t_incidencias ON t_usuario_x_incidencia.ct_codigo_incidencia = t_incidencias.ct_codigo_incidencia
INNER JOIN 
    t_usuarios ON t_usuarios.ct_cedula = t_usuario_x_incidencia.ct_cedula_usuario
INNER JOIN 
	t_categorias ON t_categorias.cn_id_categoria = t_incidencias.cn_id_categoria
GROUP BY 
	t_incidencias.cn_id_categoria;`
    return result   
        } catch (error) {
            return this.#response = false;
        }
    }
}