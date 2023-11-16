const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const dotenv=require("dotenv")

dotenv.config();
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api', fileRoutes);
app.use('/api/pdf', pdfRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
