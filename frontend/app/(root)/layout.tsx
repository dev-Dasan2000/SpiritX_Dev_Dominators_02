import type { Metadata } from "next";
import "@/app/globals.css"; // Ensure Tailwind CSS is imported

export const metadata: Metadata = {
  title: "DevDominators",
  description: "A Next.js app by DevDominators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        {/* SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="pageBackground" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Background Gradient */}
          <rect width="1200" height="800" fill="url(#pageBackground)" />

          {/* Abstract Decorative Elements */}
          <circle cx="150" cy="150" r="300" fill="#6366f1" opacity="0.05" />
          <circle cx="1050" cy="650" r="250" fill="#8b5cf6" opacity="0.05" />
          <circle cx="600" cy="100" r="150" fill="#6366f1" opacity="0.05" />
          <circle cx="900" cy="300" r="200" fill="#8b5cf6" opacity="0.05" />

          {/* Glowing Accent Lines */}
          <path d="M0 400 Q 300 300, 600 450 T 1200 350" stroke="#6366f1" strokeWidth="1" fill="none" opacity="0.2" />
          <path d="M0 450 Q 300 350, 600 500 T 1200 400" stroke="#8b5cf6" strokeWidth="1" fill="none" opacity="0.15" />
          <path d="M0 500 Q 300 400, 600 550 T 1200 450" stroke="#6366f1" strokeWidth="1" fill="none" opacity="0.1" />

          {/* Floating Particles */}
          <circle cx="200" cy="200" r="2" fill="#6366f1" opacity="0.4" />
          <circle cx="300" cy="150" r="1" fill="#8b5cf6" opacity="0.3" />
          <circle cx="400" cy="250" r="1.5" fill="#6366f1" opacity="0.5" />
          <circle cx="500" cy="350" r="1" fill="#8b5cf6" opacity="0.3" />
          <circle cx="900" cy="200" r="2" fill="#6366f1" opacity="0.4" />
          <circle cx="800" cy="350" r="1.5" fill="#8b5cf6" opacity="0.3" />
          <circle cx="950" cy="400" r="1" fill="#6366f1" opacity="0.5" />
          <circle cx="700" cy="500" r="2" fill="#8b5cf6" opacity="0.4" />
        </svg>

        {/* Content Area */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
