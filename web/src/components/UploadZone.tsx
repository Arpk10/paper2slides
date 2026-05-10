"use client";

import { useState, useCallback } from "react";
import { UploadCloud, File, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        setStatus("error");
        setErrorMessage("Please upload a PDF file.");
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setStatus("idle");
      } else {
        setStatus("error");
        setErrorMessage("Please upload a PDF file.");
      }
    }
  };

  const handleGenerate = async () => {
    if (!file) return;
    setStatus("uploading");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      setStatus("processing");
      
      const response = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      // Download the resulting PPTX directly
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(".pdf", "-presentation.pptx");
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Failed to generate presentation. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          isDragging 
            ? "border-indigo-500 bg-indigo-500/10" 
            : file 
              ? "border-neutral-700 bg-neutral-900" 
              : "border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        
        {file ? (
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
              <File className="h-8 w-8" />
            </div>
            <div>
              <p className="font-medium text-lg">{file.name}</p>
              <p className="text-neutral-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={() => {
                setFile(null);
                setStatus("idle");
              }}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
              disabled={status === "uploading" || status === "processing"}
            >
              Remove file
            </button>
          </div>
        ) : (
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
            <div className="h-16 w-16 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400">
              <UploadCloud className="h-8 w-8" />
            </div>
            <div>
              <p className="font-medium text-lg">Click to upload or drag and drop</p>
              <p className="text-neutral-500 text-sm">PDF documents only (max 10MB)</p>
            </div>
          </label>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20">
          <CheckCircle className="h-5 w-5" />
          <p className="text-sm">Presentation generated and downloaded successfully!</p>
        </div>
      )}

      {file && status !== "success" && (
        <button
          onClick={handleGenerate}
          disabled={status === "uploading" || status === "processing"}
          className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl text-lg font-medium transition-all"
        >
          {status === "idle" && "Generate Presentation"}
          {status === "uploading" && (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Uploading PDF...
            </>
          )}
          {status === "processing" && (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              AI is drafting slides... (this takes ~1 min)
            </>
          )}
        </button>
      )}
    </div>
  );
}
