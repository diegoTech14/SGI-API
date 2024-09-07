import bcrypt from 'bcryptjs';
import { UsersService } from "../services/usersService.js";

    export class UserController{

        constructor(){
            this.service = new UsersService();
        }
        
        getUsers = async (req, res) => {
            let response;

            const users = await this.service.getUsers();
            return (users) ? response = res.status(200).json(users) : res.status(404).json([]);
        }

        getUserLogin = async (req, res) => {
            let response;

            const userFound = await this.service.login(req);
            return (userFound) ? response = res.status(200).json(userFound) : response = res.status(404).json({})
        }

        createUser = async (req, res) => {
            let response;

            const userCreated = this.service.createUser(req, res)
            return (userCreated) ? response = res.status(200).json(userCreated) : response = res.status(500).json({})
        }

        getHours = async(req, res) =>{
            let response;
            const usersXIncidences = await this.service.usersIncidences()
            return (usersXIncidences) ? response = res.status(200).json(usersXIncidences) : response = res.status(500).json({})
        }

        getUsersRoles = async(req, res) =>{
            let response;
            const usersRoles = await this.service.usersRol()
            return (usersRoles) ? response = res.status(200).json(usersRoles) : response = res.status(500).json({})
        }
}