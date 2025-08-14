import { Worker } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    console.log("Job :", job.data);
  },
  {
    concurrency: 100,
    connection: {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT),
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

console.log("Worker is running and waiting for jobs...");
