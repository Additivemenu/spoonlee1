const express = require('express');
const multer = require('multer');
const cors = require('cors');  // <-- Import CORS

const app = express();
const PORT = 8080;

app.use(cors());  // <-- Use CORS middleware. This allows any origin by default.

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files
app.use('/uploads', express.static('uploads'));

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
