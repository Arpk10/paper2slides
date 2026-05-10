import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, FileText, Presentation, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Presentation className="h-6 w-6 text-indigo-400" />
            <span>Paper2Slides</span>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium hover:text-indigo-400 transition-colors">
                  Log in
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="text-sm font-medium hover:text-indigo-400 transition-colors">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium border border-indigo-500/20">
            <Zap className="h-4 w-4" />
            <span>Generate seminar decks in seconds</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400">
            Research papers to slides.<br />Like magic.
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Upload any academic PDF. We'll instantly extract the core concepts, methods, and equations to generate a clean, 8-slide PowerPoint presentation ready for your next seminar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <SignedIn>
              <Link href="/dashboard">
                <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]">
                  <FileText className="h-5 w-5" />
                  Upload PDF Now
                </button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]">
                  Get Started for Free
                  <ArrowRight className="h-5 w-5" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Demo / Value Prop Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Fast Extraction",
              description: "We use lightweight parsing to instantly find the abstract, methods, results, and conclusion.",
              icon: <Zap className="h-6 w-6 text-yellow-400" />
            },
            {
              title: "Smart Summarization",
              description: "Powered by Claude Sonnet, our AI condenses dense academic text into concise presentation bullets.",
              icon: <FileText className="h-6 w-6 text-blue-400" />
            },
            {
              title: "Direct PPTX Export",
              description: "No complex editors. Get a beautifully formatted 8-slide PowerPoint file immediately.",
              icon: <Presentation className="h-6 w-6 text-pink-400" />
            }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-neutral-950 flex items-center justify-center border border-neutral-800 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
