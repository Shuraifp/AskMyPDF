import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { Queue } from "bullmq";
import morgan from "morgan";
import multer from "multer";
import { PDF } from "./types";
import { FakeEmbeddings } from "@langchain/core/utils/testing";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const queue = new Queue("file-upload-queue", {
  connection: {
    host: "localhost",
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

app.get("/chat", async (req, res) => {
  const userQry = String(req.query.qury) || "";
  if (!userQry) {
    return res.status(400).send("Query parameter 'qury' is required.");
  }
  const embeddings = new FakeEmbeddings();
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL,
      collectionName: process.env.QDRANT_COLLECTION_NAME,
    }
  );
  const retriver = vectorStore.asRetriever();
  const results = await retriver.invoke(userQry);

  const context = results.map((r) => r.pageContent).join("\n\n");

  const systemPrompt = `You are an assistant for question-answering tasks.
Use the following pieces of retrieved context to answer the question.
If you don't know the answer, just say that you don't know.
Use three sentences maximum and keep the answer concise.
Context: ${context}:`;

  let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${systemPrompt}\n\nUser: ${userQry}`;

  const result = await await model.generateContent(prompt);
  const answer = result.response.text();
  res.json({ answer });
});

app.post("/upload/pdf", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  await queue.add("pdf-uploaded", {
    fileName: req.file.filename || "unknown",
    path: req.file.path,
  } as PDF);
  res.json(`File uploaded successfully: ${req.file.path}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
