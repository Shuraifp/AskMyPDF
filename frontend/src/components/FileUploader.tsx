"use client";
import { METHODS } from "http";
import * as React from "react";

function FileUploader() {
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10 MB");
        setFile(null);
      } else {
        setError(null);
        if (selectedFile) {
          const formData = new FormData();
          formData.append("pdf", selectedFile);
          await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/upload/pdf", {
            method: "POST",
            body: formData,
          }).then((response) => {
            if (!response.ok) {
              throw new Error("Failed to upload file");
            } else {
              setFile(selectedFile);
              console.log("File uploaded successfully ", response);
            }
          }).catch((error) => {
            setError(error.message);
            console.error("Error uploading file:", error);
          });
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <div
        className="p-6 bg-[#047070] hover:bg-[#076969] rounded-xl cursor-pointer"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <span>Upload your PDF</span>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {file && <p>Selected file: {file.name}</p>}
    </div>
  );
}

export default FileUploader;
