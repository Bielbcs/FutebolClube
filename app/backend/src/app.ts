import * as express from 'express';
import LoginController from './database/controllers/login.controller';
import LoginValidation from './middlewares/loginValidation';
import loginRoutes from './routes/login.routes';

class App {
  public app: express.Express;
  private loginController: LoginController;
  private validation: LoginValidation;

  constructor() {
    this.app = express();
    this.loginController = new LoginController();
    this.validation = new LoginValidation();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/login', loginRoutes);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
