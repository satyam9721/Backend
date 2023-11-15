const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const extractPages = async (req, res) => {
  try {
    const { filename, startPage, endPage } = req.params;
    const inputFilePath = `./uploads/${filename}`;
    const outputFilePath = `./uploads/${filename}_extracted.pdf`;

    if (!fs.existsSync(inputFilePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    const existingPdfBytes = fs.readFileSync(inputFilePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const newPdfDoc = await PDFDocument.create();

    for (let i = Number(startPage); i <= Number(endPage); i++) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i - 1]);
      newPdfDoc.addPage(copiedPage);
    }

    const newPdfBytes = await newPdfDoc.save();
    fs.writeFileSync(outputFilePath, newPdfBytes);

    res.status(201).json({ message: 'Pages extracted successfully', filePath: outputFilePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { extractPages };
