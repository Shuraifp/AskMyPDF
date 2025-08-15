import { Worker } from "bullmq";
import dotenv from "dotenv";
import { QdrantVectorStore } from "@langchain/qdrant";
// import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { CharacterTextSplitter } from "@langchain/textsplitters";
import { FakeEmbeddings } from "@langchain/core/utils/testing";
import { PDF } from "./types";

dotenv.config();

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    try {
      let pdf: PDF = job.data;
      const loader = new PDFLoader(pdf.path);
      const docs = await loader.load();

      // const textSplitter = new CharacterTextSplitter({
      //   chunkSize: 100,
      //   chunkOverlap: 0,
      // });
      // const texts = await textSplitter.splitText(docs[0].pageContent);
      // console.log('texts :',texts)
      const embeddings = new FakeEmbeddings();
      // ? new OpenAIEmbeddings({
      //     model: "text-embedding-3-small",
      //     apiKey: process.env.OPENAI_API_KEY,
      //   })
    
      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          url: process.env.QDRANT_URL,
          collectionName: process.env.QDRANT_COLLECTION_NAME,
        }
      );

      await vectorStore.addDocuments(docs);
    } catch (err) {
      console.error("Error adding documents:", err);
    }
  },
  {
    concurrency: 100,
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

console.log("Worker is running and waiting for jobs...");
