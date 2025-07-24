import uploadService from './../services/upload.service.js';

export default {
  handleUpload(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
    });
  },

  async listFiles(req, res) {
    try {
      const files = await uploadService.getFileList();
      res.json(files);
    } catch (err) {
      res.status(500).json({ error: 'Failed to list files' });
    }
  },

  async deleteFile(req, res) {
    try {
      await uploadService.deleteFile(req.params.filename);
      res.json({ message: `Deleted ${req.params.filename}` });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete file' });
    }
  },

  async duplicateFile(req, res) {
    try {
      const newFilename = await uploadService.duplicateFile(
        req.params.filename
      );
      res.json({ message: 'Duplicated file', filename: newFilename });
    } catch (err) {
      res.status(500).json({ error: 'Failed to duplicate file' });
    }
  },
};
