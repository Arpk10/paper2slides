"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, FileText, Presentation, Zap, Upload, CheckCircle2, ChevronRight, MessageSquareQuote, PlayCircle, XCircle, Clock, GraduationCap } from "lucide-react";
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
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Product Hunt Launching Soon Banner */}
      <div className="bg-indigo-600 text-white text-sm font-medium py-2 px-4 text-center sticky top-0 z-[60]">
        <span className="opacity-90">🚀 Launching soon on Product Hunt!</span>
        <a href="#" className="ml-2 underline hover:text-indigo-200 transition-colors">Get notified</a>
      </div>

      {/* Navigation */}
      <nav className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-10 z-50">
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
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium border border-indigo-500/20 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>Over {presentationsGenerated.toLocaleString()} seminar decks generated</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-500 animate-fade-in-up animation-delay-100">
            Stop spending hours making seminar slides.
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Paste an arXiv URL or upload a PDF. We instantly extract the core intuition, methodology, and key equations into an 8-slide PowerPoint tailored for Journal Clubs, Lab Meetings, and Thesis Defenses.
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
        </div>

        {/* Credibility Strip */}
        <div className="mt-20 text-center animate-fade-in-up animation-delay-400">
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6">Trusted by Researchers in Physics, ML & Academia</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Generic Academic Badges using Lucide icons + Text */}
            <div className="flex items-center gap-2 text-xl font-bold font-serif"><GraduationCap className="h-8 w-8"/> UNIVERSITY LABS</div>
            <div className="flex items-center gap-2 text-xl font-bold"><Atom className="h-8 w-8"/> PHYSICS DEPTS</div>
            <div className="flex items-center gap-2 text-xl font-bold font-mono"><Cpu className="h-8 w-8"/> ML CONFERENCES</div>
          </div>
        </div>

        {/* Video Placeholder */}
        <div className="mt-32 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl relative aspect-video animate-fade-in-up animation-delay-500 group cursor-pointer">
          <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center">
            {/* When replacing with real video, use an iframe for YouTube embed here */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
            <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all z-10" />
            <p className="mt-4 text-neutral-300 font-medium z-10">Watch the 30-second demo</p>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mt-40">
          <h2 className="text-3xl font-bold text-center mb-16">The old way vs. Paper2Slides</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Old Way */}
            <div className="p-8 rounded-3xl bg-red-950/20 border border-red-900/30">
              <div className="flex items-center gap-3 mb-6 text-red-400">
                <XCircle className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Manual Workflow</h3>
              </div>
              <ul className="space-y-4 text-neutral-400">
                <li className="flex items-start gap-3"><Clock className="w-5 h-5 shrink-0 mt-0.5 opacity-50" /> Read a dense 20-page PDF</li>
                <li className="flex items-start gap-3"><Clock className="w-5 h-5 shrink-0 mt-0.5 opacity-50" /> Highlight key equations and methods</li>
                <li className="flex items-start gap-3"><Clock className="w-5 h-5 shrink-0 mt-0.5 opacity-50" /> Open PowerPoint and create blank slides</li>
                <li className="flex items-start gap-3"><Clock className="w-5 h-5 shrink-0 mt-0.5 opacity-50" /> Copy-paste text, inevitably breaking formatting</li>
                <li className="flex items-start gap-3"><Clock className="w-5 h-5 shrink-0 mt-0.5 opacity-50" /> Manually write speaker notes</li>
              </ul>
              <div className="mt-8 pt-6 border-t border-red-900/30 text-red-300 font-medium">
                Time spent: 2-3 hours
              </div>
            </div>

            {/* New Way */}
            <div className="p-8 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6 text-indigo-400">
                  <CheckCircle2 className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Paper2Slides Workflow</h3>
                </div>
                <ul className="space-y-4 text-neutral-300">
                  <li className="flex items-start gap-3"><Zap className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" /> Paste an arXiv URL</li>
                  <li className="flex items-start gap-3"><Zap className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" /> Select "Journal Club" mode</li>
                  <li className="flex items-start gap-3"><Zap className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" /> Instantly download a formatted .pptx</li>
                </ul>
                <div className="mt-8 pt-6 border-t border-indigo-500/30 text-indigo-300 font-medium text-xl">
                  Time spent: 15 seconds
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mt-40 text-center">
          <h2 className="text-3xl font-bold mb-4">Built for every academic occasion</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-12">Our prompt templates are specifically tuned to extract the right level of detail based on your audience.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {['Journal Club', 'Thesis Defense', 'Lab Meeting', 'Conference Presentation'].map((useCase) => (
              <div key={useCase} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium">
                {useCase}
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-40 grid md:grid-cols-3 gap-8">
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
        <div className="mt-40">
          <h2 className="text-3xl font-bold text-center mb-12">Used by researchers worldwide</h2>
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

        {/* Waitlist / Bottom CTA */}
        <div className="mt-40 max-w-2xl mx-auto text-center border border-neutral-800 bg-neutral-900/50 rounded-3xl p-12 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4">Ready to reclaim your time?</h2>
          <p className="text-neutral-400 mb-8">Generate your first academic presentation instantly. No credit card required.</p>
          
          <div className="flex justify-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 bg-white text-black font-semibold rounded-full px-8 py-4 text-lg hover:bg-neutral-200 transition-colors shadow-xl">
                  Try Paper2Slides Free <ArrowRight className="w-5 h-5" />
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="flex items-center gap-2 bg-white text-black font-semibold rounded-full px-8 py-4 text-lg hover:bg-neutral-200 transition-colors shadow-xl">
                Go to Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
            </SignedIn>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-800 mt-20 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-sm">
          <div className="flex items-center gap-2 font-bold text-neutral-300">
            <Presentation className="h-5 w-5" /> Paper2Slides
          </div>
          <div className="flex gap-6">
            <Link href="/convert-arxiv-paper-to-slides" className="hover:text-neutral-300">Convert arXiv to Slides</Link>
            <Link href="/ai-seminar-presentation-generator" className="hover:text-neutral-300">Seminar Generator</Link>
            <Link href="/journal-club-presentation-tool" className="hover:text-neutral-300">Journal Club AI</Link>
          </div>
          <div>
            © {new Date().getFullYear()} Paper2Slides. Built for researchers.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Ensure icons used above are imported if needed (Atom, Cpu, GraduationCap were added)
function Atom(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg> }
function Cpu(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg> }
