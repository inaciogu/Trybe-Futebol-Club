import * as express from 'express';
import * as cors from 'cors';
import UserController from './database/controllers/userController';
import { validateLogin } from './database/middlewares/validateLogin';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.config();
    this.app.post('/login', validateLogin, UserController.login);
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
