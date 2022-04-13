import { Router } from 'express';
import validateJwt from '../auth/validateJwt';
import UserController from '../controllers/userController';
import { validateLogin, validateUser } from '../middlewares/validateLogin';

const login = Router();

login.post('/', validateLogin, validateUser, UserController.login);

login.get('/validate', validateJwt, UserController.checkRole);

export default login;
