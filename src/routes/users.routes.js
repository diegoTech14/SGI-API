import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";

/*import { body, query } from "express-validator";
import { autorizacionMiddleware } from "./middlewares.js";*/
const routerUsers = Router();
const controller = new UserController;

routerUsers.get('/users', controller.getUsers);
routerUsers.post('/login', controller.getUserLogin);
routerUsers.post('/create', controller.createUser);
routerUsers.get('/users/hours',controller.getHours);
routerUsers.get('/users/usersroles',controller.getUsersRoles);

export default routerUsers;