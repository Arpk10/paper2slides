import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paper2Slides | Convert arXiv Papers to Presentations Instantly",
  description: "Stop spending hours formatting academic slides. Turn any arXiv PDF into an 8-slide, seminar-ready PowerPoint presentation in seconds.",
  keywords: ["arxiv to slides", "ai presentation generator", "research paper to pptx", "academic slides ai"],
  openGraph: {
    title: "Paper2Slides | Convert arXiv Papers to Presentations",
    description: "Turn any research paper into a seminar-ready presentation instantly.",
    type: "website",
    url: "https://paper2slides.com",
    images: ["/screenshots/og-image.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper2Slides | Convert arXiv Papers to Presentations",
    description: "Turn any research paper into a seminar-ready presentation instantly.",
    images: ["/screenshots/og-image.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <head>
          <script defer data-domain="paper2slides.com" src="https://plausible.io/js/script.js"></script>
        </head>
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
