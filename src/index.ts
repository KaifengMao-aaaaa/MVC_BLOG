import express from 'express';
import expressConfig from './config/express.config';
import userRouter from './routers/UserRouter';
const app = express();

// ===================================================================
// subRouters
// ===================================================================
app.use('/user', userRouter);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(expressConfig.PORT, () => {
  console.log(`Example app listening at http://${expressConfig.HOST}:${expressConfig.PORT}`);
});
