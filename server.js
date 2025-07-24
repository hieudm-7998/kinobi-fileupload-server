import express, { json } from 'express';
import cors from 'cors';
import { join } from 'path';

import { useESMContext } from './utils/esm.js';
import uploadRoutes from './routes/upload.js';

const { __dirname } = useESMContext(import.meta);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(json());

app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use('/', uploadRoutes);

app.listen(PORT, () => {
  console.log(`🚀 File upload server serving at http://localhost:${PORT}`);
});
