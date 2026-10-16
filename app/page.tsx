'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

declare global {
  interface Window {
    longPressTimer?: ReturnType<typeof setTimeout>;
  }
}

type AppItem = {
  id: string;
  name: string;
  icon: string;
  color: string;
  isWidget?: boolean;
};

type Notification = {
  id: string;
  icon: string;
  title: string;
  message: string;
  color: string;
};

const WALLPAPERS = [
  { id: 'default', name: 'Default', light: 'bg-gradient-to-br from-gray-100 via-white to-gray-200', dark: 'bg-gradient-to-br from-black via-slate-900 to-black', preview: 'from-gray-300 to-gray-500' },
  { id: 'ocean', name: 'Ocean', light: 'bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-400', dark: 'bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950', preview: 'from-sky-400 to-indigo-600' },
  { id: 'sunset', name: 'Sunset', light: 'bg-gradient-to-br from-orange-200 via-rose-300 to-pink-400', dark: 'bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950', preview: 'from-orange-400 to-pink-600' },
  { id: 'forest', name: 'Forest', light: 'bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-300', dark: 'bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950', preview: 'from-emerald-400 to-teal-600' },
  { id: 'purple', name: 'Cosmic', light: 'bg-gradient-to-br from-purple-200 via-fuchsia-300 to-pink-300', dark: 'bg-gradient-to-br from-purple-950 via-fuchsia-950 to-slate-950', preview: 'from-purple-400 to-fuchsia-600' },
];

const apps: AppItem[] = [
  { id: 'about', name: 'About Me', icon: '👤', color: 'bg-blue-500' },
  { id: 'skills', name: 'Tech Stack', icon: '🌟', color: 'bg-purple-500' },
  { id: 'projects', name: 'Web Apps', icon: '🌐', color: 'bg-indigo-500' },
  { id: 'mobile', name: 'Mobile Apps', icon: '📱', color: 'bg-cyan-500' },
  { id: 'education', name: 'Education', icon: '🎓', color: 'bg-green-600' },
  { id: 'coursework', name: 'Coursework', icon: '📚', color: 'bg-yellow-500' },
  { id: 'architecture', name: 'Architecture', icon: '🏗️', color: 'bg-orange-600' },
  { id: 'uiux', name: 'UI / UX', icon: '🎨', color: 'bg-pink-500' },
  { id: 'experience', name: 'Experience', icon: '💼', color: 'bg-teal-500' },
  { id: 'terminal', name: 'Terminal', icon: '💻', color: 'bg-slate-800' },
  { id: 'github', name: 'GitHub', icon: '🐙', color: 'bg-slate-600' },
  { id: 'resume', name: 'Resume', icon: '📄', color: 'bg-sky-500' },
  { id: 'news', name: 'Tech News', icon: '📰', color: 'bg-red-500' },
  { id: 'settings', name: 'Settings', icon: '⚙️', color: 'bg-gray-500' },
  { id: 'browser', name: 'Browser', icon: '🌍', color: 'bg-blue-600' },
  { id: 'contact', name: 'Contact', icon: '✉️', color: 'bg-rose-500' },
  { id: 'blog', name: 'Blog', icon: '📝', color: 'bg-amber-500' },
  { id: 'certs', name: 'Certificates', icon: '🏆', color: 'bg-yellow-600' },
  { id: 'testimonials', name: 'Reviews', icon: '💬', color: 'bg-fuchsia-500' },
  { id: 'timeline', name: 'Timeline', icon: '⏳', color: 'bg-emerald-500' },
];

// ============ ENHANCED CONTENT COMPONENTS ============

// 17. Resume App — Simplified: just info card + download button
const ResumeContent = ({ isDark }: { isDark: boolean }) => {
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Downloads /public/resume.pdf
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Melkamu_Derso_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <div className={`space-y-6 animate-fade-in pb-12 max-w-2xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>

      {/* Header card with name, title, contact */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm relative overflow-hidden ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-gray-200'}`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">📄</div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Melkamu Derso</h3>
              <p className={`text-sm font-medium mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                Full-Stack & Mobile Developer
              </p>
            </div>
          </div>

          <div className={`flex flex-col gap-2 text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            <div className="flex items-center gap-2">
              
            </div>
            <div className="flex items-center gap-2">
              
            </div>
            <div className="flex items-center gap-2">
              
            </div>
          </div>
        </div>
      </div>

      {/* Big download button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className={`w-full py-5 rounded-3xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
          downloading
            ? 'bg-green-500 text-white'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98]'
        }`}
      >
        {downloading ? (
          <>
            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Downloading…
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Download Resume (PDF)
          </>
        )}
      </button>

      {/* Hint text */}
      <p className={`text-center text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
        PDF • Opens in a new tab or downloads directly
      </p>

    </div>
  );
};

// 18. Web Apps with real screenshots
const WebAppsContent = ({ isDark }: { isDark: boolean }) => {
  const webProjects = [
    { title: "Organizational Management System", type: "Enterprise Dashboard", tech: "Next.js • Node.js", description: "Comprehensive web-based management system with member tracking, financial records, and inventory management.", color: "blue", image: "/projects/org-system.jpg", liveUrl: "#", repoUrl: "https://github.com/melaku-git" },
    { title: "Smart Digital Menu", type: "SaaS Platform", tech: "Laravel • Next.js • MySQL", description: "Digital ordering platform tailored for cafes with real-time order tracking and optimized MySQL schema.", color: "rose", image: "/projects/smart-menu.jpg", liveUrl: "#", repoUrl: "https://github.com/melaku-git" },
    { title: "BiT Internship Portal", type: "Academic System", tech: "Next.js • MongoDB • RBAC", description: "Internship Placement System for Bahir Dar Institute of Technology with role-based access control.", color: "emerald", image: "/projects/bit-portal.jpg", liveUrl: "#", repoUrl: "https://github.com/melaku-git" }
  ];

  const getColorClasses = (color: string, isDark: boolean, type: 'bg' | 'text' | 'border') => {
    const maps: Record<string, Record<string, string>> = {
      blue: { bg: isDark ? 'bg-blue-500/20' : 'bg-blue-100', text: isDark ? 'text-blue-400' : 'text-blue-600', border: isDark ? 'border-blue-500/30' : 'border-blue-200' },
      rose: { bg: isDark ? 'bg-rose-500/20' : 'bg-rose-100', text: isDark ? 'text-rose-400' : 'text-rose-600', border: isDark ? 'border-rose-500/30' : 'border-rose-200' },
      emerald: { bg: isDark ? 'bg-emerald-500/20' : 'bg-emerald-100', text: isDark ? 'text-emerald-400' : 'text-emerald-600', border: isDark ? 'border-emerald-500/30' : 'border-emerald-200' },
    };
    return maps[color][type];
  };

  const [imageErrors, setImageErrors] = React.useState<Record<number, boolean>>({});

  return (
    <div className={`space-y-10 animate-fade-in pb-12 max-w-5xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="border-b pb-6 border-opacity-20 border-gray-500">
        <h3 className="text-3xl font-extrabold tracking-tight mb-2">Web Applications</h3>
        <p className={`text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Scalable full-stack platforms engineered for enterprise and academic environments. Screenshots are live captures from production deployments.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {webProjects.map((project, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15 }}
            className={`group flex flex-col rounded-[2rem] border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-900">
              {!imageErrors[index] ? (
                <img
                  src={project.image}
                  alt={project.title}
                  onError={() => setImageErrors(prev => ({ ...prev, [index]: true }))}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className={`w-full h-full flex flex-col items-center justify-center ${getColorClasses(project.color, isDark, 'bg')}`}>
                  <span className="text-6xl mb-3 opacity-60">🖥️</span>
                  <span className={`text-xs font-bold uppercase tracking-widest ${getColorClasses(project.color, isDark, 'text')}`}>Screenshot Coming Soon</span>
                  <span className={`text-[10px] mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Add /public{project.image}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-800 shadow-lg hover:scale-110 transition-transform" title="View Code">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                )}
              </div>
            </div>
            <div className={`p-6 flex-1 flex flex-col ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border w-max mb-3 ${getColorClasses(project.color, isDark, 'bg')} ${getColorClasses(project.color, isDark, 'text')} ${getColorClasses(project.color, isDark, 'border')}`}>{project.type}</span>
              <h4 className="text-xl font-bold mb-1">{project.title}</h4>
              <p className={`text-xs font-mono mb-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{project.tech}</p>
              <p className={`text-sm leading-relaxed flex-1 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 19. Blog App
const BlogContent = ({ isDark }: { isDark: boolean }) => {
  type Post = { id: string; title: string; excerpt: string; content: string; date: string; readTime: string; tags: string[]; icon: string };
  const [selected, setSelected] = React.useState<Post | null>(null);

  const posts: Post[] = [
    {
      id: 'jwt-auth',
      title: 'Implementing Secure JWT Authentication in Next.js',
      excerpt: 'A complete guide to adding stateless JWT authentication with refresh tokens, RBAC, and secure cookie storage to your Next.js applications.',
      content: 'Authentication is the backbone of any modern web application. In this article, I walk through a production-ready JWT setup using Next.js 15+ App Router.\n\nWe cover:\n• Access token + refresh token pattern\n• HttpOnly cookie storage for XSS protection\n• Role-based access control middleware\n• Silent refresh with interceptors\n• Revocation using a token blacklist\n\nBy the end, you will have a reusable `useAuth()` hook and protected route wrapper that works seamlessly with server components.',
      date: 'Oct 12, 2026',
      readTime: '8 min read',
      tags: ['Next.js', 'Security', 'JWT'],
      icon: '🔐',
    },
    {
      id: 'laravel-schema',
      title: 'Designing Scalable MySQL Schemas for Laravel',
      excerpt: 'Lessons learned from architecting relational schemas that handle millions of rows while maintaining query performance under 50ms.',
      content: 'When building ordering platforms like the Smart Digital Menu system, database design determines everything. Here is how I structure schemas for scale.\n\nKey principles:\n• Normalize up to 3NF, denormalize for read-heavy paths\n• Use composite indexes strategically (order matters)\n• Avoid N+1 queries with eager loading and select columns\n• Partition large tables by date\n• Use MySQL EXPLAIN ANALYZE regularly\n\nA quick win: always add indexes for foreign keys, plus composite indexes covering `(user_id, created_at)` for timestamp-sorted queries.',
      date: 'Oct 5, 2026',
      readTime: '6 min read',
      tags: ['Laravel', 'MySQL', 'Performance'],
      icon: '🗄️',
    },
    {
      id: 'framer-motion',
      title: 'Building an iOS-Style Portfolio OS with Framer Motion',
      excerpt: 'How I created the interactive Ubuntu/iOS-inspired portfolio you are looking at now, using layoutId animations and gesture handling.',
      content: 'Framer Motion makes complex UI transitions surprisingly simple. In this Portfolio OS, I use several advanced techniques:\n\n• `layoutId` for shared element transitions between an app icon and its full-screen container\n• `drag` with `dragConstraints` for horizontal page swiping\n• `AnimatePresence` for smooth mount/unmount of every panel\n• `Reorder.Group` for draggable home-screen apps\n• `useMotionValue` for parallax background offsets\n\nThe result is a native-app feel in the browser without any React Native code.',
      date: 'Sep 28, 2026',
      readTime: '10 min read',
      tags: ['Framer Motion', 'React', 'UI/UX'],
      icon: '✨',
    },
    {
      id: 'offline-first',
      title: 'Offline-First Mobile Apps with Flutter & SQLite',
      excerpt: 'Why offline-first architecture matters for emerging markets, and how to implement it cleanly with Flutter, SQLite, and background sync.',
      content: 'In regions with intermittent connectivity, offline-first is not optional. Here is the pattern I used for the Smart Attendance System.\n\nArchitecture:\n• Local SQLite as the source of truth\n• Repository pattern with a sync queue\n• Conflict resolution via timestamps + last-write-wins\n• Background sync triggered by connectivity changes\n• UI always reads from local DB (instant responses)\n\nThe result is an app that feels instant, works on a plane, and syncs automatically when back online.',
      date: 'Sep 15, 2026',
      readTime: '7 min read',
      tags: ['Flutter', 'Mobile', 'SQLite'],
      icon: '📱',
    },
  ];

  if (selected) {
    return (
      <div className={`space-y-6 animate-fade-in pb-12 max-w-3xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <button onClick={() => setSelected(null)} className={`group flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg w-max ${isDark ? 'text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800' : 'text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50'}`}>
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Blog
        </button>
        <div className={`rounded-3xl border p-6 sm:p-10 shadow-sm ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}>
          <div className="text-5xl mb-4">{selected.icon}</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {selected.tags.map(t => (
              <span key={t} className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>{t}</span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">{selected.title}</h1>
          <div className={`flex items-center gap-4 text-xs font-medium border-b pb-6 mb-6 ${isDark ? 'text-slate-400 border-slate-700' : 'text-gray-400 border-gray-100'}`}>
            <span>📅 {selected.date}</span>
            <span>📖 {selected.readTime}</span>
          </div>
          <p className={`text-base sm:text-lg leading-relaxed whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{selected.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 animate-fade-in pb-12 max-w-3xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="border-b pb-6 border-opacity-20 border-gray-500">
        <h3 className="text-3xl font-extrabold tracking-tight mb-2">Blog & Articles</h3>
        <p className={`text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Thoughts, tutorials, and lessons from building real full-stack applications.</p>
      </div>
      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(post)}
            className={`group p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:shadow-lg' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${isDark ? 'bg-slate-900/70 border border-slate-700' : 'bg-gray-50 border border-gray-200'}`}>{post.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map(t => (
                    <span key={t} className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>{t}</span>
                  ))}
                </div>
                <h4 className="text-lg font-bold group-hover:text-blue-500 transition-colors mb-1">{post.title}</h4>
                <p className={`text-sm leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{post.excerpt}</p>
                <div className={`flex items-center gap-4 text-[11px] mt-3 font-medium ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                  <span>📅 {post.date}</span>
                  <span>📖 {post.readTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 20. Certificates Gallery with lightbox
const CertsContent = ({ isDark }: { isDark: boolean }) => {
  type Cert = { id: string; title: string; issuer: string; date: string; image: string; icon: string; color: string };
  const [lightbox, setLightbox] = React.useState<Cert | null>(null);

  const certs: Cert[] = [
    { id: 'fullstack', title: 'Full-Stack Web Development', issuer: 'Bahir Dar Institute of Technology', date: 'Jun 2026', image: '/certs/fullstack.jpg', icon: '🌐', color: 'from-blue-500 to-indigo-600' },
    { id: 'security', title: 'Computer Security & OS Fundamentals', issuer: 'Bahir Dar Institute of Technology', date: 'Mar 2026', image: '/certs/security.jpg', icon: '🛡️', color: 'from-emerald-500 to-teal-600' },
    { id: 'mobile', title: 'Mobile App Architecture', issuer: 'Bahir Dar Institute of Technology', date: 'Jan 2026', image: '/certs/mobile.jpg', icon: '📱', color: 'from-purple-500 to-fuchsia-600' },
    { id: 'networking', title: 'Networking & Subnetting', issuer: 'Cisco Networking Academy', date: 'Nov 2025', image: '/certs/networking.jpg', icon: '🌐', color: 'from-cyan-500 to-blue-600' },
    { id: 'git', title: 'Git & GitHub Essentials', issuer: 'GitHub Education', date: 'Aug 2025', image: '/certs/git.jpg', icon: '🐙', color: 'from-slate-600 to-slate-800' },
    { id: 'sql', title: 'Database Design with MySQL', issuer: 'Bahir Dar Institute of Technology', date: 'May 2025', image: '/certs/sql.jpg', icon: '🗄️', color: 'from-orange-500 to-red-600' },
  ];

  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  return (
    <div className={`space-y-8 animate-fade-in pb-12 max-w-5xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="border-b pb-6 border-opacity-20 border-gray-500">
        <h3 className="text-3xl font-extrabold tracking-tight mb-2">Certificates & Achievements</h3>
        <p className={`text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>A verified collection of my professional certifications and academic achievements. Click any certificate to view it in full size.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            onClick={() => setLightbox(cert)}
            className={`group relative aspect-[4/3] rounded-2xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? 'bg-slate-800/60 border-slate-700 hover:border-slate-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}
          >
            {!imageErrors[cert.id] ? (
              <img src={cert.image} alt={cert.title} onError={() => setImageErrors(p => ({ ...p, [cert.id]: true }))} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${cert.color} flex items-center justify-center relative`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <span className="text-6xl drop-shadow-lg">{cert.icon}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
              <h4 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2">{cert.title}</h4>
              <p className="text-white/70 text-[10px] font-medium">{cert.issuer}</p>
              <p className="text-white/50 text-[10px] mt-0.5">{cert.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 text-white/80 hover:text-white w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <div className="rounded-3xl overflow-hidden bg-slate-900 aspect-[4/3] flex items-center justify-center">
                {!imageErrors[lightbox.id] ? (
                  <img src={lightbox.image} alt={lightbox.title} className="w-full h-full object-contain" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${lightbox.color} flex flex-col items-center justify-center p-8 text-center`}>
                    <span className="text-7xl mb-4">{lightbox.icon}</span>
                    <h3 className="text-white text-2xl font-bold">{lightbox.title}</h3>
                    <p className="text-white/70 text-sm mt-2">{lightbox.issuer}</p>
                    <p className="text-white/50 text-xs mt-1">{lightbox.date}</p>
                    <p className="text-white/40 text-[10px] mt-6 font-mono">Place image at /public{lightbox.image}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-white font-bold text-lg">{lightbox.title}</h3>
                <p className="text-white/60 text-xs mt-1">{lightbox.issuer} • {lightbox.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 21. Testimonials App
const TestimonialsContent = ({ isDark }: { isDark: boolean }) => {
  const testimonials = [
    { id: 't1', name: 'Dr. Abebe Tesfaye', role: 'Professor, BiT', message: 'Melkamu was one of my brightest students. His capstone project — the Internship Placement System — demonstrated exceptional architectural thinking beyond his years.', avatar: '👨‍🏫', rating: 5, color: 'from-blue-500 to-indigo-600' },
    { id: 't2', name: 'Sara Hailu', role: 'Product Manager, Cafe Client', message: 'Our cafe ordering platform was delivered on time and worked flawlessly. Melkamu understood our business needs immediately and suggested improvements we had not considered.', avatar: '👩‍💼', rating: 5, color: 'from-rose-500 to-pink-600' },
    { id: 't3', name: 'Yohannes Bekele', role: 'Team Lead, Software House', message: 'I have collaborated with Melkamu on multiple projects. His code is always clean, well-documented, and built to scale. Highly recommended for any full-stack role.', avatar: '👨‍💻', rating: 5, color: 'from-emerald-500 to-teal-600' },
    { id: 't4', name: 'Meron Tadesse', role: 'Fellow Developer', message: 'Beyond the code, Melkamu is a genuinely great collaborator. He explains complex ideas clearly and is always eager to help the team.', avatar: '👩‍💻', rating: 5, color: 'from-purple-500 to-fuchsia-600' },
    { id: 't5', name: 'Kalkidan Assefa', role: 'CTO, Startup Venture', message: 'We hired Melkamu for a 3-month contract. He delivered a production-ready system, trained our team, and left behind excellent documentation. Worth every birr.', avatar: '👨‍💼', rating: 5, color: 'from-amber-500 to-orange-600' },
  ];

  return (
    <div className={`space-y-8 animate-fade-in pb-12 max-w-4xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="border-b pb-6 border-opacity-20 border-gray-500">
        <h3 className="text-3xl font-extrabold tracking-tight mb-2">Reviews & Testimonials</h3>
        <p className={`text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Kind words from professors, clients, and collaborators I have had the pleasure of working with.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`relative p-6 rounded-3xl border transition-all hover:shadow-lg ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-slate-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}
          >
            <div className="absolute -top-3 left-6 text-6xl text-blue-500/20 font-serif leading-none">"</div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-2xl shadow-md`}>{t.avatar}</div>
              <div>
                <h4 className="font-bold text-sm">{t.name}</h4>
                <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{t.role}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{t.message}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 22. Career Timeline App
const TimelineContent = ({ isDark }: { isDark: boolean }) => {
  const events = [
    { year: '2020', title: 'Started B.Sc. in Computer Science', desc: 'Enrolled at Bahir Dar Institute of Technology, began my journey into programming with C++ and Python.', icon: '🎓', color: 'bg-blue-500' },
    { year: '2022', title: 'First Web Project', desc: 'Built my first full-stack application — a simple student portal using PHP and MySQL.', icon: '🌐', color: 'bg-emerald-500' },
    { year: '2023', title: 'Learned React & Node.js', desc: 'Dove into modern JavaScript ecosystem. Completed several online courses and personal projects.', icon: '⚛️', color: 'bg-cyan-500' },
    { year: '2024', title: 'Mobile Development', desc: 'Discovered Flutter and React Native. Built the Smart Attendance System with offline-first architecture.', icon: '📱', color: 'bg-purple-500' },
    { year: '2025', title: 'Lead Developer at BiT', desc: 'Led a team building the Internship Placement and Management System for Bahir Dar Institute of Technology.', icon: '👨‍💻', color: 'bg-indigo-500' },
    { year: '2026', title: 'Software Architect', desc: 'Designed and shipped the Smart Digital Menu & Ordering Platform for commercial cafes.', icon: '🏗️', color: 'bg-orange-500' },
    { year: '2026', title: 'B.Sc. Graduated', desc: 'Graduated with a Bachelor of Science in Computer Science. Class of 2026.', icon: '🎉', color: 'bg-rose-500' },
    { year: 'Now', title: 'Full-Stack Developer', desc: 'Building enterprise web apps, mobile solutions, and this Portfolio OS.', icon: '🚀', color: 'bg-gradient-to-br from-blue-500 to-purple-500' },
  ];

  return (
    <div className={`space-y-8 animate-fade-in pb-12 max-w-3xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="border-b pb-6 border-opacity-20 border-gray-500">
        <h3 className="text-3xl font-extrabold tracking-tight mb-2">Career Timeline</h3>
        <p className={`text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>A visual journey from my first "Hello World" to full-stack production systems.</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className={`absolute left-6 top-2 bottom-2 w-0.5 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}></div>

        <div className="space-y-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="relative pl-16"
            >
              <div className={`absolute left-0 top-0 w-12 h-12 rounded-2xl ${event.color} flex items-center justify-center text-2xl shadow-lg ring-4 ${isDark ? 'ring-slate-900' : 'ring-white'}`}>
                {event.icon}
              </div>
              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md mb-2 ${isDark ? 'bg-slate-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>{event.year}</span>
                <h4 className="text-lg font-bold mb-1">{event.title}</h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============ EXISTING COMPONENTS (unchanged) ============

const UIUXContent = () => (
  <div className="space-y-10 animate-fade-in pb-12">
    <div className="space-y-2">
      <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Interface & Experience Design</h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-xl">Translating complex system requirements into intuitive, user-centric interfaces.</p>
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b pb-2"><span className="text-2xl">📊</span><h4 className="text-xl font-bold text-gray-800">Organizational Dashboards</h4></div>
      <p className="text-sm text-gray-600">UI layouts designed for robust management systems.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="group relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 aspect-video flex items-center justify-center cursor-pointer"><span className="text-slate-400 font-medium group-hover:scale-110 transition-transform">Financial View Mockup</span></div>
        <div className="group relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 aspect-video flex items-center justify-center cursor-pointer"><span className="text-slate-400 font-medium group-hover:scale-110 transition-transform">Inventory Layout</span></div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b pb-2"><span className="text-2xl">✨</span><h4 className="text-xl font-bold text-gray-800">Visual Assets & Logos</h4></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
        <div className="rounded-2xl bg-pink-50 border border-pink-100 aspect-square flex items-center justify-center"><span className="text-pink-300 text-sm font-medium">Logo 1</span></div>
        <div className="rounded-2xl bg-purple-50 border border-purple-100 aspect-square flex items-center justify-center"><span className="text-purple-300 text-sm font-medium">App Icon</span></div>
        <div className="rounded-2xl bg-blue-50 border border-blue-100 aspect-square flex items-center justify-center"><span className="text-blue-300 text-sm font-medium">Palette</span></div>
      </div>
    </div>
  </div>
);

const ExperienceContent = () => (
  <div className="space-y-8 animate-fade-in pb-12">
    <div className="space-y-2">
      <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Professional Experience</h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-xl">A timeline of my work architecting and developing full-stack applications.</p>
    </div>
    <div className="relative border-l-2 border-gray-100 ml-3 space-y-10 mt-8">
      {[
        { role: 'Full-Stack Developer (Contract)', date: 'Sep 2026 – Present', company: 'Organizational Management System', items: ['Developing a comprehensive web-based management system with member tracking and financial recordkeeping.', 'Designing executive dashboard mockups and implementing frontend architecture using Next.js.', 'Integrating robust inventory management modules for operational tracking.'], color: 'bg-teal-500' },
        { role: 'Software Architect', date: 'Aug 2026', company: 'Smart Digital Menu & Ordering Platform', items: ['Architected a digital ordering platform using Laravel backend and Next.js frontend.', 'Designed and optimized relational database schemas using MySQL.', 'Built real-time order tracking mechanisms and API routes.'], color: 'bg-gray-300' },
        { role: 'Lead Developer', date: 'Dec 2025 – May 2026', company: 'Bahir Dar Institute of Technology (BiT)', items: ['Designed and built an Internship Placement and Management System from the ground up.', 'Implemented secure RBAC and database integrations utilizing MongoDB.', 'Created comprehensive system documentation with UML diagrams and use cases.'], color: 'bg-gray-300' }
      ].map((exp, i) => (
        <div key={i} className="pl-6 relative">
          <div className={`absolute w-4 h-4 ${exp.color} rounded-full -left-[9px] top-1 ring-4 ring-white shadow-sm`}></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h4 className="text-xl font-bold text-gray-800">{exp.role}</h4>
            <span className={`text-xs font-bold ${i === 0 ? 'text-teal-600 bg-teal-50' : 'text-gray-600 bg-gray-100'} px-2.5 py-1 rounded-md w-max mt-2 sm:mt-0 uppercase tracking-wider`}>{exp.date}</span>
          </div>
          <span className="text-sm font-semibold text-gray-500 block mb-3">{exp.company}</span>
          <ul className="text-sm text-gray-600 list-disc pl-4 space-y-2"><>{exp.items.map((it, j) => <li key={j}>{it}</li>)}</></ul>
        </div>
      ))}
    </div>
  </div>
);

type FileNode = { type: 'dir' | 'file'; children?: Record<string, FileNode>; content?: string; };

const TerminalContent = () => {
  const fileSystem: Record<string, FileNode> = {
    '~': { type: 'dir', children: {
      'portfolio': { type: 'dir', children: {
        'README.md': { type: 'file', content: '# Portfolio OS\nBuilt with Next.js, React, and Tailwind CSS.' },
        'package.json': { type: 'file', content: '{\n  "name": "portfolio",\n  "version": "1.0.0"\n}' },
      }},
      'projects': { type: 'dir', children: {
        'bit-internship.txt': { type: 'file', content: 'Role: Lead Developer (Dec 2025 - May 2026)\nBuilt an Internship Placement System.' },
        'digital-menu.txt': { type: 'file', content: 'Role: Software Architect (Aug 2026)\nSmart Digital Menu & Ordering Platform.' },
        'org-system.txt': { type: 'file', content: 'Role: Full-Stack Developer (Sep 2026 - Present)\nComprehensive management system.' }
      }},
      'about.txt': { type: 'file', content: 'Name: Melaku\nRole: Full-Stack & Mobile Developer\nLocation: Bahir Dar, Ethiopia\nOS: Ubuntu 22.04 on HP EliteBook 840 G6' }
    }}
  };

  const [currentPath, setCurrentPath] = React.useState<string[]>(['~']);
  const [history, setHistory] = React.useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'Welcome to Ubuntu 22.04 LTS (GNU/Linux x86_64)' },
    { type: 'output', text: ' * Documentation:  https://help.ubuntu.com' },
    { type: 'output', text: ' ' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = React.useState('');
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const getDir = (pathArray: string[]): FileNode => {
    let curr = fileSystem['~'];
    for (let i = 1; i < pathArray.length; i++) curr = curr.children![pathArray[i]];
    return curr;
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmdString = input.trim();
      const args = cmdString.split(' ').filter(Boolean);
      const cmd = args[0]?.toLowerCase();
      const promptPath = currentPath.join('/').replace('~', '~');
      const newHistory: { type: 'input' | 'output'; text: string }[] = [...history, { type: 'input', text: `hp@hp-HP-EliteBook-840-G6:${promptPath}$ ${cmdString}` }];
      if (!cmd) { setHistory(newHistory); setInput(''); return; }
      const currentDirObj = getDir(currentPath);
      switch (cmd) {
        case 'clear': setHistory([]); setInput(''); return;
        case 'help': newHistory.push({ type: 'output', text: 'Commands: ls, cd, pwd, cat, whoami, clear' }); break;
        case 'pwd': newHistory.push({ type: 'output', text: `/home/hp/${currentPath.slice(1).join('/')}`.replace(/\/$/, '') }); break;
        case 'whoami': newHistory.push({ type: 'output', text: 'hp' }); break;
        case 'ls': {
          const contents = Object.keys(currentDirObj.children || {});
          if (contents.length === 0) newHistory.push({ type: 'output', text: '' });
          else {
            const formatted = contents.map(item => currentDirObj.children![item].type === 'dir' ? `<dir> ${item}` : `      ${item}`).join('\n');
            newHistory.push({ type: 'output', text: formatted });
          }
          break;
        }
        case 'cd': {
          const target = args[1];
          if (!target || target === '~') setCurrentPath(['~']);
          else if (target === '..') { if (currentPath.length > 1) setCurrentPath(currentPath.slice(0, -1)); }
          else if (currentDirObj.children && currentDirObj.children[target]) {
            if (currentDirObj.children[target].type === 'dir') setCurrentPath([...currentPath, target]);
            else newHistory.push({ type: 'output', text: `bash: cd: ${target}: Not a directory` });
          } else newHistory.push({ type: 'output', text: `bash: cd: ${target}: No such file or directory` });
          break;
        }
        case 'cat': {
          const fileTarget = args[1];
          if (!fileTarget) newHistory.push({ type: 'output', text: 'cat: missing operand' });
          else if (currentDirObj.children && currentDirObj.children[fileTarget]) {
            if (currentDirObj.children[fileTarget].type === 'file') newHistory.push({ type: 'output', text: currentDirObj.children[fileTarget].content || '' });
            else newHistory.push({ type: 'output', text: `cat: ${fileTarget}: Is a directory` });
          } else newHistory.push({ type: 'output', text: `cat: ${fileTarget}: No such file or directory` });
          break;
        }
        case 'sudo': newHistory.push({ type: 'output', text: '[sudo] password for hp: ' }); newHistory.push({ type: 'output', text: 'Access denied.' }); break;
        default: newHistory.push({ type: 'output', text: `${cmd}: command not found` });
      }
      setHistory(newHistory); setInput('');
    }
  };

  const displayPath = currentPath.join('/').replace('~', '~');

  return (
    <div className="h-full w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-sm animate-fade-in border border-gray-700 mt-2">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-900 shrink-0">
        <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
        <div className="text-gray-400 text-xs font-semibold">hp@hp-HP-EliteBook-840-G6: {displayPath}</div>
        <div className="w-12"></div>
      </div>
      <div className="p-4 flex-1 overflow-y-auto text-gray-200" onClick={() => document.getElementById('terminal-input')?.focus()}>
        {history.map((line, index) => (
          <div key={index} className="mb-1 whitespace-pre-wrap">
            {line.type === 'input' ? <span className="text-white">{line.text}</span>
              : line.text.includes('<dir>') ? <span className="text-blue-400 font-bold">{line.text.replace(/<dir> /g, '')}</span>
              : <span className={line.text.includes('Access denied') || line.text.includes('not found') || line.text.includes('No such') ? 'text-red-400' : 'text-gray-300'}>{line.text}</span>}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-green-500 font-bold mr-2 whitespace-nowrap">hp@hp-HP-EliteBook-840-G6:{displayPath}$</span>
          <input id="terminal-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="flex-1 bg-transparent outline-none text-white font-mono w-full" autoFocus autoComplete="off" spellCheck="false" />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const GitHubContent = () => {
  const repos = [
    { name: 'org-management-system', desc: 'Comprehensive web-based management system.', tech: 'Next.js', color: 'bg-black' },
    { name: 'smart-cafe-menu', desc: 'Digital ordering platform backend.', tech: 'Laravel', color: 'bg-red-500' },
    { name: 'bit-internship-portal', desc: 'Placement and management system.', tech: 'MongoDB', color: 'bg-green-500' },
    { name: 'portfolio-os', desc: 'Interactive Ubuntu/Android inspired portfolio.', tech: 'TypeScript', color: 'bg-blue-500' },
  ];
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-200 pb-6">
        <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-white shadow-lg flex items-center justify-center text-4xl">👨‍💻</div>
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Melkamu</h3>
          <p className="text-gray-500 text-lg mb-3">@melaku-git</p>
          <p className="text-gray-700 text-sm max-w-md">Full-Stack & Mobile Application Developer.</p>
        </div>
        <a href="https://github.com/melaku-git" target="_blank" rel="noopener noreferrer" className="mt-4 sm:mt-0 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"><span>🐙</span> Visit Profile</a>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-4">📌 Pinned Repositories</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 hover:border-gray-400 hover:shadow-md transition-all bg-white group cursor-pointer">
              <div className="flex items-center gap-2 mb-2"><span className="text-slate-500">📁</span><span className="text-blue-600 font-semibold group-hover:underline">{repo.name}</span></div>
              <p className="text-xs text-gray-600 mb-4">{repo.desc}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium"><span className={`w-2.5 h-2.5 rounded-full ${repo.color}`}></span>{repo.tech}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type NewsItem = { title: string; summary: string; content: string; category: string; date: string; readTime: string; color: string; };
const TechNewsContent = () => {
  const [selectedArticle, setSelectedArticle] = React.useState<NewsItem | null>(null);
  const newsItems: NewsItem[] = [
    { title: "Next.js 16.4 Released: Turbopack by Default", summary: "Massive build speed improvements and advanced partial prefetching.", content: "Vercel has officially announced Next.js 16.4, making Turbopack the default bundler.", category: "Web Dev", date: "2 hours ago", readTime: "4 min read", color: "bg-blue-100 text-blue-700" },
    { title: "The Rise of AI in Frontend Prototyping", summary: "Developers using prompt engineering and generative UI tools.", content: "The gap between UI/UX design and frontend development is shrinking.", category: "AI & ML", date: "5 hours ago", readTime: "6 min read", color: "bg-purple-100 text-purple-700" },
    { title: "Ubuntu 26.04 LTS Adopts New Developer Workflows", summary: "Stricter default firewall configurations.", content: "Ubuntu remains the dominant OS for backend development.", category: "Linux / OS", date: "12 hours ago", readTime: "5 min read", color: "bg-orange-100 text-orange-700" },
    { title: "Securing FastAPI and MongoDB Architectures", summary: "Best practices for robust authentication.", content: "As digital platforms scale, RBAC is non-negotiable.", category: "Cybersecurity", date: "2 days ago", readTime: "7 min read", color: "bg-red-100 text-red-700" }
  ];
  if (selectedArticle) {
    return (
      <div className="space-y-6 animate-fade-in pb-12">
        <button onClick={() => setSelectedArticle(null)} className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg w-max"><span className="group-hover:-translate-x-1">←</span> Back to Feed</button>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4 ${selectedArticle.color}`}>{selectedArticle.category}</span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">{selectedArticle.title}</h2>
          <div className="flex items-center gap-4 text-xs font-medium text-gray-400 border-b border-gray-100 pb-6 mb-6"><span>🕒 {selectedArticle.date}</span><span>📖 {selectedArticle.readTime}</span></div>
          <p className="text-gray-700 text-base leading-relaxed">{selectedArticle.content}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-4">
        <div><h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tech Pulse</h3><p className="text-gray-500 text-sm mt-1">Curated developer news.</p></div>
        <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 w-max"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div><span className="text-xs font-semibold text-red-700 uppercase tracking-wider">Live Feed</span></div>
      </div>
      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <div key={index} onClick={() => setSelectedArticle(item)} className="group p-5 rounded-2xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-3"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${item.color}`}>{item.category}</span><span className="text-xs text-gray-400">🕒 {item.date}</span></div>
            <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">{item.title}</h4>
            <p className="text-sm text-gray-600 mb-4">{item.summary}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50"><span className="text-xs text-gray-500">📖 {item.readTime}</span><span className="text-sm font-semibold text-blue-500">Read →</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

type OSSettings = { darkMode: boolean; animations: boolean; wifi: boolean; bluetooth: boolean; devMode: boolean; wallpaperId: string; };

const SettingsContent = ({ settings, setSettings }: { settings: OSSettings, setSettings: React.Dispatch<React.SetStateAction<OSSettings>> }) => {
  const [activeTab, setActiveTab] = React.useState('General');
  const categories = ['General', 'Network', 'Display', 'System', 'Advanced'];
  const isDark = settings.darkMode;
  const handleToggle = (key: keyof OSSettings) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  const ToggleSwitch = ({ isOn, onClick }: { isOn: boolean, onClick: () => void }) => (
    <div onClick={onClick} className={`w-12 h-6 sm:w-14 sm:h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-green-500' : (isDark ? 'bg-slate-600' : 'bg-gray-300')}`}>
      <motion.div layout animate={{ x: isOn ? (typeof window !== 'undefined' && window.innerWidth > 640 ? 28 : 24) : 0 }} transition={{ duration: settings.animations ? 0.3 : 0 }} className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-md" />
    </div>
  );
  return (
    <div className={`space-y-6 animate-fade-in pb-12 max-w-3xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div><h3 className="text-3xl font-extrabold tracking-tight">Settings</h3></div>
      <div className="flex overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
        <div className={`flex space-x-2 p-1.5 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
          {categories.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`relative px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${activeTab === tab ? (isDark ? 'text-black' : 'text-gray-900') : (isDark ? 'text-gray-400' : 'text-gray-500')}`}>
              {activeTab === tab && <motion.div layoutId="settings-tab-pill" className="absolute inset-0 bg-white rounded-lg shadow-sm" initial={false} transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
            {activeTab === 'General' && (
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-lg flex items-center gap-6 relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-3xl z-10 backdrop-blur-md">👨‍💻</div>
                <div className="z-10"><h4 className="text-xl font-bold">Melkamu</h4><p className="text-sm text-slate-300 font-medium mt-1">Administrator • Developer Account</p></div>
              </div>
            )}
            {activeTab === 'Network' && (
              <div className={`border rounded-3xl shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-slate-700' : 'border-gray-50'}`}>
                  <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-sm">📶</div><div><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Wi-Fi</p><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{settings.wifi ? 'Connected' : 'Off'}</p></div></div>
                  <ToggleSwitch isOn={settings.wifi} onClick={() => handleToggle('wifi')} />
                </div>
                <div className={`px-6 py-4 flex items-center justify-between ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-sm">ᛒ</div><div><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Bluetooth</p><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{settings.bluetooth ? 'Discoverable' : 'Off'}</p></div></div>
                  <ToggleSwitch isOn={settings.bluetooth} onClick={() => handleToggle('bluetooth')} />
                </div>
              </div>
            )}
            {activeTab === 'Display' && (
              <div className="space-y-6">
                <div className={`border rounded-3xl shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                  <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-slate-700' : 'border-gray-50'}`}>
                    <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white text-sm">🌙</div><div><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Dark Mode</p><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>System theme override</p></div></div>
                    <ToggleSwitch isOn={settings.darkMode} onClick={() => handleToggle('darkMode')} />
                  </div>
                  <div className={`px-6 py-4 flex items-center justify-between ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white text-sm">✨</div><div><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>OS Animations</p><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Enable fluid transitions</p></div></div>
                    <ToggleSwitch isOn={settings.animations} onClick={() => handleToggle('animations')} />
                  </div>
                </div>
                <div className={`border rounded-3xl shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                  <div className={`px-6 py-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-50'}`}>
                    <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">🖼️</div><div><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Wallpaper</p><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Choose your background</p></div></div>
                  </div>
                  <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {WALLPAPERS.map((wp) => (
                      <button key={wp.id} onClick={() => setSettings(prev => ({ ...prev, wallpaperId: wp.id }))} className={`relative group rounded-2xl overflow-hidden border-2 transition-all ${settings.wallpaperId === wp.id ? 'border-blue-500 shadow-lg scale-[1.02]' : (isDark ? 'border-slate-700 hover:border-slate-500' : 'border-gray-200 hover:border-gray-400')}`}>
                        <div className={`aspect-[9/16] bg-gradient-to-br ${wp.preview}`}></div>
                        <div className={`absolute inset-x-0 bottom-0 py-1.5 text-[10px] font-bold text-center ${isDark ? 'bg-slate-900/80 text-white' : 'bg-white/80 text-gray-800'}`}>{wp.name}</div>
                        {settings.wallpaperId === wp.id && <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">✓</div>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'System' && (
              <div className={`border rounded-3xl shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-slate-700' : 'border-gray-50'}`}>
                  <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm">💻</div><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Hardware</p></div>
                  <span className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>HP EliteBook 840 G6</span>
                </div>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-slate-700' : 'border-gray-50'}`}>
                  <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white text-sm">🐧</div><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Operating System</p></div>
                  <span className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Ubuntu 22.04 LTS</span>
                </div>
              </div>
            )}
            {activeTab === 'Advanced' && (
              <div className={`border rounded-3xl shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                <div className={`px-6 py-4 flex items-center justify-between ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white text-sm">⚠️</div><div><p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Developer Mode</p><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Enable advanced root features</p></div></div>
                  <ToggleSwitch isOn={settings.devMode} onClick={() => handleToggle('devMode')} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const BrowserContent = ({ isDark }: { isDark: boolean }) => {
  const [history, setHistory] = React.useState<string[]>(['https://melkamu.dev/about']);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [inputUrl, setInputUrl] = React.useState('https://melkamu.dev/about');
  const [isLoading, setIsLoading] = React.useState(false);
  const [googleSearch, setGoogleSearch] = React.useState('Melkamu Full Stack Developer');
  const currentUrl = history[currentIndex];
  const navigateTo = (url: string) => { setInputUrl(url); setIsLoading(true); setTimeout(() => { const h = history.slice(0, currentIndex + 1); h.push(url); setHistory(h); setCurrentIndex(h.length - 1); setIsLoading(false); }, 800); };
  const goBack = () => { if (currentIndex > 0) { setIsLoading(true); setTimeout(() => { setCurrentIndex(currentIndex - 1); setInputUrl(history[currentIndex - 1]); setIsLoading(false); }, 400); } };
  const goForward = () => { if (currentIndex < history.length - 1) { setIsLoading(true); setTimeout(() => { setCurrentIndex(currentIndex + 1); setInputUrl(history[currentIndex + 1]); setIsLoading(false); }, 400); } };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { let u = inputUrl.trim().toLowerCase(); if (!u.includes('.')) u = `${u}.com`; if (!u.startsWith('http')) u = `https://${u}`; navigateTo(u); } };
  const renderViewport = () => {
    if (currentUrl.includes('melkamu.dev')) return (
      <div className="p-8 max-w-4xl mx-auto animate-fade-in">
        <h1 className={`text-4xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Hi, I'm Melkamu.</h1>
        <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Full-Stack & Mobile Application Developer based in Bahir Dar, Ethiopia.</p>
      </div>
    );
    if (currentUrl === 'https://google.com' || currentUrl === 'https://google.com/') return (
      <div className="h-full flex flex-col items-center justify-center animate-fade-in pb-20">
        <h1 className="text-6xl font-bold mb-6"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></h1>
        <div className={`w-full max-w-xl flex items-center px-4 py-3 rounded-full border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <span className="text-gray-400 mr-3">🔍</span>
          <input type="text" value={googleSearch} onChange={(e) => setGoogleSearch(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') navigateTo(`https://google.com/search?q=${encodeURIComponent(googleSearch)}`); }} className={`bg-transparent flex-1 outline-none text-sm ${isDark ? 'text-white' : 'text-gray-800'}`} />
        </div>
      </div>
    );
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-4 pb-20">
        <span className="text-6xl mb-4">🌐</span>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>This site can't be reached</h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{currentUrl}</p>
      </div>
    );
  };
  return (
    <div className={`h-full flex flex-col rounded-xl overflow-hidden border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
      <div className={`flex flex-col ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
        <div className={`flex items-center gap-3 px-3 py-2 border-y ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
          <div className={`flex gap-3 text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <button onClick={goBack} disabled={currentIndex === 0} className={currentIndex === 0 ? 'opacity-30' : 'hover:text-blue-500'}>←</button>
            <button onClick={goForward} disabled={currentIndex === history.length - 1} className={currentIndex === history.length - 1 ? 'opacity-30' : 'hover:text-blue-500'}>→</button>
          </div>
          <div className={`flex-1 flex items-center px-3 py-1.5 rounded-full text-sm border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-100 border-gray-200 text-gray-900'}`}>
            <span className="text-green-500 mr-2 text-xs">🔒</span>
            <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 bg-transparent outline-none" />
          </div>
        </div>
      </div>
      <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>{renderViewport()}</div>
    </div>
  );
};

const ContactContent = ({ isDark }: { isDark: boolean }) => {
  const [formState, setFormState] = React.useState<'idle' | 'sending' | 'sent'>('idle');
  const handleSend = (e: React.FormEvent) => { e.preventDefault(); setFormState('sending'); setTimeout(() => setFormState('sent'), 1500); setTimeout(() => setFormState('idle'), 4000); };
  const contactLinks = [
    { name: 'Email', value: 'melkamuderso147@gmail.com', url: 'mailto:melkamuderso147@gmail.com', icon: '📧', lightTheme: 'bg-rose-50 border-rose-100 text-rose-600', darkTheme: 'bg-rose-500/10 border-rose-500/20 text-rose-400' },
    { name: 'LinkedIn', value: 'melkamu-derso', url: 'https://www.linkedin.com/in/melkamu-derso-85915a418', icon: '💼', lightTheme: 'bg-blue-50 border-blue-100 text-blue-600', darkTheme: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
    { name: 'GitHub', value: '@melaku-git', url: 'https://github.com/melaku-git', icon: '🐙', lightTheme: 'bg-slate-100 border-slate-200 text-slate-700', darkTheme: 'bg-slate-700/50 border-slate-600 text-slate-300' },
    { name: 'Telegram', value: '@falconn19', url: 'https://t.me/falconn19', icon: '✈️', lightTheme: 'bg-sky-50 border-sky-100 text-sky-600', darkTheme: 'bg-sky-500/10 border-sky-500/20 text-sky-400' }
  ];
  return (
    <div className={`space-y-10 animate-fade-in pb-12 max-w-4xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="text-center space-y-3 pt-4">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl shadow-sm border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'}`}>👋</div>
        <h3 className="text-3xl font-extrabold tracking-tight">Let's Connect</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactLinks.map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-500' : 'bg-white border-gray-100 hover:border-gray-300'}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border ${isDark ? link.darkTheme : link.lightTheme}`}>{link.icon}</div>
            <div className="flex-1"><h4 className="text-sm font-bold">{link.name}</h4><p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{link.value}</p></div>
          </a>
        ))}
      </div>
      <form onSubmit={handleSend} className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
        <div className="space-y-4">
          <input required type="text" placeholder="Your Name" className={`w-full px-5 py-3.5 rounded-xl border outline-none ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
          <input required type="email" placeholder="Your Email" className={`w-full px-5 py-3.5 rounded-xl border outline-none ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
          <textarea required placeholder="Message" rows={4} className={`w-full px-5 py-3.5 rounded-xl border outline-none resize-none ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
          <button type="submit" disabled={formState !== 'idle'} className={`w-full py-4 rounded-xl font-bold ${formState === 'sent' ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
            {formState === 'idle' ? 'Send Message 🚀' : formState === 'sending' ? 'Sending...' : 'Sent! ✅'}
          </button>
        </div>
      </form>
    </div>
  );
};

const ArchitectureContent = ({ isDark }: { isDark: boolean }) => (
  <div className={`space-y-8 animate-fade-in pb-12 max-w-4xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
    <div><h3 className="text-3xl font-extrabold tracking-tight">System Architecture</h3><p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>High-level blueprints of the applications I have engineered.</p></div>
    <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className={`w-32 p-4 rounded-xl text-center border ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}`}><div className="text-2xl mb-1">📱</div><div className="text-xs font-bold">Client</div><div className="text-[10px] text-blue-500">Next.js UI</div></div>
        <div className={`w-40 p-4 rounded-xl text-center border ${isDark ? 'bg-red-900/20 border-red-500/30' : 'bg-red-50 border-red-100'}`}><div className="text-2xl mb-1">⚙️</div><div className="text-xs font-bold">Backend</div><div className="text-[10px] text-red-500">Laravel / Node.js</div></div>
        <div className={`w-32 p-4 rounded-xl text-center border ${isDark ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-100'}`}><div className="text-2xl mb-1">🗄️</div><div className="text-xs font-bold">Database</div><div className="text-[10px] text-blue-500">MySQL / MongoDB</div></div>
      </div>
    </div>
  </div>
);

const CourseworkContent = ({ isDark }: { isDark: boolean }) => (
  <div className={`space-y-8 animate-fade-in pb-12 max-w-3xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
    <div><h3 className="text-3xl font-extrabold tracking-tight">Academic Coursework</h3><p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Foundational computer science studies.</p></div>
    <div className="space-y-3">
      {['Data Structures & Algorithms', 'Programming Languages', 'Networking & Subnetting', 'Compiler Design', 'Automata Theory', 'Computational Complexity'].map((c, i) => (
        <div key={i} className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}><span className="font-bold">{c}</span></div>
      ))}
    </div>
  </div>
);

const EducationContent = ({ isDark }: { isDark: boolean }) => (
  <div className={`space-y-8 animate-fade-in pb-12 max-w-4xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
    <h3 className="text-3xl font-extrabold tracking-tight">Education & Credentials</h3>
    <div className="relative rounded-[2rem] overflow-hidden p-8 shadow-2xl">
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-slate-800 via-indigo-900/40 to-slate-900' : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700'}`}></div>
      <div className="relative z-10 text-white">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2">B.Sc. in Computer Science</h2>
        <p className="text-lg font-medium text-blue-100 flex items-center gap-2"><span>🎓</span> Bahir Dar Institute of Technology</p>
      </div>
    </div>
  </div>
);

const MobileAppsContent = ({ isDark }: { isDark: boolean }) => (
  <div className={`space-y-10 animate-fade-in pb-12 max-w-5xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
    <div><h3 className="text-3xl font-extrabold tracking-tight">Mobile Applications</h3><p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Native and cross-platform mobile solutions.</p></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {['Smart Cafe Ordering', 'BiT Student Portal', 'Inventory Scanner'].map((p, i) => (
        <div key={i} className={`rounded-2xl border p-6 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}>
          <span className="text-4xl">📱</span>
          <h4 className="text-lg font-bold mt-3">{p}</h4>
          <p className={`text-xs mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>React Native • Expo</p>
        </div>
      ))}
    </div>
  </div>
);

const TechStackContent = ({ isDark }: { isDark: boolean }) => {
  const skillCategories = [
    { title: "Frontend & UI", icon: "🎨", color: "pink", skills: [{ name: "Next.js & React", level: 85 }, { name: "Tailwind CSS", level: 90 }, { name: "Framer Motion", level: 75 }] },
    { title: "Backend & Architecture", icon: "⚙️", color: "blue", skills: [{ name: "Laravel (PHP)", level: 80 }, { name: "Node.js & Express", level: 75 }, { name: "FastAPI (Python)", level: 60 }] },
    { title: "Database Systems", icon: "🗄️", color: "emerald", skills: [{ name: "MySQL", level: 90 }, { name: "MongoDB", level: 75 }, { name: "PostgreSQL", level: 60 }] },
    { title: "Environment & DevOps", icon: "🐧", color: "orange", skills: [{ name: "VS Code", level: 95 }, { name: "Git & GitHub", level: 85 }, { name: "Terminal / CLI", level: 80 }] }
  ];
  const getColorClasses = (color: string, isDark: boolean, type: 'bg' | 'text' | 'border' | 'bar') => {
    const maps: Record<string, Record<string, string>> = {
      pink: { bg: isDark ? 'bg-pink-500/10' : 'bg-pink-50', text: isDark ? 'text-pink-400' : 'text-pink-600', border: isDark ? 'border-pink-500/20' : 'border-pink-200', bar: 'bg-pink-500' },
      blue: { bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50', text: isDark ? 'text-blue-400' : 'text-blue-600', border: isDark ? 'border-blue-500/20' : 'border-blue-200', bar: 'bg-blue-500' },
      emerald: { bg: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50', text: isDark ? 'text-emerald-400' : 'text-emerald-600', border: isDark ? 'border-emerald-500/20' : 'border-emerald-200', bar: 'bg-emerald-500' },
      orange: { bg: isDark ? 'bg-orange-500/10' : 'bg-orange-50', text: isDark ? 'text-orange-400' : 'text-orange-600', border: isDark ? 'border-orange-500/20' : 'border-orange-200', bar: 'bg-orange-500' },
    };
    return maps[color][type];
  };
  return (
    <div className={`space-y-10 animate-fade-in pb-12 max-w-5xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div><h3 className="text-3xl font-extrabold tracking-tight">Technical Arsenal</h3><p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>My primary development tools and frameworks.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={`p-6 rounded-[2rem] border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${getColorClasses(category.color, isDark, 'bg')} ${getColorClasses(category.color, isDark, 'border')}`}>{category.icon}</div>
              <h4 className="text-xl font-bold">{category.title}</h4>
            </div>
            <div className="space-y-5">
              {category.skills.map((skill, si) => (
                <div key={si} className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold"><span>{skill.name}</span><span className={getColorClasses(category.color, isDark, 'text')}>{skill.level}%</span></div>
                  <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-900/50' : 'bg-gray-100'}`}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ delay: 0.3 + index * 0.1 + si * 0.1, duration: 1 }} className={`h-full rounded-full ${getColorClasses(category.color, isDark, 'bar')}`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AboutMeContent = ({ isDark }: { isDark: boolean }) => {
  const [imageError, setImageError] = React.useState(false);
  return (
    <div className={`space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className={`rounded-2xl p-6 sm:p-8 border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-300'}`}>
            {!imageError ? (<img src="/melkamu.jpg" alt="Melkamu Derso" onError={() => setImageError(true)} className="w-full h-full object-cover" />) : (<div className="w-full h-full flex items-center justify-center font-bold text-xl">MD</div>)}
          </div>
          <div className="flex-1 space-y-2">
            <span className={`text-xs font-mono tracking-wide uppercase ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Full-Stack & Mobile Developer</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Melkamu Derso</h2>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Based in Bahir Dar, Ethiopia. Building robust system architectures and scalable full-stack applications.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '⚡', title: 'Tech Ecosystem', desc: 'Next.js, React, Laravel, Node.js, MongoDB, MySQL' },
          { icon: '🐧', title: 'Operating System', desc: 'Ubuntu 22.04 on HP EliteBook 840 G6 with Termux' },
          { icon: '🎓', title: 'Education', desc: 'Computer Science graduate from BiT' }
        ].map((c, i) => (
          <div key={i} className={`p-5 rounded-xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className="text-base font-semibold flex items-center gap-2 mb-2"><span>{c.icon}</span> {c.title}</div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const WidgetView = ({ isDark }: { isDark: boolean }) => {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateNum = today.getDate();
  return (
    <div className="w-full h-full max-w-[430px] sm:max-w-2xl mx-auto px-6 pt-4 pb-24 overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-end mb-6 pl-2"><h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Widgets</h2></div>
      <div className="grid grid-cols-2 gap-4">
        <div className={`col-span-2 p-5 rounded-[2rem] border flex items-center justify-between ${isDark ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-gray-200'}`}>
          <div><p className="text-red-500 font-bold text-sm uppercase tracking-widest">{dayName}</p><h3 className={`text-6xl font-light mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{dateNum}</h3></div>
          <div className="text-6xl">📅</div>
        </div>
        <div className={`p-5 rounded-[2rem] border flex flex-col justify-between aspect-square ${isDark ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-gray-200'}`}>
          <span className="text-green-500 text-2xl">⚡</span><span className={`text-4xl font-light mt-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>100%</span>
        </div>
        <div className={`p-5 rounded-[2rem] border flex flex-col justify-between aspect-square ${isDark ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-gray-200'}`}>
          <span className="text-blue-500 text-2xl">💾</span>
          <div className="w-full h-3 bg-gray-500/20 rounded-full mt-auto overflow-hidden"><div className="w-2/3 h-full bg-blue-500 rounded-full"></div></div>
          <p className={`text-xs mt-2 text-center ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>66% Used</p>
        </div>
        <div className={`col-span-2 p-5 rounded-[2rem] border flex flex-col gap-3 ${isDark ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-gray-200'}`}>
          <div className="flex items-center gap-2 mb-1"><span className="text-purple-500 text-xl">⏳</span><span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Screen Time</span></div>
          <h3 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>4<span className="text-xl">h</span> 12<span className="text-xl">m</span></h3>
          <div className="flex gap-1 h-3 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-1/2"></div><div className="h-full bg-blue-500 w-1/4"></div><div className="h-full bg-yellow-500 w-1/4"></div></div>
        </div>
      </div>
    </div>
  );
};

const TopBar = ({ isDark, onOpenSettings, onOpenNotifications, notificationCount }: { isDark: boolean; onOpenSettings: () => void; onOpenNotifications: () => void; notificationCount: number }) => {
  const [time, setTime] = React.useState<string>('');
  const [batteryLevel, setBatteryLevel] = React.useState<number>(100);
  const [isCharging, setIsCharging] = React.useState<boolean>(false);
  const [isOnline, setIsOnline] = React.useState<boolean>(true);

  React.useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    updateTime();
    const i = setInterval(updateTime, 10000);
    setIsOnline(navigator.onLine);
    const hOn = () => setIsOnline(true); const hOff = () => setIsOnline(false);
    window.addEventListener('online', hOn); window.addEventListener('offline', hOff);
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((b: any) => {
        setBatteryLevel(Math.round(b.level * 100)); setIsCharging(b.charging);
        b.addEventListener('levelchange', () => setBatteryLevel(Math.round(b.level * 100)));
        b.addEventListener('chargingchange', () => setIsCharging(b.charging));
      }).catch(() => {});
    }
    return () => { clearInterval(i); window.removeEventListener('online', hOn); window.removeEventListener('offline', hOff); };
  }, []);

  return (
    <div className={`w-full h-8 px-4 flex items-center justify-between text-[11px] sm:text-xs font-semibold z-50 relative backdrop-blur-md border-b ${isDark ? 'bg-slate-900/50 text-slate-200 border-slate-800/50' : 'bg-white/70 text-gray-800 border-gray-200/70'}`}>
      <div className="flex items-center gap-1.5"></div>
      <div className="flex items-center gap-3">
        <button onClick={onOpenNotifications} className={`relative flex items-center justify-center w-6 h-6 rounded-md ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          {notificationCount > 0 && (<span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">{notificationCount > 9 ? '9+' : notificationCount}</span>)}
        </button>
        <button onClick={onOpenSettings} className={`flex items-center gap-3 px-2 py-0.5 rounded-md ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
          <span className={`text-[10px] ${isOnline ? '' : 'opacity-20 text-red-500'}`}>{isOnline ? '📶' : 'Offline'}</span>
          <span className="text-[10px]">{batteryLevel}%</span>
          {isCharging && <span className="text-green-500 text-[10px]">⚡</span>}
          <span className="min-w-[60px] text-right">{time}</span>
        </button>
      </div>
    </div>
  );
};

const LockScreen = ({ onUnlock, isDark, wallpaper }: { onUnlock: () => void; isDark: boolean; wallpaper: string }) => {
  const [time, setTime] = React.useState<string>('');
  const [dateStr, setDateStr] = React.useState<string>('');
  React.useEffect(() => {
    const u = () => { const n = new Date(); setTime(n.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })); setDateStr(n.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })); };
    u(); const i = setInterval(u, 1000); return () => clearInterval(i);
  }, []);
  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }} drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0.1, bottom: 0.6 }}
      onDragEnd={(_, info) => { if (info.offset.y < -80 || info.velocity.y < -500) onUnlock(); }}
      className={`absolute inset-0 z-[500] flex flex-col items-center justify-between pt-20 pb-16 cursor-grab active:cursor-grabbing ${wallpaper}`}
    >
      <div className="text-center select-none pointer-events-none">
        <div className={`text-[88px] sm:text-[110px] font-thin tracking-tighter leading-none ${isDark ? 'text-white' : 'text-gray-900'} drop-shadow-lg`}>{time}</div>
        <div className={`text-lg mt-2 font-medium ${isDark ? 'text-white/80' : 'text-gray-700/80'} drop-shadow-md`}>{dateStr}</div>
      </div>
      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 pointer-events-none">
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${isDark ? 'border-white/40 text-white' : 'border-gray-700/40 text-gray-700'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" /></svg>
        </div>
        <span className={`text-xs font-medium ${isDark ? 'text-white/60' : 'text-gray-700/60'}`}>Swipe up to unlock</span>
      </motion.div>
    </motion.div>
  );
};

const ControlCenter = ({ isOpen, onClose, isDark, toggleDarkMode, brightness, setBrightness, volume, setVolume, trashCount, onOpenTrash }: any) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  React.useEffect(() => { audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); }, []);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value); setVolume(v);
    if (audioRef.current) { audioRef.current.volume = v / 100; audioRef.current.play().catch(() => {}); }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100]" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.2 }}
            className={`absolute top-10 right-4 w-[320px] rounded-[2.5rem] p-4 z-[101] shadow-2xl backdrop-blur-3xl border ${isDark ? 'bg-slate-600/40 border-slate-500/30' : 'bg-white/60 border-white/70'}`}
          >
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-3xl flex flex-col gap-4 ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">📶</div><span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Wi-Fi</span></div>
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">ᛒ</div><span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Bluetooth</span></div>
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <button onClick={toggleDarkMode} className={`rounded-3xl flex items-center justify-center ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-indigo-500 text-white' : 'bg-yellow-400 text-white'}`}>{isDark ? '🌙' : '☀️'}</div>
                  </button>
                  <a href="https://github.com/melaku-git" target="_blank" rel="noreferrer" className={`rounded-3xl flex items-center justify-center ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                    <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center">🐙</div>
                  </a>
                </div>
              </div>
              <div className={`h-14 rounded-full flex items-center px-4 ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                <span className="text-xl mr-3">☀️</span>
                <input type="range" min="20" max="100" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full h-2 bg-gray-400/30 rounded-lg appearance-none accent-white" />
              </div>
              <div className={`h-14 rounded-full flex items-center px-4 ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                <span className="text-xl mr-3">🔊</span>
                <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} className="w-full h-2 bg-gray-400/30 rounded-lg appearance-none accent-white" />
              </div>
              <button onClick={(e) => { e.stopPropagation(); onOpenTrash(); onClose(); }} className={`p-4 rounded-3xl flex items-center justify-between w-full ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                <div className="flex items-center gap-3"><span className="text-2xl">🗑️</span><span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Trash Bin</span></div>
                <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">{trashCount}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const NotificationCenter = ({ isOpen, onClose, isDark, notifications, onClear }: any) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100]" onClick={onClose} />
        <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.2 }}
          className={`absolute top-10 left-4 right-4 sm:right-auto sm:w-[360px] rounded-[2rem] p-4 z-[101] shadow-2xl backdrop-blur-3xl border max-h-[70vh] overflow-y-auto ${isDark ? 'bg-slate-600/40 border-slate-500/30' : 'bg-white/60 border-white/70'}`}
        >
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Notifications</h3>
            {notifications.length > 0 && <button onClick={onClear} className={`text-xs font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Clear All</button>}
          </div>
          {notifications.length === 0 ? (
            <div className={`text-center py-8 text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}><div className="text-3xl mb-2 opacity-40">🔔</div>No new notifications</div>
          ) : (
            <div className="space-y-2">
              {notifications.map((n: any) => (
                <div key={n.id} className={`flex items-start gap-3 p-3 rounded-2xl border ${isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-white/80 border-gray-200'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${n.color}`}>{n.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{n.title}</p>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const NotificationToast = ({ notification, onClose }: { notification: Notification; onClose: () => void }) => (
  <motion.div initial={{ opacity: 0, y: -100, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -100, scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={onClose} className="fixed top-12 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-md cursor-pointer">
    <div className="rounded-2xl shadow-2xl backdrop-blur-2xl bg-slate-800/90 border border-white/10 p-3 flex items-center gap-3">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 ${notification.color}`}>{notification.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white truncate">{notification.title}</p>
        <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">{notification.message}</p>
      </div>
    </div>
  </motion.div>
);

const Dock = ({ isDark, dockApps, onOpenApp }: { isDark: boolean; dockApps: AppItem[]; onOpenApp: (app: AppItem) => void }) => (
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
    <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      className={`pointer-events-auto flex items-end gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-[1.75rem] backdrop-blur-2xl border shadow-2xl ${isDark ? 'bg-slate-800/40 border-white/10' : 'bg-white/40 border-white/50'}`}
    >
      {dockApps.map((app) => (
        <motion.button key={app.id} onClick={() => onOpenApp(app)} whileHover={{ scale: 1.15, y: -6 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="relative flex flex-col items-center" title={app.name}>
          <span className="text-3xl sm:text-4xl leading-none drop-shadow-md">{app.icon}</span>
          <span className={`text-[8px] mt-0.5 font-medium ${isDark ? 'text-white/70' : 'text-gray-700/70'}`}>{app.name}</span>
        </motion.button>
      ))}
    </motion.div>
  </div>
);

// ============ MAIN OS ============
export default function Home() {
  const [brightness, setBrightness] = React.useState(100);
  const [volume, setVolume] = React.useState(50);
  const [isLocked, setIsLocked] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const APPS_PER_PAGE = 12;

  const [desktopApps, setDesktopApps] = React.useState<AppItem[]>([...apps]);
  const [trashApps, setTrashApps] = React.useState<AppItem[]>([]);
  const [activeApp, setActiveApp] = React.useState<AppItem | null>(null);
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = React.useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [activeToast, setActiveToast] = React.useState<Notification | null>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isTrashOpen, setIsTrashOpen] = React.useState(false);
  const [isJiggleMode, setIsJiggleMode] = React.useState(false);
  const [isWidgetPromptOpen, setIsWidgetPromptOpen] = React.useState(false);
  const emptySpaceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [parallaxX, setParallaxX] = React.useState(0);

  const [osSettings, setOsSettings] = React.useState<OSSettings>({
    darkMode: true, animations: true, wifi: true, bluetooth: false, devMode: false, wallpaperId: 'default',
  });
  const isDark = osSettings.darkMode;
  const animDuration = osSettings.animations ? 0.3 : 0;

  const currentWallpaper = WALLPAPERS.find(w => w.id === osSettings.wallpaperId) || WALLPAPERS[0];
  const wallpaper = isDark ? currentWallpaper.dark : currentWallpaper.light;

  const totalPages = Math.ceil(desktopApps.length / APPS_PER_PAGE) + 1;

  const dockApps = React.useMemo(() => {
    const dockIds = ['about', 'projects', 'terminal', 'contact'];
    return desktopApps.filter(a => dockIds.includes(a.id));
  }, [desktopApps]);

  const pushNotification = React.useCallback((n: Omit<Notification, 'id'>) => {
    const newNotif = { ...n, id: `n-${Date.now()}-${Math.random()}` };
    setNotifications(prev => [newNotif, ...prev].slice(0, 20));
    setActiveToast(newNotif);
    setTimeout(() => setActiveToast(prev => prev?.id === newNotif.id ? null : prev), 3500);
  }, []);

  React.useEffect(() => {
    if (!isLocked) {
      const t = setTimeout(() => {
        pushNotification({ icon: '👋', title: 'Welcome to Portfolio OS', message: 'Swipe between pages. Tap dock apps. Long-press to add widgets.', color: 'bg-blue-500' });
      }, 800);
      return () => clearTimeout(t);
    }
  }, [isLocked, pushNotification]);

  // ============ IPHONE-STYLE CONTINUOUS SCROLL ============
  const handlePagerDrag = (_e: any, info: any) => {
    setParallaxX(info.offset.x * 0.15);
  };

  const handlePagerDragEnd = (_e: any, info: any) => {
    if (isJiggleMode) { setParallaxX(0); return; }
    const swipeThreshold = 60;
    const velocityThreshold = 300;
    const goNext = info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold;
    const goPrev = info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold;

    if (goNext && currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
    else if (goPrev && currentPage > 0) setCurrentPage(prev => prev - 1);
    setParallaxX(0);
  };

  const handleEmptySpaceDown = () => {
    if (emptySpaceTimerRef.current) clearTimeout(emptySpaceTimerRef.current);
    emptySpaceTimerRef.current = setTimeout(() => setIsWidgetPromptOpen(true), 700);
  };
  const handleEmptySpaceUp = () => {
    if (emptySpaceTimerRef.current) { clearTimeout(emptySpaceTimerRef.current); emptySpaceTimerRef.current = null; }
  };

  const uninstallApp = (appId: string) => { setDesktopApps(prev => prev.filter(a => a.id !== appId)); setActiveMenuId(null); };
  const moveToTrash = (appId: string) => {
    const t = desktopApps.find(a => a.id === appId);
    if (t) { setTrashApps(prev => [...prev, t]); setDesktopApps(prev => prev.filter(a => a.id !== appId)); setActiveMenuId(null); }
  };
  const restoreSingleApp = (appId: string) => {
    const t = trashApps.find(a => a.id === appId);
    if (t) { setDesktopApps(prev => [...prev, t]); setTrashApps(prev => prev.filter(a => a.id !== appId)); }
  };

  const currentAppChunk = desktopApps.slice((currentPage - 1) * APPS_PER_PAGE, currentPage * APPS_PER_PAGE);

  const createNewWidget = (widgetType: 'calendar' | 'battery' | 'storage' | 'screentime') => {
    const info: Record<string, { name: string; icon: string }> = {
      calendar: { name: 'Calendar Widget', icon: '📅' }, battery: { name: 'Battery Widget', icon: '🔋' },
      storage: { name: 'Storage Widget', icon: '💾' }, screentime: { name: 'Screen Time', icon: '⏳' },
    }[widgetType];
    setDesktopApps(prev => [{ id: `widget-${Date.now()}`, name: info.name, icon: info.icon, color: 'bg-white', isWidget: true }, ...prev]);
    setCurrentPage(1);
    setIsWidgetPromptOpen(false);
    pushNotification({ icon: '✨', title: 'Widget Added', message: `${info.name} added to your home screen`, color: 'bg-purple-500' });
  };

  const openApp = (app: AppItem) => {
    setActiveApp(app);
    pushNotification({ icon: app.icon, title: `Opening ${app.name}`, message: `Loading ${app.name}…`, color: app.color });
  };

  const goToPage = (page: number) => {
    if (page === 0 && currentPage !== 0) pushNotification({ icon: '📅', title: 'Widgets Page', message: 'Long-press empty space to add a widget', color: 'bg-indigo-500' });
    setCurrentPage(page);
  };

  // Build array of pages for continuous scroll rendering
  const allPages = React.useMemo(() => {
    const pages: (null | AppItem[])[] = [];
    pages.push(null); // page 0 = widgets
    for (let i = 0; i < Math.ceil(desktopApps.length / APPS_PER_PAGE); i++) {
      pages.push(desktopApps.slice(i * APPS_PER_PAGE, (i + 1) * APPS_PER_PAGE));
    }
    return pages;
  }, [desktopApps]);

  return (
    <div className={`min-h-screen flex flex-col relative font-sans overflow-hidden transition-colors duration-500 ${wallpaper}`}>
      <div className="absolute inset-0 z-[999] pointer-events-none bg-black transition-opacity duration-200" style={{ opacity: 1 - brightness / 100 }} />

      {/* Parallax layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10 opacity-40"
        animate={{ x: parallaxX, scale: 1.15 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        style={{ background: isDark ? 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 60%)' : 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 60%)' }}
      />

      <AnimatePresence>{isLocked && <LockScreen key="lock" onUnlock={() => setIsLocked(false)} isDark={isDark} wallpaper={wallpaper} />}</AnimatePresence>

      {!isLocked && (
        <>
          <TopBar isDark={isDark} onOpenSettings={() => setIsControlCenterOpen(true)} onOpenNotifications={() => setIsNotificationCenterOpen(true)} notificationCount={notifications.length} />
          <ControlCenter isOpen={isControlCenterOpen} onClose={() => setIsControlCenterOpen(false)} isDark={isDark} toggleDarkMode={() => setOsSettings(p => ({ ...p, darkMode: !p.darkMode }))} brightness={brightness} setBrightness={setBrightness} volume={volume} setVolume={setVolume} trashCount={trashApps.length} onOpenTrash={() => setIsTrashOpen(true)} />
          <NotificationCenter isOpen={isNotificationCenterOpen} onClose={() => setIsNotificationCenterOpen(false)} isDark={isDark} notifications={notifications} onClear={() => setNotifications([])} />
          <AnimatePresence>{activeToast && <NotificationToast key={activeToast.id} notification={activeToast} onClose={() => setActiveToast(null)} />}</AnimatePresence>

          <AnimatePresence>
            {isTrashOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[105] flex items-center justify-center p-4 bg-black/40" onClick={() => setIsTrashOpen(false)}>
                <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className={`w-full max-w-sm rounded-3xl border flex flex-col max-h-[70vh] ${isDark ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-gray-200'}`}>
                  <div className={`px-6 py-4 border-b flex justify-between items-center ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>🗑️ Trash Bin</h3>
                    <button onClick={() => setIsTrashOpen(false)} className={`w-8 h-8 rounded-full ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>✕</button>
                  </div>
                  <div className="p-4 overflow-y-auto flex-1">
                    {trashApps.length === 0 ? (
                      <div className={`text-center py-8 text-sm opacity-50 ${isDark ? 'text-white' : 'text-gray-900'}`}>Trash is empty</div>
                    ) : (
                      <div className="space-y-3">
                        {trashApps.map(app => (
                          <div key={app.id} className={`flex items-center justify-between p-3 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${app.color}`}>{app.icon}</div>
                              <div><span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{app.name}</span></div>
                            </div>
                            <button onClick={() => restoreSingleApp(app.id)} className="px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-xl">Restore</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/40" onClick={() => setIsSearchOpen(false)}>
                <motion.div initial={{ scale: 0.95, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: -10 }} onClick={(e) => e.stopPropagation()} className={`w-full max-w-xl rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white/95 border-gray-200'}`}>
                  <div className={`flex items-center px-4 py-3 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                    <span className="text-2xl mr-3 opacity-50">🔍</span>
                    <input autoFocus type="text" placeholder="Search apps..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-lg" />
                    <button onClick={() => setIsSearchOpen(false)} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-slate-700 text-white' : 'bg-gray-200'}`}>ESC</button>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto p-2">
                    {desktopApps.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).map(app => (
                      <button key={app.id} onClick={() => { openApp(app); setIsSearchOpen(false); setSearchQuery(''); }} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl ${isDark ? 'hover:bg-slate-700/50 text-white' : 'hover:bg-gray-100'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${app.color}`}>{app.icon}</div>
                        <span className="font-medium text-lg">{app.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isWidgetPromptOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[110] flex items-center justify-center p-4 bg-black/50" onClick={() => setIsWidgetPromptOpen(false)}>
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className={`w-full max-w-md rounded-3xl border p-6 ${isDark ? 'bg-slate-800/95 border-slate-700 text-white' : 'bg-white/95 border-gray-200 text-gray-900'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-2xl">✨</div>
                    <div><h3 className="text-lg font-bold">Create New Widget</h3><p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Choose a widget to add</p></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {([{ type: 'calendar', icon: '📅', name: 'Calendar' }, { type: 'battery', icon: '🔋', name: 'Battery' }, { type: 'storage', icon: '💾', name: 'Storage' }, { type: 'screentime', icon: '⏳', name: 'Screen Time' }] as const).map(w => (
                      <button key={w.type} onClick={() => createNewWidget(w.type)} className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="text-3xl mb-2">{w.icon}</div><div className="text-sm font-bold">{w.name}</div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setIsWidgetPromptOpen(false)} className={`w-full py-3 rounded-xl font-bold ${isDark ? 'bg-slate-700 text-white' : 'bg-gray-100'}`}>Cancel</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!activeApp ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col pt-10 z-0 h-full relative" onClick={() => activeMenuId && setActiveMenuId(null)}>
                <div className="flex justify-center z-10 w-full px-4 mb-2 shrink-0">
                  <button onClick={() => setIsSearchOpen(true)} className={`group flex items-center gap-2 w-full max-w-[280px] sm:max-w-xs px-4 py-2 rounded-full backdrop-blur-md border shadow-sm ${isDark ? 'bg-slate-800/60 border-slate-700/50 text-slate-400' : 'bg-white/80 border-gray-300/60 text-gray-600'}`}>
                    <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <span className="text-sm font-medium flex-1 text-center pr-6">Search</span>
                  </button>
                </div>

                {/* ============ IPHONE-STYLE CONTINUOUS PAGER ============ */}
                <div className="flex-1 w-full relative overflow-hidden"
                  onPointerDown={handleEmptySpaceDown}
                  onPointerUp={handleEmptySpaceUp}
                  onPointerLeave={handleEmptySpaceUp}
                  onContextMenu={(e) => { e.preventDefault(); setIsWidgetPromptOpen(true); }}
                >
                  <motion.div
                    drag={!isJiggleMode ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDrag={handlePagerDrag}
                    onDragEnd={handlePagerDragEnd}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`w-full h-full ${!isJiggleMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  >
                    {/* Horizontal strip of pages — showing neighbors = iPhone feel */}
                    <div className="flex w-full h-full transition-transform duration-300 ease-out" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
                      {allPages.map((page, idx) => (
                        <div key={idx} className="w-full h-full shrink-0">
                          {page === null ? (
                            <WidgetView isDark={isDark} />
                          ) : (
                            <div className={`w-full h-full max-w-[430px] sm:max-w-5xl mx-auto pt-4 px-6 sm:px-10 overflow-y-auto no-scrollbar pb-32`}>
                              <Reorder.Group as="div" axis="x" values={page}
                                onReorder={(newChunk: AppItem[]) => {
                                  const newApps = [...desktopApps];
                                  newApps.splice(idx === 0 ? 0 : (idx - 1) * APPS_PER_PAGE, newChunk.length, ...newChunk);
                                  setDesktopApps(newApps);
                                }}
                                className="flex flex-wrap content-start justify-center gap-6 sm:gap-10 w-full max-w-4xl mx-auto"
                              >
                                {page.map((app) => (
                                  <Reorder.Item as="div" key={app.id} value={app} dragListener={!activeMenuId} style={{ touchAction: "none" }} className="relative outline-none shrink-0 w-[68px] sm:w-[84px] h-[90px] sm:h-[110px]">
                                    <motion.div
                                      onContextMenu={(e) => { e.preventDefault(); setActiveMenuId(app.id); }}
                                      onDoubleClick={(e) => { e.preventDefault(); setActiveMenuId(app.id); }}
                                      onTouchStart={() => { window.longPressTimer = setTimeout(() => setActiveMenuId(app.id), 600); }}
                                      onTouchEnd={() => { if (window.longPressTimer) clearTimeout(window.longPressTimer); }}
                                      className="w-full h-full flex flex-col items-center group cursor-grab active:cursor-grabbing"
                                    >
                                      <AnimatePresence>
                                        {activeMenuId === app.id && (
                                          <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 10 }} className={`absolute top-[80%] left-1/2 -translate-x-1/2 z-[999] w-36 rounded-xl shadow-2xl flex flex-col overflow-hidden border backdrop-blur-2xl ${isDark ? 'bg-slate-800/95 border-slate-600' : 'bg-white/95 border-gray-200'}`}>
                                            <button onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); openApp(app); setActiveMenuId(null); }} className={`px-4 py-2.5 text-sm font-bold text-left border-b ${isDark ? 'border-slate-700 text-white' : 'border-gray-100 text-gray-800'}`}>Open</button>
                                            <button onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); moveToTrash(app.id); }} className={`px-4 py-2.5 text-sm font-bold text-left border-b ${isDark ? 'border-slate-700 text-orange-400' : 'border-gray-100 text-orange-600'}`}>Delete</button>
                                            <button onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); uninstallApp(app.id); }} className="px-4 py-2.5 text-sm font-bold text-left text-red-500 hover:bg-red-500 hover:text-white">Uninstall</button>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                      <button onClick={() => !activeMenuId && openApp(app)} className="relative flex items-center justify-center w-full h-[68px] sm:h-[84px]">
                                        <span className="text-[48px] sm:text-[64px] drop-shadow-sm group-hover:scale-110 transition-transform leading-none">{app.icon}</span>
                                      </button>
                                      <span className={`text-[11px] mt-1.5 font-medium w-full text-center truncate pointer-events-none ${isDark ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]' : 'text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]'}`}>{app.name}</span>
                                    </motion.div>
                                  </Reorder.Item>
                                ))}
                              </Reorder.Group>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="flex justify-center items-center gap-2.5 pb-24 shrink-0 z-20">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button key={idx} onClick={() => goToPage(idx)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === idx ? (isDark ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-gray-900') : (isDark ? 'bg-white/30' : 'bg-gray-900/30')}`} />
                  ))}
                </div>

                <Dock isDark={isDark} dockApps={dockApps} onOpenApp={openApp} />
              </motion.div>
            ) : (
              <motion.div layoutId={`app-container-${activeApp.id}`} transition={{ duration: animDuration, type: "spring", stiffness: 300, damping: 30 }} className="absolute inset-0 z-50 flex flex-col bg-slate-900">
                <div className="pt-12 pb-4 px-6 flex items-center text-white bg-black/40 backdrop-blur-xl border-b border-white/10">
                  <button onClick={() => setActiveApp(null)} className="text-white hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium">← Back</button>
                  <motion.h2 layoutId={`app-icon-${activeApp.id}`} transition={{ duration: animDuration }} className="ml-4 text-xl font-bold flex items-center gap-2">
                    <span>{activeApp.icon}</span> {activeApp.name}
                  </motion.h2>
                </div>
                <div className={`flex-1 overflow-y-auto ${activeApp.id === 'terminal' ? 'p-2 bg-[#1e1e1e]' : (isDark ? 'bg-slate-900 p-6' : 'bg-gray-50 p-6')}`}>
                  {activeApp.id === 'uiux' ? <UIUXContent /> :
                   activeApp.id === 'experience' ? <ExperienceContent /> :
                   activeApp.id === 'terminal' ? <TerminalContent /> :
                   activeApp.id === 'github' ? <GitHubContent /> :
                   activeApp.id === 'news' ? <TechNewsContent /> :
                   activeApp.id === 'settings' ? <SettingsContent settings={osSettings} setSettings={setOsSettings} /> :
                   activeApp.id === 'browser' ? <BrowserContent isDark={isDark} /> :
                   activeApp.id === 'contact' ? <ContactContent isDark={isDark} /> :
                   activeApp.id === 'architecture' ? <ArchitectureContent isDark={isDark} /> :
                   activeApp.id === 'coursework' ? <CourseworkContent isDark={isDark} /> :
                   activeApp.id === 'education' ? <EducationContent isDark={isDark} /> :
                   activeApp.id === 'mobile' ? <MobileAppsContent isDark={isDark} /> :
                   activeApp.id === 'projects' ? <WebAppsContent isDark={isDark} /> :
                   activeApp.id === 'skills' ? <TechStackContent isDark={isDark} /> :
                   activeApp.id === 'about' ? <AboutMeContent isDark={isDark} /> :
                   activeApp.id === 'resume' ? <ResumeContent isDark={isDark} /> :
                   activeApp.id === 'blog' ? <BlogContent isDark={isDark} /> :
                   activeApp.id === 'certs' ? <CertsContent isDark={isDark} /> :
                   activeApp.id === 'testimonials' ? <TestimonialsContent isDark={isDark} /> :
                   activeApp.id === 'timeline' ? <TimelineContent isDark={isDark} /> : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}