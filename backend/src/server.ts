import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
const upload = multer({ dest: "./uploads/" });

app.use(cors());
app.use(express.json());

app.post('/upload/pdf', upload.single('pdf'), ()=>{

})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
