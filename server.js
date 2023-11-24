import express from 'express';

import connectDB from './config/mongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import profController from './controllers/profController.js';
import coursController from './controllers/CoursController.js';

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

app.use("/api/profs", profController);
app.use("/api/cours", coursController);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
