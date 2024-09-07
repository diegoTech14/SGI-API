import { prisma } from "../db.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export class UsersService {

    #secretKey = process.env.SECRET_KEY;
    #userToken = "";

    async #encriptPassword(password) {
        const saltRounds = 5;
        return await bcrypt.hash(password, saltRounds)
    }

    async #generateToken(userData) {
        const { cedula, nombre } = userData;
        const rol = await prisma.t_usuarios_x_rol.findFirst(
            {
                where: {
                    userId: cedula
                }
            }
        )

        this.#userToken = jwt.sign({
            cedula,
            nombre,
            rol: rol.roleId
        }, this.#secretKey);

        return this.#userToken;
    }

    
    async getUsers() {
        return await prisma.t_usuarios.findMany();
    }

    async login(req) {
        let response = "";
        let comparison = false;
        const userData = await prisma.t_usuarios.findFirst({
            where: {
                correo: req.body.correo
            }
        })
        if (userData) {
            comparison = await bcrypt.compare(
                req.body.contrasena,
                userData.contrasena
            )
        }
        return response = (comparison) ? this.#generateToken(userData) : ""
    }

    async createUser(req) {
        let response = false;
        try {
            await prisma.t_usuarios.create({
                data: {
                    ...req.body,
                    contrasena: await this.#encriptPassword(req.body.contrasena)
                }
            })
            response = true;
        } catch (error) {
            response = false;
        }
        return response;
    }


    async usersIncidences() {
        let response = false;

        try {
            const results = await prisma.$queryRaw`
SELECT 
	CONCAT(t_usuarios.ct_nombre, " ", t_usuarios.ct_apellido_uno, " ", t_usuarios.ct_apellido_dos) AS 'nombre',
    SUM(t_incidencias.cn_duracion_gestion) AS 'horas' FROM t_incidencias
right JOIN t_usuario_x_incidencia ON t_usuario_x_incidencia.ct_codigo_incidencia = t_incidencias.ct_codigo_incidencia 
right JOIN t_usuarios ON t_usuario_x_incidencia.ct_cedula_usuario = t_usuarios.ct_cedula
WHERE t_incidencias.cn_id_estado != 10
GROUP BY t_usuarios.ct_cedula

UNION ALL 

SELECT 
	CONCAT(t_usuarios.ct_nombre, " ", t_usuarios.ct_apellido_uno, " ", t_usuarios.ct_apellido_dos) AS 'Nombre',
    0 'total de horas' FROM t_usuarios WHERE t_usuarios.ct_cedula NOT IN (SELECT DISTINCT t_usuario_x_incidencia.ct_cedula_usuario FROM t_usuario_x_incidencia)`;
            return results;
        } catch (error) {
            response = false;
        }
        return response;
    }

    async usersRol() {
        let response = false;
        try {
            const results = await prisma.$queryRaw`
            SELECT 
                t_usuarios.ct_cedula AS 'cedula',
                CONCAT(t_usuarios.ct_nombre, " ", t_usuarios.ct_apellido_uno, " ", t_usuarios.ct_apellido_dos) AS 'nombre',
                SUM(t_incidencias.cn_duracion_gestion) AS 'horas' FROM t_incidencias
            right JOIN t_usuario_x_incidencia ON t_usuario_x_incidencia.ct_codigo_incidencia = t_incidencias.ct_codigo_incidencia 
            right JOIN t_usuarios ON t_usuario_x_incidencia.ct_cedula_usuario = t_usuarios.ct_cedula
            WHERE t_incidencias.cn_id_estado != 10
            GROUP BY t_usuarios.ct_cedula
            
            UNION ALL 
            
            SELECT
                t_usuarios.ct_cedula AS 'cedula',
                CONCAT(t_usuarios.ct_nombre, " ", t_usuarios.ct_apellido_uno, " ", t_usuarios.ct_apellido_dos) AS 'Nombre',
                0 'total de horas' FROM t_usuarios WHERE t_usuarios.ct_cedula NOT IN (SELECT DISTINCT t_usuario_x_incidencia.ct_cedula_usuario FROM t_usuario_x_incidencia)`;
            return results;
        } catch (error) {
            response = false;
        }
        return response
    }

    async suspendUser(req) {
        let response = false;
        try {
            await prisma.t_usuarios.update({
                where: {
                    cedula: req.params.cedula
                },
                data: {
                    estado: req.body.estado
                }
            })
            response = true;
        } catch (error) {
            response = false;
        }
        return response;
    }

    async updateUser(req) {
        let response = false;
        try {
            await prisma.t_usuarios.update({
                where: {
                    cedula: req.params.cedula
                },
                data: {
                    ...req.body,
                    contrasena: await this.#encriptPassword(req.body.contrasena)
                }
            })
            response = true;
        } catch (error) {
            response = false;
        }
        return response;
    }

    async counterUsers(req) {
        let response = false;
        try {
            const results = await prisma.$queryRaw`
            SELECT COUNT(ct_cedula),cn_id_rol   FROM t_usuarios_x_rol GROUP BY cn_id_rol;`;
            return results;
        } catch (error) {
            response = false;
        }
        return response
    }
}