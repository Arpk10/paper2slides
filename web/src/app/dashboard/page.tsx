import { UserButton } from "@clerk/nextjs";
import { Presentation, UploadCloud } from "lucide-react";
import Link from "next/link";
import { UploadZone } from "@/components/UploadZone";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <nav className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Presentation className="h-6 w-6 text-indigo-400" />
            <span>Paper2Slides</span>
          </Link>
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 pt-12 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Presentation</h1>
          <p className="text-neutral-400">Upload an academic PDF to generate an 8-slide PowerPoint deck.</p>
        </div>
        
        {/* Internal Metrics Strip */}
        <div className="grid grid-cols-3 gap-4 mb-12 border-y border-neutral-800 py-6">
          <div className="text-center">
            <p className="text-sm text-neutral-500 uppercase tracking-wider mb-1">Presentations</p>
            <p className="text-2xl font-bold text-indigo-400">14,205</p>
          </div>
          <div className="text-center border-x border-neutral-800">
            <p className="text-sm text-neutral-500 uppercase tracking-wider mb-1">Avg Generation Time</p>
            <p className="text-2xl font-bold text-indigo-400">16.2s</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral-500 uppercase tracking-wider mb-1">Popular Template</p>
            <p className="text-2xl font-bold text-indigo-400">ML Conf</p>
          </div>
        </div>

        <UploadZone />
      </main>
    </div>
  );
}
