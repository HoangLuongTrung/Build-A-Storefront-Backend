import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './handlers/user';
import productRouter from './handlers/product';
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
const corsOption = {
    origin: '',
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World! 1    ');
})

userRoutes(app);
productRouter(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
