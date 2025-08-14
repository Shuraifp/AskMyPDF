import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { Queue } from "bullmq";
import morgan from "morgan";
import multer from "multer";

const queue = new Queue("file-upload-queue", {
  connection: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT),
  },
  });
 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.post("/upload/pdf", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  await queue.add('pdf-uploaded', {
    fileName: req.file.filename || 'unknown',
    path: req.file.path
  })
  res.json(`File uploaded successfully: ${req.file.path}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
