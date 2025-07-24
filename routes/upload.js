import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync, readdir } from 'fs';
import { useESMContext } from './../utils/esm.js';

const { __dirname } = useESMContext(import.meta);
const uploadDir = join(__dirname, '..', 'uploads');

const router = Router();

if (!existsSync(uploadDir)) mkdirSync(uploadDir);

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/\s/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '');
    const uniqueSuffix = `${Date.now()}-${sanitized}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
  });
});

router.get('/files', (req, res) => {
  readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to list files' });
    }
    res.json(files);
  });
});

export default router;
