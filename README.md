# AskMyPDF – PDF-Powered Retrieval-Augmented Chatbot

**PDF-RAG** is a full-stack application that allows users to upload PDF documents and interact with them through an intelligent chatbot powered by **RAG (Retrieval-Augmented Generation)**. The system leverages vector embeddings, semantic search, and LLMs to provide contextual answers grounded in uploaded documents.

---

<!--## 🚀 Live Demo

[https://your-demo-link.com](https://your-demo-link.com)-->

---

## 👨‍💻 Developed by

**Muhammed Shuraif**

---

## ✨ Features

### 🔐 Authentication
- Secure login/signup using **Clerk** authentication.

### 📑 PDF Upload & Processing
- Upload PDFs directly from the home page.
- Automatic background processing of uploaded files via **BullMQ + Valkey** queue system.
- Convert PDFs into chunks, generate vector embeddings with **LangChain**, and store them in **Qdrant DB**.

### 💬 Intelligent Chat Interface
- Chat with an AI assistant grounded in your uploaded PDFs.
- Semantic query understanding with context-based retrieval.
- Accurate, document-aware responses using **RAG pipeline**.

### ⚙️ System Features
- Asynchronous document processing workers.
- Vector database management for efficient retrieval.

---

## 🏗️ System Design

### 1. Authentication
- Managed by **Clerk**.
- Sign-in / sign-up screens with branding.

### 2. Home Page Layout
- **Left Panel**: PDF upload interface.
- **Right Panel**: Chatbot interface for document queries.

### 3. Workflow

#### 📥 Injection Phase
1. User uploads a PDF.
2. File path pushed into **BullMQ** queue.
3. Worker process:
   - Parse and chunk the PDF.
   - Generate embeddings for each chunk with **LangChain + OpenAI**.
   - Store embeddings in **Qdrant** vector database.

#### 🔍 Retrieval Phase
1. User enters a query in chat.
2. Query is converted to vector embeddings.
3. Retrieve relevant document chunks from **Qdrant**.
4. Provide query + retrieved context to the LLM.
5. Chatbot responds with context-grounded answer.

---

## 📂 Project Structure

```bash
PDF-RAG/
├── frondend/                 # Frontend application (Next.js)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   ├── public/
│   └── package.json
│
├── backend/                 # Backend API (Express.js)
│   ├── src/
│   │   ├── queueWorker.ts    # Queue worker for PDF processing
│   │   ├── server.ts
│   │   ├── types.ts
│   ├── uploads
│   ├── dist/ => src
│   ├── .env
│   └── package.json
├── .gitignore 
├── package.json
├── docker-compose.yml 
├── pnpm-lock.yaml 
├── pnpm-workspace.yaml 
├── node_modules
└── README.md
