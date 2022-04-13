import * as express from 'express';
import * as cors from 'cors';
import login from './database/routes/loginRoute';
import clubs from './database/routes/clubsRoute';
import matchs from './database/routes/matchRoutes';
import leaderboard from './database/routes/leaderboardRoute';

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
    this.app.use('/login', login);
    this.app.use('/clubs', clubs);
    this.app.use('/matchs', matchs);
    this.app.use('/leaderboard', leaderboard);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
