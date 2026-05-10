import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import { Presentation, ArrowRight, Upload } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  
  return {
    title: \`\${post.title} | Paper2Slides\`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-indigo-500/30">
      <nav className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            <Presentation className="h-6 w-6 text-indigo-500" />
            <span>Paper2Slides</span>
          </Link>
          <Link href="/dashboard" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors">
            Try it Free
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 pt-20 pb-24">
        <article className="prose prose-invert prose-indigo lg:prose-lg mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{post.title}</h1>
          <p className="text-xl text-neutral-400 mb-12 leading-relaxed">{post.description}</p>
          
          <div dangerouslySetInnerHTML={{ __html: post.content }} className="space-y-6 text-neutral-300 leading-relaxed" />
        </article>
      </main>

      <footer className="border-t border-neutral-800 bg-neutral-900 mt-20">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to stop wasting time on slides?</h2>
          <p className="text-neutral-400 mb-8">Join thousands of researchers generating presentation decks instantly.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-[0_0_30px_-10px_rgba(99,102,241,0.5)]">
            <Upload className="h-5 w-5" />
            Upload PDF or Paste arXiv URL
          </Link>
        </div>
      </footer>
    </div>
  );
}
