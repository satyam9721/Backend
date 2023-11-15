const fs = require('fs');

const uploadFile = (req, res) => {
  try {
    const { file } = req;
    const filePath = `./uploads/${file.originalname}`;

    fs.writeFileSync(filePath, file.buffer);
    res.status(201).json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getFile = (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = `./uploads/${filename}`;

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { uploadFile, getFile };
