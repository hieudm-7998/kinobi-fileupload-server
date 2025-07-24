import multer, { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { useESMContext } from './esm.js';

const { __dirname } = useESMContext(import.meta);
const uploadDir = join(__dirname, '..', 'uploads');

if (!existsSync(uploadDir)) mkdirSync(uploadDir);

const storage = diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const sanitized = file.originalname
      .replace(/\s/g, '_')
      .replace(/[^a-zA-Z0-9_.-]/g, '');
    const unique = `${Date.now()}-${sanitized}`;
    cb(null, unique);
  },
});

export const upload = multer({ storage });
