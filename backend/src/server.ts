import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.post('/upload/pdf', upload.single('pdf'), (req,res)=>{
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json(`File uploaded successfully: ${req.file.path}`);
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
