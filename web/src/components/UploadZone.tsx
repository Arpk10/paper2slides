"use client";

import { useState, useCallback, useRef } from "react";
import { UploadCloud, File, Loader2, CheckCircle, AlertCircle, Link as LinkIcon, BookOpen, Atom, Cpu, GraduationCap, Zap } from "lucide-react";

type TemplateMode = "Standard" | "Physics Seminar" | "ML Conference" | "Journal Club" | "Thesis Defense";

const TEMPLATES: { mode: TemplateMode, icon: React.ReactNode, desc: string }[] = [
  { mode: "Standard", icon: <File className="w-5 h-5"/>, desc: "Default balanced style" },
  { mode: "Physics Seminar", icon: <Atom className="w-5 h-5"/>, desc: "Rigorous derivations & physical intuition" },
  { mode: "ML Conference", icon: <Cpu className="w-5 h-5"/>, desc: "Architecture & compute metrics" },
  { mode: "Journal Club", icon: <BookOpen className="w-5 h-5"/>, desc: "Critical analysis & weaknesses" },
  { mode: "Thesis Defense", icon: <GraduationCap className="w-5 h-5"/>, desc: "Personal contribution & mastery" }
];

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [arxivUrl, setArxivUrl] = useState("");
  const [templateMode, setTemplateMode] = useState<TemplateMode>("Standard");
  
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [generationTime, setGenerationTime] = useState<number | null>(null);
  
  const startTimeRef = useRef<number>(0);

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
        setArxivUrl("");
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
        setArxivUrl("");
        setStatus("idle");
      } else {
        setStatus("error");
        setErrorMessage("Please upload a PDF file.");
      }
    }
  };

  const handleGenerate = async (demoUrl?: string) => {
    const targetUrl = demoUrl || arxivUrl;
    if (!file && !targetUrl) return;
    
    setStatus("uploading");
    startTimeRef.current = Date.now();
    setGenerationTime(null);
    
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else if (targetUrl) {
      formData.append("arxiv_url", targetUrl);
    }
    formData.append("template_mode", templateMode);

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

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      
      const downloadName = file 
        ? file.name.replace(".pdf", "-presentation.pptx") 
        : `arxiv_${targetUrl.split("/").pop()?.replace(".pdf", "")}-slides.pptx`;
        
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      const endTime = Date.now();
      setGenerationTime(Number(((endTime - startTimeRef.current) / 1000).toFixed(1)));
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Failed to generate presentation. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Template Selection */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-neutral-200">1. Select Presentation Style</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {TEMPLATES.map((t) => (
            <div 
              key={t.mode}
              onClick={() => setTemplateMode(t.mode)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                templateMode === t.mode 
                ? "border-indigo-500 bg-indigo-500/10 text-indigo-300" 
                : "border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 hover:border-neutral-700 text-neutral-400"
              }`}
            >
              <div className={`mb-2 ${templateMode === t.mode ? "text-indigo-400" : "text-neutral-500"}`}>
                {t.icon}
              </div>
              <h3 className={`font-medium mb-1 ${templateMode === t.mode ? "text-indigo-200" : "text-neutral-300"}`}>{t.mode}</h3>
              <p className="text-xs opacity-80 leading-tight">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-neutral-200">2. Provide Paper</h2>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                <LinkIcon className="h-5 w-5" />
              </div>
              <input 
                type="text" 
                placeholder="Paste arXiv URL (e.g. https://arxiv.org/abs/1706.03762)" 
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 pl-10 pr-4 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                value={arxivUrl}
                onChange={(e) => {
                  setArxivUrl(e.target.value);
                  if (e.target.value) setFile(null); // Clear file if URL is typed
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px bg-neutral-800 flex-1"></div>
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-widest">OR UPLOAD PDF</span>
            <div className="h-px bg-neutral-800 flex-1"></div>
          </div>

          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              isDragging 
                ? "border-indigo-500 bg-indigo-500/10" 
                : file 
                  ? "border-indigo-500/50 bg-indigo-500/5" 
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
                <div className="h-12 w-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
                  <File className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-neutral-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
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
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
                <div className="h-12 w-12 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Click to upload or drag and drop</p>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Demo Links */}
      <div className="flex items-center gap-3 text-sm text-neutral-400 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/50">
        <Zap className="h-4 w-4 text-yellow-500 flex-shrink-0" />
        <span className="font-medium text-neutral-300">Fast Demo:</span>
        <button 
          onClick={() => { setTemplateMode("ML Conference"); handleGenerate("https://arxiv.org/abs/1706.03762"); }}
          className="hover:text-indigo-400 transition-colors underline decoration-neutral-600 underline-offset-4"
        >
          Attention Is All You Need (ML)
        </button>
        <span className="opacity-50">|</span>
        <button 
          onClick={() => { setTemplateMode("Physics Seminar"); handleGenerate("https://arxiv.org/abs/1602.03837"); }}
          className="hover:text-indigo-400 transition-colors underline decoration-neutral-600 underline-offset-4"
        >
          Gravitational Waves (Physics)
        </button>
      </div>

      {/* Status Messages */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col gap-2 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">Presentation generated successfully!</p>
          </div>
          {generationTime && (
            <p className="text-xs text-emerald-500/80 pl-7">
              Generated in {generationTime} seconds.
            </p>
          )}
        </div>
      )}

      {/* Submit Action */}
      {(file || arxivUrl) && status !== "success" && (
        <button
          onClick={() => handleGenerate()}
          disabled={status === "uploading" || status === "processing"}
          className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl text-lg font-medium transition-all shadow-[0_0_30px_-10px_rgba(99,102,241,0.4)]"
        >
          {status === "idle" && "Generate Presentation"}
          {status === "uploading" && (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Reading PDF...
            </>
          )}
          {status === "processing" && (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              AI is drafting {templateMode} slides...
            </>
          )}
        </button>
      )}
    </div>
  );
}
