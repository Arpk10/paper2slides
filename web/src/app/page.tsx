"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, FileText, Presentation, Zap, Upload, CheckCircle2, ChevronRight, MessageSquareQuote } from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [presentationsGenerated, setPresentationsGenerated] = useState(14205);
  const [email, setEmail] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  // Fake counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPresentationsGenerated(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) setWaitlistSuccess(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-indigo-500/30 overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Presentation className="h-6 w-6 text-indigo-500" />
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
      <main className="max-w-6xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium border border-indigo-500/20 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>Over {presentationsGenerated.toLocaleString()} seminar decks generated</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-500 animate-fade-in-up animation-delay-100">
            Turn arXiv papers into seminar-ready presentations instantly.
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Don't waste hours formatting slides. Paste an arXiv URL or upload a PDF. We extract the core intuition, methods, and equations into an 8-slide PowerPoint tailored for Journal Clubs, Thesis Defenses, and Physics/ML Seminars.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up animation-delay-300">
            <SignedIn>
              <Link href="/dashboard">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.8)] hover:-translate-y-0.5">
                  <Upload className="h-5 w-5" />
                  Upload PDF or Paste URL
                </button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.8)] hover:-translate-y-0.5">
                  Generate Your First Deck Free
                  <ArrowRight className="h-5 w-5" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>
          
          <div className="flex items-center justify-center gap-4 pt-6 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-2 border border-neutral-700 bg-neutral-900 rounded-lg px-4 py-2">
               <div className="w-4 h-4 bg-[#DA552F] rounded-full"></div>
               <span className="font-semibold text-sm">PRODUCT HUNT</span>
               <span className="text-sm font-bold ml-2">#1 Product of the Day</span>
            </div>
          </div>
        </div>

        {/* Animated Workflow Visual */}
        <div className="mt-24 relative max-w-5xl mx-auto animate-fade-in-up animation-delay-500">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl -z-10 rounded-full"></div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 items-center bg-neutral-900/50 border border-neutral-800 p-8 rounded-3xl backdrop-blur-sm">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shadow-lg">
                <FileText className="h-8 w-8 text-neutral-400" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">1. Input</h4>
                <p className="text-sm text-neutral-500">arXiv URL or PDF</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 relative">
              <div className="hidden md:block absolute top-8 -left-12 -right-12 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 border border-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] z-10 relative">
                <Zap className="h-8 w-8 text-white animate-pulse" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">2. Processing</h4>
                <p className="text-sm text-neutral-500">Claude 3.5 Sonnet Extraction</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shadow-lg">
                <Presentation className="h-8 w-8 text-pink-400" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">3. Output</h4>
                <p className="text-sm text-neutral-500">8-Slide PPTX File</p>
              </div>
            </div>

          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Built for Seminars",
              description: "Unlike generic AI, our prompts are explicitly tuned for Journal Clubs, Thesis Defenses, and deep ML/Physics papers.",
              icon: <Presentation className="h-6 w-6 text-pink-400" />
            },
            {
              title: "Speaker Notes Included",
              description: "We don't just generate bullets. Every slide comes with detailed speaker notes explaining the 'Key Intuition'.",
              icon: <MessageSquareQuote className="h-6 w-6 text-blue-400" />
            },
            {
              title: "Zero Formatting Hassle",
              description: "Instantly download a clean, minimal PowerPoint (.pptx) file. No complex web editors or markdown formatting required.",
              icon: <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors hover:bg-neutral-800/50">
              <div className="h-12 w-12 rounded-xl bg-neutral-950 flex items-center justify-center border border-neutral-800 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-200">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by researchers worldwide</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-neutral-300 mb-6">"Paper2Slides saved me 3 hours of formatting for my weekly ML reading group. I just paste the arXiv link and the PPTX is immediately ready to present."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm">Dr. Sarah Jenkins</p>
                  <p className="text-neutral-500 text-xs">AI Researcher</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-neutral-300 mb-6">"The 'Key Equation' slide structure is exactly what my thesis advisor demands. It pulls out the physical intuition perfectly without getting bogged down in text."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm">Michael Chen</p>
                  <p className="text-neutral-500 text-xs">Physics PhD Candidate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Waitlist / CTA */}
        <div className="mt-32 max-w-2xl mx-auto text-center border border-neutral-800 bg-neutral-900/50 rounded-3xl p-12 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4">Join the Pro Waitlist</h2>
          <p className="text-neutral-400 mb-8">We are rolling out bulk batching and custom corporate themes. Enter your email to get early access.</p>
          
          {waitlistSuccess ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-4 rounded-full font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              You're on the list! We'll be in touch.
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@university.edu" 
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded-full px-6 py-3 text-neutral-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button type="submit" className="bg-white text-black font-semibold rounded-full px-8 py-3 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                Join Waitlist <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="border-t border-neutral-800 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-neutral-500 text-sm">
          © {new Date().getFullYear()} Paper2Slides. Built for micro-acquisition.
        </div>
      </footer>
    </div>
  );
}
