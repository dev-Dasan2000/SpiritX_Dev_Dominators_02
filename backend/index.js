import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';

import authRouter from './routes/auth-route.js';
import userRouter from './routes/user-routes.js';


dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;
const origin = process.env.origin || 'http://localhost:3000';

const corsOptions = {credentials: true, origin: origin};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());
app.use('/',express.static(join(__dirname, 'public')));

/* Define routes */ 
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(PORT, ()=>console.log(`Server listening on ${PORT}`));