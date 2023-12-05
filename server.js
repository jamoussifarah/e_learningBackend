import express from 'express';
import cors from 'cors';
import connectDB from './config/mongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import profController from './controllers/profController.js';
import coursController from './controllers/CoursController.js';
import participantController from './controllers/participantController.js';
import avisController from './controllers/avisController.js';
 
const app = express();
const PORT = process.env.PORT || 5000;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next(); 
});
app.use(cors());
connectDB();

app.use("/api/profs", profController);
app.use("/api/cours", coursController);
app.use("/api/user", participantController);
app.use("/api/avis", avisController);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
