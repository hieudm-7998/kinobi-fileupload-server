import { join } from 'path';
import { existsSync, readdirSync, unlinkSync, copyFileSync } from 'fs';
import { useESMContext } from './../utils/esm.js';

const { __dirname } = useESMContext(import.meta);
const uploadDir = join(__dirname, '..', 'uploads');

export default {
  getFileList() {
    const files = readdirSync(uploadDir);
    return files
      .map((filename) => {
        const match = filename.match(/^(\d+)-(.+)$/);
        let timestamp = null;
        if (match) {
          timestamp = new Date(parseInt(match[1], 10)).toISOString();
        }
        return { filename, timestamp };
      })
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  },

  deleteFile(filename) {
    const filePath = join(uploadDir, filename);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    } else {
      throw new Error('File not found');
    }
  },

  duplicateFile(filename) {
    const src = join(uploadDir, filename);
    if (!existsSync(src)) throw new Error('File not found');

    const match = filename.match(/^(\d+)-(.+)$/);
    const originalName = match ? match[2] : filename;
    const newFilename = `${Date.now()}-copy-${originalName}`;
    const dest = join(uploadDir, newFilename);
    copyFileSync(src, dest);
    return newFilename;
  },
};
