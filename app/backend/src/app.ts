import * as express from 'express';
import * as cors from 'cors';
import UserController from './database/controllers/userController';
import { validateLogin, validateUser } from './database/middlewares/validateLogin';
import validateJwt from './database/auth/validateJwt';
import ClubController from './database/controllers/clubController';
import MatchController from './database/controllers/matchController';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.post('/login', validateLogin, validateUser, UserController.login);
    this.app.get('/login/validate', validateJwt);
    this.app.get('/clubs', ClubController.findClubs);
    this.app.get('/clubs/:id', ClubController.findClubById);
    this.app.get('/matchs', MatchController.findMatchs);
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
