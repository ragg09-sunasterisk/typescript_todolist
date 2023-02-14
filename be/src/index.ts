import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';
import './controllers/TestAPIContoller';
// import './controllers/API/TodoController'


const app = express();

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['sample'] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
