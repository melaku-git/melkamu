'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

// Extend window type for long press timer
declare global {
  interface Window {
    longPressTimer?: ReturnType<typeof setTimeout>;
  }
}

// Type definitions
type AppItem = {
  id: string;
  name: string;
  icon: string;
  color: string;
  isWidget?: boolean;
  isFolder?: boolean;      
  folderApps?: AppItem[];  
};

// 1. The apps array
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
    // NEW APPS
  { id: 'notes', name: 'Notes', icon: '📝', color: 'bg-yellow-400' },
  { id: 'calculator', name: 'Calculator', icon: '🧮', color: 'bg-gray-700' },
  { id: 'game', name: '2048', icon: '🎮', color: 'bg-indigo-600' },
];

// Wallpaper definitions
const WALLPAPERS: Record<string, { label: string; light: string; dark: string; preview: string }> = {
  default: {
    label: 'Default',
    light: 'bg-gradient-to-br from-gray-100 via-white to-gray-200',
    dark: 'bg-gradient-to-br from-black via-slate-900 to-black',
    preview: 'bg-gradient-to-br from-gray-400 to-slate-700',
  },
  ocean: {
    label: 'Ocean',
    light: 'bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-300',
    dark: 'bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950',
    preview: 'bg-gradient-to-br from-sky-400 to-indigo-700',
  },
  sunset: {
    label: 'Sunset',
    light: 'bg-gradient-to-br from-orange-100 via-pink-200 to-purple-300',
    dark: 'bg-gradient-to-br from-orange-950 via-rose-900 to-purple-950',
    preview: 'bg-gradient-to-br from-orange-400 to-purple-700',
  },
  forest: {
    label: 'Forest',
    light: 'bg-gradient-to-br from-green-100 via-emerald-200 to-teal-300',
    dark: 'bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950',
    preview: 'bg-gradient-to-br from-green-400 to-teal-700',
  },
  mesh: {
    label: 'Mesh',
    light: 'bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100',
    dark: 'bg-gradient-to-tr from-indigo-950 via-purple-950 to-pink-950',
    preview: 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500',
  },
  minimal: {
    label: 'Minimal',
    light: 'bg-gray-50',
    dark: 'bg-neutral-950',
    preview: 'bg-neutral-800',
  },
};

// 2. The UI/UX Component
const UIUXContent = () => {
  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <div className="space-y-2">
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Interface & Experience Design</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
          Translating complex system requirements into intuitive, user-centric interfaces. From high-fidelity dashboard mockups to rapid AI-assisted visual prototyping.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b pb-2">
          <span className="text-2xl">📊</span>
          <h4 className="text-xl font-bold text-gray-800">Organizational Dashboards</h4>
        </div>
        <p className="text-sm text-gray-600">
          UI layouts designed for robust management systems, focusing on data clarity for member tracking, financial recordkeeping, and inventory scheduling.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="group relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 aspect-video flex items-center justify-center cursor-pointer">
            <span className="text-slate-400 font-medium group-hover:scale-110 transition-transform">Financial View Mockup</span>
          </div>
          <div className="group relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 aspect-video flex items-center justify-center cursor-pointer">
            <span className="text-slate-400 font-medium group-hover:scale-110 transition-transform">Inventory Layout</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b pb-2">
          <span className="text-2xl">✨</span>
          <h4 className="text-xl font-bold text-gray-800">Visual Assets & Logos</h4>
        </div>
        <p className="text-sm text-gray-600">
          Iterative brand design and layout conceptualization, utilizing prompt engineering and modern design tools to generate software logos and UI prototypes.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
          <div className="rounded-2xl bg-pink-50 border border-pink-100 aspect-square flex items-center justify-center">
            <span className="text-pink-300 text-sm font-medium">Logo Concept 1</span>
          </div>
          <div className="rounded-2xl bg-purple-50 border border-purple-100 aspect-square flex items-center justify-center">
             <span className="text-purple-300 text-sm font-medium">App Icon</span>
          </div>
          <div className="rounded-2xl bg-blue-50 border border-blue-100 aspect-square flex items-center justify-center">
             <span className="text-blue-300 text-sm font-medium">Color Palette</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceContent = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="space-y-2">
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Professional Experience</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
          A timeline of my work architecting and developing full-stack applications, from university management systems to commercial platforms.
        </p>
      </div>

      <div className="relative border-l-2 border-gray-100 ml-3 space-y-10 mt-8">
        <div className="pl-6 relative">
          <div className="absolute w-4 h-4 bg-teal-500 rounded-full -left-[9px] top-1 ring-4 ring-white shadow-sm"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h4 className="text-xl font-bold text-gray-800">Full-Stack Developer (Contract)</h4>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md w-max mt-2 sm:mt-0 uppercase tracking-wider">Sep 2026 – Present</span>
          </div>
          <span className="text-sm font-semibold text-gray-500 block mb-3">Organizational Management System</span>
          <ul className="text-sm text-gray-600 list-disc pl-4 space-y-2 marker:text-teal-400">
            <li>Developing a comprehensive web-based management system featuring member tracking, financial recordkeeping, and event scheduling.</li>
            <li>Designing executive dashboard mockups and implementing the frontend architecture using Next.js.</li>
            <li>Integrating robust inventory management modules for seamless operational tracking.</li>
          </ul>
        </div>

        <div className="pl-6 relative">
          <div className="absolute w-4 h-4 bg-gray-300 rounded-full -left-[9px] top-1 ring-4 ring-white"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h4 className="text-xl font-bold text-gray-800">Software Architect</h4>
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md w-max mt-2 sm:mt-0 uppercase tracking-wider">Aug 2026</span>
          </div>
          <span className="text-sm font-semibold text-gray-500 block mb-3">Smart Digital Menu & Ordering Platform</span>
          <ul className="text-sm text-gray-600 list-disc pl-4 space-y-2 marker:text-gray-400">
            <li>Architected a digital ordering platform tailored for cafes using a Laravel backend and Next.js frontend.</li>
            <li>Designed and optimized relational database schemas using MySQL.</li>
            <li>Built real-time order tracking mechanisms and configured backend API routes for fast data delivery.</li>
          </ul>
        </div>

        <div className="pl-6 relative">
          <div className="absolute w-4 h-4 bg-gray-300 rounded-full -left-[9px] top-1 ring-4 ring-white"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h4 className="text-xl font-bold text-gray-800">Lead Developer</h4>
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md w-max mt-2 sm:mt-0 uppercase tracking-wider">Dec 2025 – May 2026</span>
          </div>
          <span className="text-sm font-semibold text-gray-500 block mb-3">Bahir Dar Institute of Technology (BiT)</span>
          <ul className="text-sm text-gray-600 list-disc pl-4 space-y-2 marker:text-gray-400">
            <li>Designed and built an Internship Placement and Management System from the ground up.</li>
            <li>Implemented secure role-based access control (RBAC) and database integrations utilizing MongoDB.</li>
            <li>Created comprehensive system documentation, including UML diagrams, Next.js component structures, and use case specifications.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

type FileNode = {
  type: 'dir' | 'file';
  children?: Record<string, FileNode>;
  content?: string;
};

const TerminalContent = () => {
  const fileSystem: Record<string, FileNode> = {
    '~': {
      type: 'dir',
      children: {
        'portfolio': {
          type: 'dir',
          children: {
            'README.md': { type: 'file', content: '# Portfolio OS\nBuilt with Next.js, React, and Tailwind CSS.\nDesigned to mimic an Ubuntu/Android mobile environment.' },
            'package.json': { type: 'file', content: '{\n  "name": "portfolio",\n  "version": "1.0.0",\n  "dependencies": {\n    "next": "16.4.0",\n    "motion": "latest"\n  }\n}' },
            'src': { type: 'dir', children: {} }
          }
        },
        'projects': {
          type: 'dir',
          children: {
            'bit-internship.txt': { type: 'file', content: 'Role: Lead Developer (Dec 2025 - May 2026)\nBuilt an Internship Placement System for Bahir Dar Institute of Technology using MongoDB and Next.js.' },
            'digital-menu.txt': { type: 'file', content: 'Role: Software Architect (Aug 2026)\nSmart Digital Menu & Ordering Platform utilizing Laravel, MySQL, and Next.js.' },
            'org-system.txt': { type: 'file', content: 'Role: Full-Stack Developer (Sep 2026 - Present)\nComprehensive management system for financial recordkeeping and member tracking.' }
          }
        },
        'about.txt': { type: 'file', content: 'Name: Melaku\nRole: Full-Stack & Mobile Developer\nLocation: Bahir Dar, Ethiopia\nOS: Ubuntu 22.04 on HP EliteBook 840 G6' }
      }
    }
  };

  const [currentPath, setCurrentPath] = React.useState<string[]>(['~']);
  const [history, setHistory] = React.useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'Welcome to Ubuntu 22.04 LTS (GNU/Linux x86_64)' },
    { type: 'output', text: ' * Documentation:  https://help.ubuntu.com' },
    { type: 'output', text: ' ' },
    { type: 'output', text: 'Type "help" to see available commands. Try exploring with "ls" and "cd".' }
  ]);
  const [input, setInput] = React.useState('');
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const getDir = (pathArray: string[]): FileNode => {
    let curr = fileSystem['~'];
    for (let i = 1; i < pathArray.length; i++) {
      curr = curr.children![pathArray[i]];
    }
    return curr;
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmdString = input.trim();
      const args = cmdString.split(' ').filter(Boolean);
      const cmd = args[0]?.toLowerCase();

      const promptPath = currentPath.join('/').replace('~', '~');
      const newHistory: { type: 'input' | 'output'; text: string }[] = [...history, { type: 'input', text: `hp@hp-HP-EliteBook-840-G6:${promptPath}$ ${cmdString}` }];

      if (!cmd) {
        setHistory(newHistory);
        setInput('');
        return;
      }

      const currentDirObj = getDir(currentPath);

      switch (cmd) {
        case 'clear':
          setHistory([]);
          setInput('');
          return;

        case 'help':
          newHistory.push({ type: 'output', text: 'Available commands:' });
          newHistory.push({ type: 'output', text: '  ls       - List directory contents' });
          newHistory.push({ type: 'output', text: '  cd <dir> - Change directory (supports "cd ..", "cd ~")' });
          newHistory.push({ type: 'output', text: '  pwd      - Print working directory' });
          newHistory.push({ type: 'output', text: '  cat <file>- Read a file' });
          newHistory.push({ type: 'output', text: '  whoami   - Display current user' });
          newHistory.push({ type: 'output', text: '  clear    - Clear terminal' });
          break;

        case 'pwd':
          newHistory.push({ type: 'output', text: `/home/hp/${currentPath.slice(1).join('/')}`.replace(/\/$/, '') });
          break;

        case 'whoami':
          newHistory.push({ type: 'output', text: 'hp' });
          break;

        case 'ls': {
          const contents = Object.keys(currentDirObj.children || {});
          if (contents.length === 0) {
            newHistory.push({ type: 'output', text: '' });
          } else {
            const formatted = contents.map(item =>
              currentDirObj.children![item].type === 'dir' ? `<dir> ${item}` : `      ${item}`
            ).join('\n');
            newHistory.push({ type: 'output', text: formatted });
          }
          break;
        }

        case 'cd': {
          const target = args[1];
          if (!target || target === '~') {
            setCurrentPath(['~']);
          } else if (target === '..') {
            if (currentPath.length > 1) {
              setCurrentPath(currentPath.slice(0, -1));
            }
          } else if (currentDirObj.children && currentDirObj.children[target]) {
            if (currentDirObj.children[target].type === 'dir') {
              setCurrentPath([...currentPath, target]);
            } else {
              newHistory.push({ type: 'output', text: `bash: cd: ${target}: Not a directory` });
            }
          } else {
            newHistory.push({ type: 'output', text: `bash: cd: ${target}: No such file or directory` });
          }
          break;
        }

        case 'cat': {
          const fileTarget = args[1];
          if (!fileTarget) {
            newHistory.push({ type: 'output', text: 'cat: missing operand' });
          } else if (currentDirObj.children && currentDirObj.children[fileTarget]) {
            if (currentDirObj.children[fileTarget].type === 'file') {
              newHistory.push({ type: 'output', text: currentDirObj.children[fileTarget].content || '' });
            } else {
              newHistory.push({ type: 'output', text: `cat: ${fileTarget}: Is a directory` });
            }
          } else {
            newHistory.push({ type: 'output', text: `cat: ${fileTarget}: No such file or directory` });
          }
          break;
        }

        case 'sudo':
          newHistory.push({ type: 'output', text: '[sudo] password for hp: ' });
          newHistory.push({ type: 'output', text: 'Access denied. This incident will be reported.' });
          break;

        default:
          newHistory.push({ type: 'output', text: `${cmd}: command not found` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  const displayPath = currentPath.join('/').replace('~', '~');

  return (
    <div className="h-full w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-sm animate-fade-in border border-gray-700 mt-2">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-900 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-xs font-semibold">hp@hp-HP-EliteBook-840-G6: {displayPath}</div>
        <div className="w-12"></div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto text-gray-200" onClick={() => document.getElementById('terminal-input')?.focus()}>
        {history.map((line, index) => (
          <div key={index} className="mb-1 whitespace-pre-wrap">
            {line.type === 'input' ? (
              <span className="text-white">{line.text}</span>
            ) : line.text.includes('<dir>') ? (
              <span className="text-blue-400 font-bold">{line.text.replace(/<dir> /g, '')}</span>
            ) : (
              <span className={line.text.includes('Access denied') || line.text.includes('not found') || line.text.includes('No such') ? 'text-red-400' : 'text-gray-300'}>
                {line.text}
              </span>
            )}
          </div>
        ))}

        <div className="flex items-center">
          <span className="text-green-500 font-bold mr-2 whitespace-nowrap">hp@hp-HP-EliteBook-840-G6:{displayPath}$</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none text-white font-mono w-full"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const GitHubContent = () => {
  const repos = [
    { name: 'org-management-system', desc: 'Comprehensive web-based management system with financial and member tracking.', tech: 'Next.js', color: 'bg-black' },
    { name: 'smart-cafe-menu', desc: 'Digital ordering platform backend with real-time order tracking mechanisms.', tech: 'Laravel', color: 'bg-red-500' },
    { name: 'bit-internship-portal', desc: 'Role-based placement and management system for Bahir Dar Institute of Technology.', tech: 'MongoDB', color: 'bg-green-500' },
    { name: 'portfolio-os', desc: 'Interactive Ubuntu/Android inspired portfolio built with React and Framer Motion.', tech: 'TypeScript', color: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-200 pb-6">
        <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-white shadow-lg flex items-center justify-center text-4xl">
          👨‍💻
        </div>
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Melkamu</h3>
          <p className="text-gray-500 text-lg mb-3">@melaku-git</p>
          <p className="text-gray-700 text-sm max-w-md">
            Full-Stack & Mobile Application Developer. Passionate about system architecture, clean UI/UX, and building scalable web applications.
          </p>
          <div className="flex justify-center sm:justify-start gap-4 mt-4">
            <span className="text-sm text-gray-600"><strong className="text-gray-900">9</strong> Repositories</span>
            <span className="text-sm text-gray-600"><strong className="text-gray-900">40</strong> Contributions</span>
          </div>
        </div>

        <a
          href="https://github.com/melaku-git"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 sm:mt-0 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
        >
          <span>🐙</span> Visit Profile
        </a>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          📌 Pinned Repositories
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 hover:border-gray-400 hover:shadow-md transition-all bg-white flex flex-col justify-between h-full group cursor-pointer">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-slate-500">📁</span>
                  <span className="text-blue-600 font-semibold group-hover:underline">{repo.name}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{repo.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <span className={`w-2.5 h-2.5 rounded-full ${repo.color}`}></span>
                {repo.tech}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">158 contributions in the last year</h4>
        <div className="w-full h-28 bg-green-50/50 border border-green-100 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#22c55e 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}></div>
          <span className="text-green-700 font-medium z-10 text-sm bg-white/80 px-3 py-1 rounded-full shadow-sm">Activity Graph Simulated</span>
        </div>
      </div>
    </div>
  );
};

type NewsItem = {
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
};

const TechNewsContent = () => {
  const [selectedArticle, setSelectedArticle] = React.useState<NewsItem | null>(null);

  const newsItems: NewsItem[] = [
    {
      title: "Next.js 16.4 Released: Turbopack by Default",
      summary: "The latest Next.js update brings massive build speed improvements and advanced partial prefetching for dynamic routes.",
      content: "Vercel has officially announced Next.js 16.4, making Turbopack the default bundler for all new and existing projects. This release promises up to 53% faster local server startup times and 94% faster Fast Refresh code updates.\n\nFor full-stack developers building complex architectures like Organizational Management Dashboards, this translates to significantly reduced wait times during local iteration. The update also stabilizes advanced partial prefetching, ensuring instant client-side navigations.",
      category: "Web Dev",
      date: "2 hours ago",
      readTime: "4 min read",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "The Rise of AI in Frontend Prototyping",
      summary: "How developers are utilizing prompt engineering and generative UI tools to slash dashboard design times by 80%.",
      content: "The gap between UI/UX design and frontend development is shrinking rapidly. Developers are increasingly leveraging AI image generation and prompt engineering to create high-fidelity UI layouts, application logos, and visual graphic assets before writing a single line of code.\n\nBy generating visual prototype layouts first, development teams can establish a solid aesthetic direction for complex interfaces—like financial view mockups and inventory scheduling—before committing to Tailwind CSS structures.",
      category: "AI & ML",
      date: "5 hours ago",
      readTime: "6 min read",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Ubuntu 26.04 LTS Adopts New Developer Workflows",
      summary: "Canonical's latest release introduces stricter default firewall configurations and upgraded Python environments for developers.",
      content: "Ubuntu remains the dominant OS for backend development. The upcoming 26.04 LTS focuses heavily on the developer experience, particularly for those running containerized setups or local package managers.\n\nKey updates include isolated Python environments to prevent system package conflicts (a common issue for FastAPI developers), native support for advanced shell utilities, and enhanced solid-state drive diagnostics right out of the box—perfect for hardware setups like the HP EliteBook series.",
      category: "Linux / OS",
      date: "12 hours ago",
      readTime: "5 min read",
      color: "bg-orange-100 text-orange-700"
    },
    {
      title: "Securing FastAPI and MongoDB Architectures",
      summary: "Best practices for implementing robust authentication and role-based access control in modern backend systems.",
      content: "As digital platforms scale, implementing bulletproof Role-Based Access Control (RBAC) is non-negotiable. Recent security analyses emphasize the importance of stateless JWT lifecycles and Argon2id password hashing.\n\nWhether building an Internship Placement System or a commercial ordering platform, developers must ensure that authorization checks occur server-side against the database, preventing unauthorized privilege escalation while keeping API response times under 50ms.",
      category: "Cybersecurity",
      date: "2 days ago",
      readTime: "7 min read",
      color: "bg-red-100 text-red-700"
    }
  ];

  if (selectedArticle) {
    return (
      <div className="space-y-6 animate-fade-in pb-12">
        <button
          onClick={() => setSelectedArticle(null)}
          className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg w-max"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Feed
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4 ${selectedArticle.color}`}>
            {selectedArticle.category}
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            {selectedArticle.title}
          </h2>
          <div className="flex items-center gap-4 text-xs font-medium text-gray-400 border-b border-gray-100 pb-6 mb-6">
            <span>🕒 {selectedArticle.date}</span>
            <span>📖 {selectedArticle.readTime}</span>
          </div>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {selectedArticle.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-4">
        <div>
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tech Pulse</h3>
          <p className="text-gray-500 text-sm mt-1">Curated developer news and ecosystem updates.</p>
        </div>
        <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 w-max">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-red-700 uppercase tracking-wider">Live Feed</span>
        </div>
      </div>

      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedArticle(item)}
            className="group p-5 rounded-2xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${item.color}`}>
                {item.category}
              </span>
              <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                🕒 {item.date}
              </span>
            </div>
            <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {item.summary}
            </p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
              <span className="text-xs text-gray-500 font-medium">📖 {item.readTime}</span>
              <button className="text-sm font-semibold text-blue-500 group-hover:translate-x-1 transition-transform flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer">
                Read Article <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type OSSettings = {
  darkMode: boolean;
  animations: boolean;
  wifi: boolean;
  bluetooth: boolean;
  devMode: boolean;
  wallpaper: string;
  notifications: boolean;
  dock: boolean;
};

const SettingsContent = ({ settings, setSettings, notify }: { settings: OSSettings, setSettings: React.Dispatch<React.SetStateAction<OSSettings>>, notify: (title: string, msg: string, icon: string) => void }) => {
  const [activeTab, setActiveTab] = React.useState('General');
  const categories = ['General', 'Network', 'Display', 'System', 'Advanced'];

  const isDark = settings.darkMode;

  const handleToggle = (key: keyof OSSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ isOn, onClick }: { isOn: boolean, onClick: () => void }) => (
    <div
      onClick={onClick}
      className={`w-12 h-6 sm:w-14 sm:h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${isOn ? 'bg-green-500' : (isDark ? 'bg-slate-600' : 'bg-gray-300')}`}
    >
      <motion.div
        layout
        animate={{ x: isOn ? (typeof window !== 'undefined' && window.innerWidth > 640 ? 28 : 24) : 0 }}
        transition={{ duration: settings.animations ? 0.3 : 0 }}
        className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-md"
      />
    </div>
  );

  return (
    <div className={`space-y-6 animate-fade-in pb-12 max-w-3xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div>
        <h3 className="text-3xl font-extrabold tracking-tight">Settings</h3>
      </div>

      <div className="flex overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
        <div className={`flex space-x-2 p-1.5 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab ? (isDark ? 'text-black' : 'text-gray-900') : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="settings-tab-pill"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30, duration: settings.animations ? 0.5 : 0 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: settings.animations ? 10 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: settings.animations ? -10 : 0 }}
            transition={{ duration: settings.animations ? 0.2 : 0 }}
            className="space-y-6"
          >
            {activeTab === 'General' && (
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-lg flex items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-3xl z-10 backdrop-blur-md">👨‍💻</div>
                <div className="z-10">
                  <h4 className="text-xl font-bold">Melkamu</h4>
                  <p className="text-sm text-slate-300 font-medium mt-1">Administrator • Developer Account</p>
                </div>
              </div>
            )}

            {activeTab === 'Network' && (
              <div className={`border rounded-3xl shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between transition-colors ${isDark ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-50 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-sm shadow-sm">📶</div>
                    <div>
                      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Wi-Fi</p>
                      <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{settings.wifi ? 'Connected to Dev_Net_5G' : 'Off'}</p>
                    </div>
                  </div>
                  <ToggleSwitch isOn={settings.wifi} onClick={() => handleToggle('wifi')} />
                </div>
                <div className={`px-6 py-4 flex items-center justify-between transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-sm shadow-sm">ᛒ</div>
                    <div>
                      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Bluetooth</p>
                      <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{settings.bluetooth ? 'Discoverable' : 'Off'}</p>
                    </div>
                  </div>
                  <ToggleSwitch isOn={settings.bluetooth} onClick={() => handleToggle('bluetooth')} />
                </div>
              </div>
            )}

            {activeTab === 'Display' && (
              <div className="space-y-6">
                <div className={`border rounded-3xl shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                  <div className={`px-6 py-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-50'}`}>
                    <p className={`text-sm font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-sm shadow-sm">🖼️</span>
                      Wallpaper
                    </p>
                    <p className={`text-xs font-medium mt-1 ml-11 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Choose your home screen background</p>
                  </div>
                  <div className="p-4 grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {Object.entries(WALLPAPERS).map(([key, wp]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSettings(prev => ({ ...prev, wallpaper: key }));
                          notify('Wallpaper Changed', `${wp.label} applied`, '🖼️');
                        }}
                        className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                          settings.wallpaper === key
                            ? 'border-blue-500 scale-105 shadow-lg'
                            : isDark ? 'border-slate-700 hover:border-slate-500' : 'border-gray-200 hover:border-gray-400'
                        }`}
                        title={wp.label}
                      >
                        <div className={`absolute inset-0 ${wp.preview}`} />
                        {settings.wallpaper === key && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <span className="text-white text-xl">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className={`px-4 pb-4 text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                    Selected: <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{WALLPAPERS[settings.wallpaper]?.label || 'Default'}</span>
                  </div>
                </div>

                <div className={`border rounded-3xl shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                  <div className={`px-6 py-4 border-b flex items-center justify-between transition-colors ${isDark ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-50 hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white text-sm shadow-sm">🌙</div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Dark Mode</p>
                        <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>System theme override</p>
                      </div>
                    </div>
                    <ToggleSwitch isOn={settings.darkMode} onClick={() => handleToggle('darkMode')} />
                  </div>
                  <div className={`px-6 py-4 border-b flex items-center justify-between transition-colors ${isDark ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-50 hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white text-sm shadow-sm">✨</div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>OS Animations</p>
                        <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Enable fluid transitions</p>
                      </div>
                    </div>
                    <ToggleSwitch isOn={settings.animations} onClick={() => handleToggle('animations')} />
                  </div>
                  <div className={`px-6 py-4 border-b flex items-center justify-between transition-colors ${isDark ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-50 hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm shadow-sm">🔔</div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Notifications</p>
                        <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Show toast banners</p>
                      </div>
                    </div>
                    <ToggleSwitch isOn={settings.notifications} onClick={() => handleToggle('notifications')} />
                  </div>
                  <div className={`px-6 py-4 flex items-center justify-between transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white text-sm shadow-sm">🎯</div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Show Dock</p>
                        <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Floating quick-launch bar</p>
                      </div>
                    </div>
                    <ToggleSwitch isOn={settings.dock} onClick={() => handleToggle('dock')} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'System' && (
              <div className={`border rounded-3xl shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-slate-700' : 'border-gray-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm shadow-sm">💻</div>
                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Hardware</p>
                  </div>
                  <span className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>HP EliteBook 840 G6</span>
                </div>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-slate-700' : 'border-gray-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white text-sm shadow-sm">🐧</div>
                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Operating System</p>
                  </div>
                  <span className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Ubuntu 22.04 LTS</span>
                </div>
              </div>
            )}

            {activeTab === 'Advanced' && (
              <div className="space-y-6">
                <div className={`border rounded-3xl shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                  <div className={`px-6 py-4 flex items-center justify-between transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white text-sm shadow-sm">⚠️</div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Developer Mode</p>
                        <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Enable advanced root features</p>
                      </div>
                    </div>
                    <ToggleSwitch isOn={settings.devMode} onClick={() => handleToggle('devMode')} />
                  </div>
                </div>

                <AnimatePresence>
                  {settings.devMode && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`border rounded-2xl p-4 flex gap-4 items-start shadow-sm ${isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}
                    >
                      <span className="text-xl">🛠️</span>
                      <div>
                        <h5 className={`text-sm font-bold ${isDark ? 'text-red-400' : 'text-red-800'}`}>Developer Options Enabled</h5>
                        <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-red-300' : 'text-red-600'}`}>
                          You now have root access to the Portfolio OS. Terminal permissions have been elevated. Advanced debugging tools are active.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Resume Content
const ResumeContent = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`space-y-8 animate-fade-in pb-12 max-w-3xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="text-center space-y-3 pt-4">
        <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-5xl shadow-lg border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          📄
        </div>
        <h3 className="text-3xl font-extrabold tracking-tight">Resume</h3>
        <p className={`text-sm max-w-md mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          Download or view the complete PDF version of my resume.
        </p>
      </div>

      <div className={`relative rounded-3xl border shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
        <div className={`relative aspect-[8.5/11] max-h-[420px] flex flex-col items-center justify-center gap-4 border-b ${isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
          <div className={`absolute inset-0 opacity-[0.04] pointer-events-none`} style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

          <div className={`relative z-10 w-[55%] max-w-[260px] aspect-[8.5/11] rounded-md shadow-2xl border flex flex-col p-4 gap-2 ${isDark ? 'bg-white border-gray-300' : 'bg-white border-gray-200'}`}>
            <div className="h-3 w-1/2 bg-slate-800 rounded-sm" />
            <div className="h-1.5 w-3/4 bg-slate-300 rounded-sm" />
            <div className="h-1.5 w-2/3 bg-slate-300 rounded-sm" />
            <div className="mt-2 h-1 w-1/3 bg-slate-700 rounded-sm" />
            <div className="h-1 w-full bg-slate-200 rounded-sm" />
            <div className="h-1 w-full bg-slate-200 rounded-sm" />
            <div className="h-1 w-5/6 bg-slate-200 rounded-sm" />
            <div className="mt-2 h-1 w-1/3 bg-slate-700 rounded-sm" />
            <div className="h-1 w-full bg-slate-200 rounded-sm" />
            <div className="h-1 w-4/5 bg-slate-200 rounded-sm" />
            <div className="h-1 w-full bg-slate-200 rounded-sm" />
          </div>

          <div className={`absolute top-3 right-3 z-20 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-white text-gray-600 border border-gray-200'}`}>
            PDF
          </div>
        </div>

        <div className="p-6 space-y-3">
          <a
            href="/resume.pdf"
            download
            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:scale-[0.98] ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <span className="text-xl">⬇️</span> Download Resume
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border hover:-translate-y-0.5 active:scale-[0.98] ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800'
                : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">👁️</span> View in Browser
          </a>
        </div>
      </div>

      <div className={`rounded-2xl p-4 text-xs leading-relaxed flex gap-3 items-start border ${
        isDark ? 'bg-slate-800/50 border-slate-700 text-slate-400' : 'bg-gray-50 border-gray-200 text-gray-500'
      }`}>
        <span className="text-base">💡</span>
        <span>The resume is a PDF file — you can download it for offline viewing or open it directly in your browser. All content is up to date.</span>
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

  const navigateTo = (url: string) => {
    setInputUrl(url);
    setIsLoading(true);
    setTimeout(() => {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(url);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      setIsLoading(false);
    }, 800);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setInputUrl(history[currentIndex - 1]);
        setIsLoading(false);
      }, 400);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setInputUrl(history[currentIndex + 1]);
        setIsLoading(false);
      }, 400);
    }
  };

  const reload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let finalUrl = inputUrl.trim().toLowerCase();
      if (!finalUrl.includes('.')) {
        finalUrl = `${finalUrl}.com`;
      }
      if (!finalUrl.startsWith('http')) {
        finalUrl = `https://${finalUrl}`;
      }
      navigateTo(finalUrl);
    }
  };

  const renderViewport = () => {
    if (currentUrl.includes('melkamu.dev')) {
      return (
        <div className="p-8 max-w-4xl mx-auto animate-fade-in">
          <h1 className={`text-4xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Hi, I'm Melkamu.
          </h1>
          <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            I am a Full-Stack & Mobile Application Developer based in Bahir Dar, Ethiopia. I specialize in building scalable architectures using Next.js, Laravel, and MySQL.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
              <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>🚀 What I Do</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                From designing organizational management systems to architecting smart digital menus, I handle the entire lifecycle of software development.
              </p>
            </div>
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
              <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>🎓 Background</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Studied theoretical computer science, compiler design, and automata theory at Bahir Dar Institute of Technology (BiT).
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (currentUrl.includes('google.com/search')) {
      let query = googleSearch;
      try {
        const urlObj = new URL(currentUrl);
        query = urlObj.searchParams.get('q') || googleSearch;
      } catch (e) {}

      const decodedQuery = decodeURIComponent(query);
      const isProfileSearch = decodedQuery.toLowerCase().includes('melkamu') || decodedQuery.toLowerCase().includes('developer');

      return (
        <div className={`p-6 max-w-3xl mx-auto animate-fade-in ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
           <div className={`flex flex-col sm:flex-row sm:items-center gap-4 mb-6 border-b pb-4 ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
             <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo('https://google.com')}>
               <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
             </h1>
             <div className={`flex-1 max-w-xl flex items-center px-4 py-2 rounded-full border shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                <input
                  type="text"
                  value={googleSearch}
                  onChange={(e) => setGoogleSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigateTo(`https://google.com/search?q=${encodeURIComponent(googleSearch)}`);
                    }
                  }}
                  className={`bg-transparent flex-1 outline-none text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
                />
             </div>
           </div>

           <div className="text-sm text-gray-500 mb-6">About 439,000,000 results (0.34 seconds)</div>

           {isProfileSearch ? (
             <>
               <div className="mb-8 cursor-pointer" onClick={() => navigateTo('https://melkamu.dev/about')}>
                 <div className="text-sm flex items-center gap-2 mb-1">
                   <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isDark ? 'bg-slate-700 text-white' : 'bg-slate-100 text-gray-800'}`}>👨‍💻</span>
                   https://melkamu.dev › about
                 </div>
                 <h3 className="text-xl text-blue-600 dark:text-blue-400 hover:underline mb-1">Melkamu | Full-Stack & Mobile Developer</h3>
                 <p className="text-sm">I am a Full-Stack & Mobile Application Developer based in Bahir Dar, Ethiopia. I specialize in building scalable architectures using Next.js...</p>
               </div>

               <div className="mb-8 cursor-pointer" onClick={() => window.open('https://github.com/melaku-git', '_blank')}>
                 <div className="text-sm flex items-center gap-2 mb-1">
                   <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isDark ? 'bg-slate-700 text-white' : 'bg-slate-100 text-gray-800'}`}>🐙</span>
                   https://github.com › melaku-git
                 </div>
                 <h3 className="text-xl text-blue-600 dark:text-blue-400 hover:underline mb-1">melaku-git - GitHub</h3>
                 <p className="text-sm">Full-Stack & Mobile Application Developer. Passionate about system architecture, clean UI/UX, and building scalable web applications.</p>
               </div>
             </>
           ) : (
             <>
               <div className="mb-8 cursor-pointer">
                 <div className="text-sm flex items-center gap-2 mb-1">
                   <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isDark ? 'bg-slate-700 text-white' : 'bg-slate-100 text-gray-800'}`}>🌍</span>
                   https://en.wikipedia.org › wiki › {encodeURIComponent(decodedQuery.replace(/\s+/g, '_'))}
                 </div>
                 <h3 className="text-xl text-blue-600 dark:text-blue-400 hover:underline mb-1 capitalize">{decodedQuery} - Wikipedia</h3>
                 <p className="text-sm">Find comprehensive information, history, and details about <strong>{decodedQuery}</strong> on Wikipedia, the free encyclopedia.</p>
               </div>
               <div className="mb-8 cursor-pointer">
                 <div className="text-sm flex items-center gap-2 mb-1">
                   <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isDark ? 'bg-slate-700 text-white' : 'bg-slate-100 text-gray-800'}`}>🌐</span>
                   https://www.{decodedQuery.replace(/\s+/g, '').toLowerCase()}.com
                 </div>
                 <h3 className="text-xl text-blue-600 dark:text-blue-400 hover:underline mb-1 capitalize">Official {decodedQuery} Website</h3>
                 <p className="text-sm">The official home of <strong>{decodedQuery}</strong>. Get the latest updates, support, and exclusive content directly from the source.</p>
               </div>
             </>
           )}
        </div>
      );
    }

    if (currentUrl === 'https://google.com' || currentUrl === 'https://google.com/') {
      return (
        <div className="h-full flex flex-col items-center justify-center animate-fade-in pb-20">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </h1>
          <div className={`w-full max-w-xl flex items-center px-4 py-3 rounded-full border shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <span className="text-gray-400 mr-3">🔍</span>
            <input
              type="text"
              value={googleSearch}
              onChange={(e) => setGoogleSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigateTo(`https://google.com/search?q=${encodeURIComponent(googleSearch)}`);
                }
              }}
              className={`bg-transparent flex-1 outline-none text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}
              autoFocus
            />
          </div>
          <div className="mt-6 flex gap-3">
             <button
               onClick={() => navigateTo(`https://google.com/search?q=${encodeURIComponent(googleSearch)}`)}
               className={`px-5 py-2.5 rounded-md text-sm transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-gray-300' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700'}`}
             >
               Google Search
             </button>
          </div>
        </div>
      );
    }

    if (currentUrl.includes('youtube.com')) {
      return (
        <div className={`h-full flex flex-col p-6 animate-fade-in ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-6 bg-red-600 rounded-lg flex items-center justify-center">
              <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-white border-b-4 border-b-transparent ml-0.5"></div>
            </div>
            <h1 className="text-xl font-bold tracking-tighter">YouTube</h1>
          </div>
          <h2 className="font-bold mb-4">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex flex-col gap-3">
                <div className={`aspect-video rounded-xl shadow-sm ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full shrink-0 ${isDark ? 'bg-slate-700' : 'bg-gray-300'}`}></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className={`h-3.5 rounded ${isDark ? 'bg-slate-700' : 'bg-gray-300'} w-full`}></div>
                    <div className={`h-3 rounded ${isDark ? 'bg-slate-700' : 'bg-gray-300'} w-2/3`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col items-center justify-center animate-fade-in text-center px-4 pb-20">
        <span className="text-6xl mb-4">🌐</span>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>This site can't be reached</h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Check if there is a typo in {currentUrl}.<br/>
          (Simulated browser environment)
        </p>
      </div>
    );
  };

  return (
    <div className={`h-full flex flex-col rounded-xl overflow-hidden border shadow-sm transition-colors ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>

      <div className={`flex flex-col ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>

        <div className="flex items-end px-2 pt-2 gap-1">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-xs font-medium min-w-[140px] max-w-[200px] border-b-0 shadow-sm ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-gray-800'}`}>
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="truncate flex-1">
              {currentUrl.replace('https://', '').replace('.com', '')}
            </span>
            <span className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer">×</span>
          </div>
          <div className={`w-8 h-8 flex items-center justify-center rounded-t-lg mb-0.5 cursor-pointer text-lg ${isDark ? 'text-gray-400 hover:bg-slate-700' : 'text-gray-500 hover:bg-gray-200'}`}>
            +
          </div>
        </div>

        <div className={`flex items-center gap-3 px-3 py-2 border-y ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
          <div className={`flex gap-3 text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <button
              onClick={goBack}
              disabled={currentIndex === 0}
              className={`transition-colors ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-blue-500'}`}
            >
              ←
            </button>
            <button
              onClick={goForward}
              disabled={currentIndex === history.length - 1}
              className={`transition-colors ${currentIndex === history.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-blue-500'}`}
            >
              →
            </button>
            <button onClick={reload} className="hover:text-blue-500 transition-colors">↻</button>
          </div>

          <div className={`flex-1 flex items-center px-3 py-1.5 rounded-full text-sm border focus-within:ring-2 focus-within:ring-blue-500/50 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-100 border-gray-200 text-gray-900'}`}>
            <span className="text-green-500 mr-2 text-xs">🔒</span>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none"
              spellCheck="false"
            />
          </div>

          <div className={`text-lg cursor-pointer ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            ⋮
          </div>
        </div>

        <div className={`flex gap-4 px-4 py-1.5 text-xs font-medium border-b ${isDark ? 'bg-slate-900 border-slate-700 text-gray-400' : 'bg-white border-gray-200 text-gray-600'}`}>
          <button onClick={() => navigateTo('https://melkamu.dev/about')} className="hover:text-blue-500 flex items-center gap-1">👤 About Me</button>
          <button onClick={() => navigateTo('https://google.com')} className="hover:text-blue-500 flex items-center gap-1">🔍 Search</button>
          <button onClick={() => navigateTo('https://youtube.com')} className="hover:text-red-500 flex items-center gap-1">▶️ YouTube</button>
          <button onClick={() => window.open('https://github.com/melaku-git', '_blank')} className="hover:text-blue-500 flex items-center gap-1">🐙 GitHub</button>
        </div>
      </div>

      <div className="h-0.5 w-full bg-transparent relative overflow-hidden">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-blue-500 z-50"
            />
          )}
        </AnimatePresence>
      </div>

      <div className={`flex-1 overflow-y-auto relative ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key={currentUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderViewport()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ContactContent = ({ isDark }: { isDark: boolean }) => {
  const [formState, setFormState] = React.useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
    setTimeout(() => setFormState('idle'), 4000);
  };

  const contactLinks = [
    { name: 'Email', value: 'melkamuderso147@gmail.com', url: 'mailto:melkamuderso147@gmail.com', icon: '📧', lightTheme: 'bg-rose-50 border-rose-100 text-rose-600', darkTheme: 'bg-rose-500/10 border-rose-500/20 text-rose-400' },
    { name: 'LinkedIn', value: 'melkamu-derso', url: 'https://www.linkedin.com/in/melkamu-derso-85915a418', icon: '💼', lightTheme: 'bg-blue-50 border-blue-100 text-blue-600', darkTheme: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
    { name: 'GitHub', value: '@melaku-git', url: 'https://github.com/melaku-git', icon: '🐙', lightTheme: 'bg-slate-100 border-slate-200 text-slate-700', darkTheme: 'bg-slate-700/50 border-slate-600 text-slate-300' },
    { name: 'Telegram', value: '@falconn19', url: 'https://t.me/falconn19', icon: '✈️', lightTheme: 'bg-sky-50 border-sky-100 text-sky-600', darkTheme: 'bg-sky-500/10 border-sky-500/20 text-sky-400' }
  ];

  return (
    <div className={`space-y-10 animate-fade-in pb-12 max-w-4xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="text-center space-y-3 pt-4">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl shadow-sm border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'}`}>
          👋
        </div>
        <h3 className="text-3xl font-extrabold tracking-tight">Let's Connect</h3>
        <p className={`text-sm max-w-md mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          I am always open to discussing system architecture, mobile development, or new full-stack project opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactLinks.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-500' : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'}`}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border transition-transform group-hover:scale-110 ${isDark ? link.darkTheme : link.lightTheme}`}>
              {link.icon}
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-sm font-bold truncate">{link.name}</h4>
              <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{link.value}</p>
            </div>
            <div className={`text-xl transition-all group-hover:translate-x-1 ${isDark ? 'text-slate-600 group-hover:text-white' : 'text-gray-300 group-hover:text-blue-500'}`}>
              →
            </div>
          </a>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📝</span>
          <h4 className="text-xl font-bold">Send a Message</h4>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="Your Name"
              className={`w-full px-5 py-3.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
            />
            <input
              required
              type="email"
              placeholder="Your Email"
              className={`w-full px-5 py-3.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
            />
          </div>
          <textarea
            required
            placeholder="How can I help you?"
            rows={4}
            className={`w-full px-5 py-3.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none ${isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
          ></textarea>

          <button
            type="submit"
            disabled={formState !== 'idle'}
            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
              formState === 'sent'
                ? 'bg-green-500 text-white'
                : formState === 'sending'
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md hover:-translate-y-0.5'
            }`}
          >
            {formState === 'idle' ? 'Send Message 🚀' : formState === 'sending' ? 'Sending...' : 'Message Sent! ✅'}
          </button>
        </div>
      </form>
    </div>
  );
};

const ArchitectureContent = ({ isDark }: { isDark: boolean }) => {
  const [activeSystem, setActiveSystem] = React.useState('cafe');
  const systems = [
    { id: 'cafe', name: 'Smart Digital Menu' },
    { id: 'bit', name: 'BiT Internship System' },
    { id: 'portfolio', name: 'Portfolio OS Core' }
  ];

  return (
    <div className={`space-y-8 animate-fade-in pb-12 max-w-4xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div>
        <h3 className="text-3xl font-extrabold tracking-tight">System Architecture</h3>
        <p className={`text-sm mt-2 max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          High-level blueprints and structural workflows of the full-stack applications I have engineered, detailing data flow and technology integrations.
        </p>
      </div>

      <div className="flex overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
        <div className={`flex space-x-2 p-1.5 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
          {systems.map((sys) => (
            <button
              key={sys.id}
              onClick={() => setActiveSystem(sys.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-200 ${
                activeSystem === sys.id ? (isDark ? 'text-black' : 'text-gray-900') : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
              }`}
            >
              {activeSystem === sys.id && (
                <motion.div
                  layoutId="architecture-tab-pill"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{sys.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`p-6 sm:p-10 rounded-3xl border shadow-sm relative overflow-hidden ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSystem}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {activeSystem === 'cafe' && (
              <div className="space-y-10">
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold">Cafe Ordering Platform</h4>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Laravel REST API + Next.js Frontend + MySQL Database</p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
                  <div className={`w-32 p-4 rounded-xl text-center border shadow-sm ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}`}>
                    <div className="text-2xl mb-1">📱</div>
                    <div className="text-xs font-bold">Client App</div>
                    <div className={`text-[10px] ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Next.js UI</div>
                  </div>
                  <div className={`hidden md:flex flex-col items-center text-xs font-mono ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                    <span>HTTP/JSON</span>
                    <div className="w-16 h-px bg-current relative my-1">
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-current transform rotate-45"></div>
                    </div>
                  </div>
                  <div className="md:hidden h-8 w-px bg-gray-400"></div>

                  <div className={`w-40 p-4 rounded-xl text-center border shadow-sm relative ${isDark ? 'bg-red-900/20 border-red-500/30' : 'bg-red-50 border-red-100'}`}>
                    <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="text-2xl mb-1">⚙️</div>
                    <div className="text-xs font-bold">Core Backend</div>
                    <div className={`text-[10px] ${isDark ? 'text-red-400' : 'text-red-600'}`}>Laravel / PHP Routes</div>
                  </div>

                  <div className={`hidden md:flex flex-col items-center text-xs font-mono ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                    <span>Eloquent ORM</span>
                    <div className="w-16 h-px bg-current relative my-1">
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-current transform rotate-45"></div>
                    </div>
                  </div>
                  <div className="md:hidden h-8 w-px bg-gray-400"></div>

                  <div className={`w-32 p-4 rounded-xl text-center border shadow-sm ${isDark ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-100'}`}>
                    <div className="text-2xl mb-1">🗄️</div>
                    <div className="text-xs font-bold">Database</div>
                    <div className={`text-[10px] ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>MySQL Relational</div>
                  </div>
                </div>

                <div className={`grid grid-cols-2 gap-4 mt-8 pt-8 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider mb-2">Key Features</h5>
                    <ul className={`text-xs space-y-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      <li>• Real-time order tracking</li>
                      <li>• Optimized relational schema</li>
                      <li>• Secure JWT Authentication</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider mb-2">Deployment</h5>
                    <ul className={`text-xs space-y-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      <li>• Ubuntu 22.04 LTS Server</li>
                      <li>• Nginx Reverse Proxy</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSystem === 'bit' && (
              <div className="space-y-10">
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold">BiT Internship Placement System</h4>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Next.js Full-Stack App Router + MongoDB</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
                  <div className="flex flex-col gap-2">
                    <div className={`w-28 p-2 rounded-lg text-center border shadow-sm text-[10px] font-bold ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}`}>👨‍🎓 Student</div>
                    <div className={`w-28 p-2 rounded-lg text-center border shadow-sm text-[10px] font-bold ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}`}>👨‍🏫 Admin</div>
                  </div>

                  <div className={`hidden md:flex flex-col items-center text-xs font-mono ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                    <span>RBAC</span>
                    <div className="w-12 h-px bg-current relative my-1">
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-current transform rotate-45"></div>
                    </div>
                  </div>

                  <div className={`w-44 p-4 rounded-xl text-center border shadow-sm ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}`}>
                    <div className="text-2xl mb-1">▲</div>
                    <div className="text-xs font-bold">Next.js Framework</div>
                    <div className="flex gap-2 justify-center mt-2">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>Server Components</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>API Routes</span>
                    </div>
                  </div>

                  <div className={`hidden md:flex flex-col items-center text-xs font-mono ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                    <span>Mongoose</span>
                    <div className="w-12 h-px bg-current relative my-1">
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-current transform rotate-45"></div>
                    </div>
                  </div>

                  <div className={`w-32 p-4 rounded-xl text-center border shadow-sm ${isDark ? 'bg-green-900/20 border-green-500/30' : 'bg-green-50 border-green-100'}`}>
                    <div className="text-2xl mb-1">🍃</div>
                    <div className="text-xs font-bold">Database</div>
                    <div className={`text-[10px] ${isDark ? 'text-green-400' : 'text-green-600'}`}>MongoDB (NoSQL)</div>
                  </div>
                </div>

                <div className={`grid grid-cols-2 gap-4 mt-8 pt-8 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider mb-2">Key Features</h5>
                    <ul className={`text-xs space-y-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      <li>• Role-Based Access Control</li>
                      <li>• Document-based schemas</li>
                      <li>• System UML Documentation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider mb-2">Frontend Stack</h5>
                    <ul className={`text-xs space-y-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      <li>• React / Tailwind CSS</li>
                      <li>• Framer Motion</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSystem === 'portfolio' && (
              <div className="space-y-10">
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold">Portfolio OS</h4>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Client-Side Stateful Interactive Web Application</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className={`w-36 p-4 rounded-xl text-center border shadow-sm ${isDark ? 'bg-indigo-900/20 border-indigo-500/30' : 'bg-indigo-50 border-indigo-100'}`}>
                    <div className="text-2xl mb-1">🧠</div>
                    <div className="text-xs font-bold">Global State</div>
                    <div className={`text-[10px] mt-1 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Active App tracking, Dark Mode, Animations config</div>
                  </div>

                  <div className={`hidden md:flex flex-col items-center text-[20px] font-mono ${isDark ? 'text-slate-500' : 'text-gray-300'}`}>
                    ↹
                  </div>
                  <div className="md:hidden text-lg rotate-90 text-gray-300">↹</div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className={`p-2 rounded-lg text-center border shadow-sm text-[10px] font-bold ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}`}>💻 Virtual Terminal</div>
                    <div className={`p-2 rounded-lg text-center border shadow-sm text-[10px] font-bold ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}`}>🌐 Browser Engine</div>
                    <div className={`p-2 rounded-lg text-center border shadow-sm text-[10px] font-bold ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}`}>⚙️ Settings Sync</div>
                    <div className={`p-2 rounded-lg text-center border shadow-sm text-[10px] font-bold ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}`}>✨ Layout Animations</div>
                  </div>
                </div>

                <div className={`mt-8 pt-8 border-t text-center ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    Built natively in Next.js utilizing React Hooks for state management and Framer Motion's `layoutId` for fluid, native-feeling full-screen app transitions.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const CourseworkContent = ({ isDark }: { isDark: boolean }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>('algorithms');

  const courses = [
    { id: 'algorithms', title: 'Data Structures & Algorithms', icon: '🗂️', description: 'Core principles of organizing data efficiently and designing algorithms to solve complex computational problems.', topics: ['Graph Theory and Trees', 'Dynamic Programming', 'Sorting & Searching Algorithms', 'Big-O Time & Space Complexity'], color: 'rose' },
    { id: 'programming', title: 'Programming Languages', icon: '💻', description: 'Exploration of programming paradigms, language syntax, semantics, and execution models across different systems.', topics: ['Object-Oriented Programming (OOP)', 'Functional Programming', 'Memory Management', 'Concurrency & Multithreading'], color: 'orange' },
    { id: 'networking', title: 'Networking & Subnetting', icon: '🌐', description: 'Fundamentals of network communication, protocols, routing, and infrastructure design.', topics: ['OSI and TCP/IP Models', 'IPv4/IPv6 Subnetting & Addressing', 'Routing and Switching Protocols', 'Network Security & Firewalls'], color: 'cyan' },
    { id: 'compiler', title: 'Compiler Design', icon: '⚙️', description: 'Deep dive into the phases of translation, syntax analysis, and grammar evaluation.', topics: ['Context-free grammars', 'Advanced parsing techniques', 'Computing FIRST and FOLLOW sets', 'Lexical analysis and tokenization'], color: 'blue' },
    { id: 'automata', title: 'Automata Theory', icon: '🔄', description: 'Study of abstract computing machines, mathematical models of computation, and language classification.', topics: ['Turing Machine constructions', 'Chomsky hierarchy classifications', 'Finite Automata (DFA/NFA)', 'Pushdown automata'], color: 'purple' },
    { id: 'complexity', title: 'Computational Complexity', icon: '🧠', description: 'Theoretical computer science concepts focusing on algorithmic efficiency and resource classification.', topics: ['Theoretical limits of computation', 'P versus NP relationships', 'Time and space complexity analysis', 'NP-completeness and reductions'], color: 'emerald' }
  ];

  const getColorClasses = (color: string, isDark: boolean) => {
    const classes: Record<string, string> = {
      rose: isDark ? 'bg-rose-900/30 border-rose-500/30' : 'bg-rose-50 border-rose-100',
      orange: isDark ? 'bg-orange-900/30 border-orange-500/30' : 'bg-orange-50 border-orange-100',
      cyan: isDark ? 'bg-cyan-900/30 border-cyan-500/30' : 'bg-cyan-50 border-cyan-100',
      blue: isDark ? 'bg-blue-900/30 border-blue-500/30' : 'bg-blue-50 border-blue-100',
      purple: isDark ? 'bg-purple-900/30 border-purple-500/30' : 'bg-purple-50 border-purple-100',
      emerald: isDark ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-emerald-50 border-emerald-100',
    };
    return classes[color];
  };

  const getDotClass = (color: string) => {
    const classes: Record<string, string> = { rose: 'bg-rose-500', orange: 'bg-orange-500', cyan: 'bg-cyan-500', blue: 'bg-blue-500', purple: 'bg-purple-500', emerald: 'bg-emerald-500' };
    return classes[color];
  };

  return (
    <div className={`space-y-8 animate-fade-in pb-12 max-w-3xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="space-y-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
          <span>🎓</span> Bahir Dar Institute of Technology (BiT)
        </div>
        <h3 className="text-3xl font-extrabold tracking-tight">Academic Coursework</h3>
        <p className={`text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          A structured overview of my foundational computer science studies, covering everything from core algorithms and memory management to network routing and theoretical computation.
        </p>
      </div>

      <div className="space-y-4">
        {courses.map((course) => {
          const isExpanded = expandedId === course.id;
          return (
            <div key={course.id} className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-gray-200 bg-white shadow-sm'}`}>
              <button
                onClick={() => setExpandedId(isExpanded ? null : course.id)}
                className={`w-full flex items-center justify-between p-5 text-left transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm border ${getColorClasses(course.color, isDark)}`}>
                    {course.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{course.title}</h4>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Computer Science Curriculum</p>
                  </div>
                </div>
                <div className={`text-xl transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                  ↓
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={`px-5 pb-6 pt-2 border-t ${isDark ? 'border-slate-700/50' : 'border-gray-100'}`}>
                      <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{course.description}</p>
                      <h5 className="text-xs font-bold uppercase tracking-wider mb-3">Core Topics Covered</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {course.topics.map((topic, index) => (
                          <div key={index} className={`flex items-center gap-2.5 p-3 rounded-lg border text-sm font-medium ${isDark ? 'bg-slate-900/50 border-slate-700 text-slate-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${getDotClass(course.color)}`}></div>
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EducationContent = ({ isDark }: { isDark: boolean }) => {
  const certifications = [
    { title: "Full-Stack Web Development", issuer: "BIT", date: "2026", icon: "🌐", color: "blue" },
    { title: "Computer Security and Operating System Fundamentals", issuer: "BIT", date: "2026", icon: "🛡️", color: "emerald" },
    { title: "Mobile App Architecture (React Native/Android)", issuer: "BIT", date: "2026", icon: "📱", color: "purple" }
  ];

  return (
    <div className={`space-y-10 animate-fade-in pb-12 max-w-4xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div>
        <h3 className="text-3xl font-extrabold tracking-tight mb-2">Education & Credentials</h3>
        <p className={`text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          My academic background and professional certifications, highlighting my formal training in software engineering and system architecture.
        </p>
      </div>

      <div className="relative rounded-[2rem] overflow-hidden p-8 sm:p-10 shadow-2xl group cursor-default">
        <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${isDark ? 'bg-gradient-to-br from-slate-800 via-indigo-900/40 to-slate-900' : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700'}`}></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between text-white">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Class of 2026
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2 drop-shadow-md">
                Bachelor of Science in <br className="hidden sm:block" /> Computer Science
              </h2>
              <p className="text-lg sm:text-xl font-medium text-blue-100 flex items-center gap-2 drop-shadow-sm">
                <span>🎓</span> Bahir Dar Institute of Technology (BiT)
              </p>
            </div>
          </div>
          <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="text-4xl sm:text-5xl mb-1">🦁</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-100">BiT Alumni</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Major", value: "Software Eng", icon: "💻" },
          { label: "Focus", value: "Full-Stack & OS", icon: "🏗️" },
          { label: "Location", value: "Bahir Dar, ET", icon: "📍" },
          { label: "Status", value: "Active", icon: "✨" }
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-colors ${isDark ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-sm'}`}>
            <span className="text-2xl mb-2">{stat.icon}</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{stat.label}</span>
            <span className="text-sm font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
          <span>📜</span> Professional Certifications
        </h4>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-slate-500' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm border ${
                  isDark ? `bg-${cert.color}-900/30 border-${cert.color}-500/30` : `bg-${cert.color}-50 border-${cert.color}-100`
                }`}>
                  {cert.icon}
                </div>
                <div>
                  <h5 className="font-bold text-base group-hover:text-blue-500 transition-colors">{cert.title}</h5>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{cert.issuer}</p>
                </div>about 
              </div>
              <div className={`hidden sm:flex items-center px-3 py-1 rounded-full text-xs font-bold border ${isDark ? 'bg-slate-900 border-slate-600 text-slate-300' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                {cert.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileAppsContent = ({ isDark }: { isDark: boolean }) => {
  const mobileProjects = [
    { title: "Smart Cafe Ordering", platform: "iOS & Android", tech: "React Native • Expo", description: "A cross-platform mobile counterpart to the digital menu system. Features real-time cart synchronization, QR code table scanning, and push notifications for order status.", color: "blue" },
    { title: "BiT Student Portal", platform: "Android Native", tech: "Kotlin • Jetpack Compose", description: "Native Android application for the Bahir Dar Institute of Technology. Allows students to check internship placements, submit reports, and receive academic alerts.", color: "emerald" },
    { title: "Inventory Scanner", platform: "Android Enterprise", tech: "React Native • Zebra API", description: "Warehouse management utility integrated with the Organizational Management System. Utilizes device cameras for high-speed barcode and QR code inventory auditing.", color: "purple" }
  ];

  const getColorClasses = (color: string, isDark: boolean, type: 'bg' | 'text' | 'border') => {
    const maps: Record<string, Record<string, string>> = {
      blue: { bg: isDark ? 'bg-blue-500/20' : 'bg-blue-100', text: isDark ? 'text-blue-400' : 'text-blue-600', border: isDark ? 'border-blue-500/30' : 'border-blue-200' },
      emerald: { bg: isDark ? 'bg-emerald-500/20' : 'bg-emerald-100', text: isDark ? 'text-emerald-400' : 'text-emerald-600', border: isDark ? 'border-emerald-500/30' : 'border-emerald-200' },
      purple: { bg: isDark ? 'bg-purple-500/20' : 'bg-purple-100', text: isDark ? 'text-purple-400' : 'text-purple-600', border: isDark ? 'border-purple-500/30' : 'border-purple-200' },
    };
    return maps[color][type];
  };

  return (
    <div className={`space-y-10 animate-fade-in pb-12 max-w-5xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 border-opacity-20 border-gray-500">
        <div>
          <h3 className="text-3xl font-extrabold tracking-tight mb-2">Mobile Applications</h3>
          <p className={`text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Native and cross-platform mobile solutions engineered for seamless performance, intuitive touch interfaces, and robust backend synchronization.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mobileProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, ease: "easeOut" }}
            className={`group flex flex-col rounded-[2rem] border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDark ? 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:shadow-black/50' : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-gray-200/50'}`}
          >
            <div className={`h-48 relative flex justify-center items-end pt-6 overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-gray-200'}`}>
              <div className={`absolute top-4 left-4 w-24 h-24 rounded-full blur-2xl opacity-40 ${getColorClasses(project.color, isDark, 'bg')}`}></div>
              <div className={`absolute bottom-4 right-4 w-32 h-32 rounded-full blur-2xl opacity-40 ${getColorClasses(project.color, isDark, 'bg')}`}></div>
              <div className={`relative z-10 w-40 h-48 rounded-t-3xl border-x-4 border-t-4 border-b-0 shadow-2xl flex flex-col items-center pt-2 px-2 transition-transform duration-500 group-hover:translate-y-2 ${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-300'}`}>
                <div className={`w-12 h-3 rounded-b-xl mb-4 ${isDark ? 'bg-gray-900' : 'bg-gray-200'}`}></div>
                <div className={`w-full h-8 rounded-lg mb-2 opacity-50 ${getColorClasses(project.color, isDark, 'bg')}`}></div>
                <div className={`w-full h-20 rounded-lg opacity-30 ${getColorClasses(project.color, isDark, 'bg')}`}></div>
              </div>
            </div>

            <div className={`p-6 flex-1 flex flex-col ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${getColorClasses(project.color, isDark, 'bg')} ${getColorClasses(project.color, isDark, 'text')} ${getColorClasses(project.color, isDark, 'border')}`}>
                  {project.platform}
                </span>
              </div>
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

const WebAppsContent = ({ isDark }: { isDark: boolean }) => {
  const webProjects = [
    { title: "Organizational Management System", type: "Enterprise Dashboard", tech: "Next.js • Node.js • API", description: "A comprehensive web-based management system featuring member tracking, financial recordkeeping, inventory management, and event scheduling.", color: "blue" },
    { title: "Smart Digital Menu", type: "SaaS Platform", tech: "Laravel • Next.js • MySQL", description: "Digital ordering platform tailored for cafes. Features real-time order tracking mechanisms and highly optimized relational database schemas.", color: "rose" },
    { title: "BiT Internship Portal", type: "Academic System", tech: "Next.js • MongoDB • RBAC", description: "Internship Placement and Management System for Bahir Dar Institute of Technology. Implements secure role-based access control for students and admins.", color: "emerald" }
  ];

  const getColorClasses = (color: string, isDark: boolean, type: 'bg' | 'text' | 'border' | 'fill') => {
    const maps: Record<string, Record<string, string>> = {
      blue: { bg: isDark ? 'bg-blue-500/20' : 'bg-blue-100', text: isDark ? 'text-blue-400' : 'text-blue-600', border: isDark ? 'border-blue-500/30' : 'border-blue-200', fill: isDark ? 'bg-blue-500/40' : 'bg-blue-200' },
      rose: { bg: isDark ? 'bg-rose-500/20' : 'bg-rose-100', text: isDark ? 'text-rose-400' : 'text-rose-600', border: isDark ? 'border-rose-500/30' : 'border-rose-200', fill: isDark ? 'bg-rose-500/40' : 'bg-rose-200' },
      emerald: { bg: isDark ? 'bg-emerald-500/20' : 'bg-emerald-100', text: isDark ? 'text-emerald-400' : 'text-emerald-600', border: isDark ? 'border-emerald-500/30' : 'border-emerald-200', fill: isDark ? 'bg-emerald-500/40' : 'bg-emerald-200' },
    };
    return maps[color][type];
  };

  return (
    <div className={`space-y-10 animate-fade-in pb-12 max-w-5xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 border-opacity-20 border-gray-500">
        <div>
          <h3 className="text-3xl font-extrabold tracking-tight mb-2">Web Applications</h3>
          <p className={`text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Scalable full-stack platforms, administrative dashboards, and responsive web architectures engineered for enterprise and academic environments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {webProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, ease: "easeOut" }}
            className={`group flex flex-col rounded-[2rem] border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDark ? 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:shadow-black/50' : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-gray-200/50'}`}
          >
            <div className={`h-48 relative p-4 flex flex-col justify-end overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-gray-200'}`}>
              <div className={`absolute -top-4 -right-4 w-32 h-32 rounded-full blur-3xl opacity-40 ${getColorClasses(project.color, isDark, 'bg')}`}></div>
              <div className={`relative z-10 w-full h-40 rounded-t-xl border-x border-t shadow-2xl flex flex-col overflow-hidden transition-transform duration-500 group-hover:translate-y-2 ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-300'}`}>
                <div className={`h-6 w-full flex items-center px-3 gap-1.5 border-b ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div className="flex flex-1 p-3 gap-3">
                  <div className={`w-1/4 h-full rounded-md opacity-50 ${getColorClasses(project.color, isDark, 'bg')}`}></div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className={`w-1/2 h-3 rounded-sm opacity-60 ${getColorClasses(project.color, isDark, 'fill')}`}></div>
                    <div className="flex gap-2 mt-1">
                      <div className={`flex-1 h-8 rounded-md opacity-40 ${getColorClasses(project.color, isDark, 'fill')}`}></div>
                      <div className={`flex-1 h-8 rounded-md opacity-40 ${getColorClasses(project.color, isDark, 'fill')}`}></div>
                      <div className={`flex-1 h-8 rounded-md opacity-40 ${getColorClasses(project.color, isDark, 'fill')}`}></div>
                    </div>
                    <div className={`w-full flex-1 rounded-md opacity-20 mt-1 ${getColorClasses(project.color, isDark, 'fill')}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 flex-1 flex flex-col ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${getColorClasses(project.color, isDark, 'bg')} ${getColorClasses(project.color, isDark, 'text')} ${getColorClasses(project.color, isDark, 'border')}`}>
                  {project.type}
                </span>
              </div>
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

const TechStackContent = ({ isDark }: { isDark: boolean }) => {
  const skillCategories = [
    { title: "Frontend & UI", icon: "🎨", color: "pink", skills: [{ name: "Next.js & React", level: 65 }, { name: "Tailwind CSS", level: 60 }, { name: "Framer Motion", level: 45 }] },
    { title: "Backend & Architecture", icon: "⚙️", color: "blue", skills: [{ name: "Laravel (PHP)", level: 70 }, { name: "Node.js & Express", level: 65 }, { name: "FastAPI (Python)", level: 50 }] },
    { title: "Database Systems", icon: "🗄️", color: "emerald", skills: [{ name: "MySQL (Relational)", level: 90 }, { name: "MongoDB (NoSQL)", level: 5 }, { name: "PostgreSQL", level: 30 }, { name: "Firebase", level: 25 }] },
    { title: "Environment & DevOps", icon: "🐧", color: "orange", skills: [{ name: "visual studio code", level: 60 }, { name: "Git & GitHub", level: 50 }, { name: "Terminal / Mobile CLI", level: 55 }] }
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 border-opacity-20 border-gray-500">
        <div>
          <h3 className="text-3xl font-extrabold tracking-tight mb-2">Technical Arsenal</h3>
          <p className={`text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            A comprehensive overview of my primary development tools, frameworks, and environments utilized for building scalable full-stack applications.
          </p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-200 text-gray-700'}`}>
          <span className="text-lg">⚡</span> Proficiency Matrix
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, ease: "easeOut" }}
            className={`p-6 sm:p-8 rounded-[2rem] border transition-all duration-300 hover:shadow-lg ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-slate-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border shadow-sm ${getColorClasses(category.color, isDark, 'bg')} ${getColorClasses(category.color, isDark, 'border')}`}>
                {category.icon}
              </div>
              <h4 className="text-xl font-bold">{category.title}</h4>
            </div>

            <div className="space-y-6">
              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className={isDark ? 'text-slate-200' : 'text-gray-700'}>{skill.name}</span>
                    <span className={getColorClasses(category.color, isDark, 'text')}>{skill.level}%</span>
                  </div>
                  <div className={`h-2.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-900/50' : 'bg-gray-100'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.3 + (index * 0.1) + (skillIdx * 0.1), duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full relative ${getColorClasses(category.color, isDark, 'bar')}`}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-[2px] rounded-full"></div>
                    </motion.div>
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
      <div className={`rounded-2xl p-6 sm:p-8 border shadow-sm transition-colors ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-300'}`}>
            {!imageError ? (
              <img
                src="/melkamu.jpg"
                alt="Melkamu Derso"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-xl">MD</div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className={`text-xs font-mono font-medium tracking-wide uppercase ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                Full-Stack & Mobile Developer
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Melkamu Derso</h2>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              Based in Bahir Dar, Ethiopia. Focused on building robust system architectures, scalable full-stack applications, and clean, high-performance interfaces.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-5 rounded-xl border space-y-2 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'}`}>
          <div className="text-base font-semibold flex items-center gap-2">
            <span className="text-blue-500">⚡</span> Tech Ecosystem
          </div>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Next.js, React, Laravel, Node.js, FastAPI, MongoDB, and MySQL architectures.
          </p>
        </div>
        <div className={`p-5 rounded-xl border space-y-2 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'}`}>
          <div className="text-base font-semibold flex items-center gap-2">
            <span className="text-orange-500">🐧</span> Operating System
          </div>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
             OS development environment on HP EliteBook 840 G6 with mobile Termux testing nodes.
          </p>
        </div>
        <div className={`p-5 rounded-xl border space-y-2 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'}`}>
          <div className="text-base font-semibold flex items-center gap-2">
            <span className="text-purple-500">🎓</span> Education
          </div>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Computer Science graduate from Bahir Dar Institute of Technology (BiT).
          </p>
        </div>
      </div>
    </div>
  );
};


// ─── NOTES APP ────────────────────────────────────────────────────────
const NotesContent = ({ isDark }: { isDark: boolean }) => {
  const [notes, setNotes] = React.useState<{ id: string; text: string; date: string }[]>([]);
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    const saved = localStorage.getItem('os_notes');
    if (saved) {
      try { setNotes(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveNotes = (newNotes: any[]) => {
    setNotes(newNotes);
    localStorage.setItem('os_notes', JSON.stringify(newNotes));
  };

  const addNote = () => {
    if (!input.trim()) return;
    const newNote = { id: Date.now().toString(), text: input, date: new Date().toLocaleDateString() };
    saveNotes([newNote, ...notes]);
    setInput('');
  };

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className={`space-y-6 animate-fade-in pb-12 max-w-2xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-extrabold tracking-tight">Notes</h3>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
          {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
        </span>
      </div>

      <div className={`p-4 rounded-3xl border shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a new note..."
          rows={3}
          className={`w-full bg-transparent outline-none resize-none text-base placeholder-opacity-50 ${isDark ? 'text-white placeholder-slate-500' : 'text-gray-900 placeholder-gray-400'}`}
        />
        <div className="flex justify-end mt-2">
          <button onClick={addNote} className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold rounded-xl transition-transform active:scale-95 shadow-sm">
            Save Note
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-5 rounded-2xl border flex justify-between items-start gap-4 shadow-sm group ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-100'}`}
            >
              <div className="flex-1">
                <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{note.text}</p>
                <span className={`text-[10px] font-bold uppercase tracking-widest mt-3 block ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{note.date}</span>
              </div>
              <button onClick={() => deleteNote(note.id)} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-red-500/20 text-slate-500 hover:text-red-400' : 'hover:bg-red-50 text-gray-400 hover:text-red-500'}`}>
                🗑️
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {notes.length === 0 && (
          <div className={`text-center py-12 text-sm font-medium ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
            No notes yet. Create one above!
          </div>
        )}
      </div>
    </div>
  );
};

// ─── CALCULATOR APP ───────────────────────────────────────────────────
const CalculatorContent = ({ isDark }: { isDark: boolean }) => {
  const [display, setDisplay] = React.useState('0');
  const [equation, setEquation] = React.useState('');
  const [isNewNumber, setIsNewNumber] = React.useState(true);

  const handleNum = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const calculate = () => {
    try {
      const fullEquation = equation + display;
      const result = Function('"use strict";return (' + fullEquation.replace(/×/g, '*').replace(/÷/g, '/') + ')')();
      setDisplay(String(Number(result.toFixed(6))));
      setEquation('');
      setIsNewNumber(true);
    } catch (e) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const buttons = [
    { label: 'AC', type: 'op', action: clear, color: 'bg-gray-300 text-gray-900' },
    { label: '±', type: 'op', action: () => setDisplay(String(Number(display) * -1)), color: 'bg-gray-300 text-gray-900' },
    { label: '%', type: 'op', action: () => setDisplay(String(Number(display) / 100)), color: 'bg-gray-300 text-gray-900' },
    { label: '÷', type: 'op', action: () => handleOp('÷'), color: 'bg-orange-400 text-white' },
    
    { label: '7', type: 'num', action: () => handleNum('7') },
    { label: '8', type: 'num', action: () => handleNum('8') },
    { label: '9', type: 'num', action: () => handleNum('9') },
    { label: '×', type: 'op', action: () => handleOp('×'), color: 'bg-orange-400 text-white' },
    
    { label: '4', type: 'num', action: () => handleNum('4') },
    { label: '5', type: 'num', action: () => handleNum('5') },
    { label: '6', type: 'num', action: () => handleNum('6') },
    { label: '-', type: 'op', action: () => handleOp('-'), color: 'bg-orange-400 text-white' },
    
    { label: '1', type: 'num', action: () => handleNum('1') },
    { label: '2', type: 'num', action: () => handleNum('2') },
    { label: '3', type: 'num', action: () => handleNum('3') },
    { label: '+', type: 'op', action: () => handleOp('+'), color: 'bg-orange-400 text-white' },
    
    { label: '0', type: 'num', action: () => handleNum('0'), span: 'col-span-2' },
    { label: '.', type: 'num', action: () => { if (!display.includes('.')) handleNum('.'); } },
    { label: '=', type: 'op', action: calculate, color: 'bg-orange-400 text-white' },
  ];

  return (
    <div className={`h-full flex flex-col animate-fade-in max-w-sm mx-auto pb-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex-1 flex flex-col justify-end items-end p-6 pt-12 pb-8 min-h-[200px]">
        <div className={`text-xl font-medium h-8 opacity-60 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{equation}</div>
        <div className="text-6xl sm:text-7xl font-light tracking-tighter truncate w-full text-right">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 p-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={`h-16 sm:h-20 rounded-full text-2xl font-medium flex items-center justify-center transition-transform active:scale-90 ${
              btn.type === 'num' 
                ? (isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300')
                : btn.color || 'bg-slate-500'
            } ${btn.span || ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── 2048 GAME ────────────────────────────────────────────────────────
const GameContent = ({ isDark }: { isDark: boolean }) => {
  const [board, setBoard] = React.useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  const getTileColor = (val: number) => {
    const colors: Record<number, string> = {
      0: isDark ? 'bg-slate-800/50' : 'bg-gray-200',
      2: 'bg-[#eee4da] text-[#776e65]',
      4: 'bg-[#ede0c8] text-[#776e65]',
      8: 'bg-[#f2b179] text-white',
      16: 'bg-[#f59563] text-white',
      32: 'bg-[#f67c5f] text-white',
      64: 'bg-[#f65e3b] text-white',
      128: 'bg-[#edcf72] text-white',
      256: 'bg-[#edcc61] text-white',
      512: 'bg-[#edc850] text-white',
      1024: 'bg-[#edc53f] text-white',
      2048: 'bg-[#edc22e] text-white',
    };
    return colors[val] || 'bg-[#edc22e] text-white';
  };

  const initGame = () => {
    let newBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    newBoard = addRandomTile(addRandomTile(newBoard));
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
  };

  React.useEffect(() => {
    if (board.flat().every(val => val === 0)) initGame();
  }, []);

  const addRandomTile = (currentBoard: number[][]) => {
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentBoard[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return currentBoard;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = currentBoard.map(row => [...row]);
    newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
  };

  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (gameOver) return;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      let newBoard = board.map(row => [...row]);
      let moved = false;
      let newScore = score;

      const slide = (row: number[]) => {
        let arr = row.filter(val => val);
        let missing = 4 - arr.length;
        let zeros = Array(missing).fill(0);
        return zeros.concat(arr);
      };

      const combine = (row: number[]) => {
        for (let i = 3; i > 0; i--) {
          if (row[i] === row[i - 1] && row[i] !== 0) {
            row[i] *= 2;
            row[i - 1] = 0;
            newScore += row[i];
            moved = true;
          }
        }
        return row;
      };

      const operate = (row: number[]) => {
        row = slide(row);
        row = combine(row);
        row = slide(row);
        return row;
      };

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        for (let r = 0; r < 4; r++) {
          let row = newBoard[r];
          if (e.key === 'ArrowRight') row.reverse();
          row = operate(row);
          if (e.key === 'ArrowRight') row.reverse();
          if (JSON.stringify(row) !== JSON.stringify(newBoard[r])) moved = true;
          newBoard[r] = row;
        }
      } else {
        for (let c = 0; c < 4; c++) {
          let col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
          if (e.key === 'ArrowDown') col.reverse();
          col = operate(col);
          if (e.key === 'ArrowDown') col.reverse();
          for (let r = 0; r < 4; r++) {
            if (newBoard[r][c] !== col[r]) moved = true;
            newBoard[r][c] = col[r];
          }
        }
      }

      if (moved) {
        newBoard = addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(newScore);
        checkGameOver(newBoard);
      }
    }
  }, [board, score, gameOver]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const checkGameOver = (b: number[][]) => {
    if (b.flat().includes(0)) return false;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (c < 3 && b[r][c] === b[r][c + 1]) return false;
        if (r < 3 && b[r][c] === b[r + 1][c]) return false;
      }
    }
    setGameOver(true);
  };

  const handleSwipe = (direction: 'up' | 'down' | 'left' | 'right') => {
    const keyMap = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' };
    handleKeyDown(new KeyboardEvent('keydown', { key: keyMap[direction] }));
  };

  return (
    <div className={`h-full flex flex-col items-center animate-fade-in max-w-sm mx-auto pt-6 pb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex justify-between items-end w-full mb-6 px-2">
        <div>
          <h3 className="text-3xl font-extrabold tracking-tight">2048</h3>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Join the numbers!</p>
        </div>
        <div className={`px-4 py-2 rounded-xl text-center shadow-sm ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-gray-100 border border-gray-200'}`}>
          <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Score</div>
          <div className="text-lg font-bold leading-none mt-1">{score}</div>
        </div>
      </div>

      <div className={`relative p-3 rounded-2xl shadow-xl w-full max-w-[320px] aspect-square ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-gray-300'}`}>
        <div className="grid grid-cols-4 grid-rows-4 gap-3 w-full h-full">
          {board.map((row, r) => (
            row.map((val, c) => (
              <div key={`${r}-${c}`} className={`rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold transition-all duration-100 ${getTileColor(val)}`}>
                {val !== 0 ? val : ''}
              </div>
            ))
          ))}
        </div>

        <AnimatePresence>
          {gameOver && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-10">
              <h4 className="text-3xl font-bold text-white mb-4">Game Over!</h4>
              <button onClick={initGame} className="px-6 py-3 bg-white text-black font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-transform">
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={() => handleSwipe('left')} className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800 text-white' : 'bg-white shadow'}`}>←</button>
        <div className="flex flex-col gap-4">
          <button onClick={() => handleSwipe('up')} className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800 text-white' : 'bg-white shadow'}`}>↑</button>
          <button onClick={() => handleSwipe('down')} className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800 text-white' : 'bg-white shadow'}`}>↓</button>
        </div>
        <button onClick={() => handleSwipe('right')} className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800 text-white' : 'bg-white shadow'}`}>→</button>
      </div>
    </div>
  );
};

// WidgetView
const WidgetView = ({ isDark }: { isDark: boolean }) => {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateNum = today.getDate();

  return (
    <div className="w-full h-full max-w-[430px] sm:max-w-2xl mx-auto px-6 pt-4 pb-20 overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-end mb-6 pl-2">
        <h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Widgets</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 auto-rows-max">
        <div className={`col-span-2 p-5 rounded-[2rem] shadow-sm border flex items-center justify-between ${isDark ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-gray-200 backdrop-blur-xl'}`}>
           <div>
             <p className="text-red-500 font-bold text-sm uppercase tracking-widest">{dayName}</p>
             <h3 className={`text-6xl font-light mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{dateNum}</h3>
           </div>
           <div className="text-6xl opacity-80">📅</div>
        </div>

        <div className={`col-span-1 p-5 rounded-[2rem] shadow-sm border flex flex-col justify-between aspect-square ${isDark ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-gray-200 backdrop-blur-xl'}`}>
           <div className="flex items-center gap-2">
             <span className="text-green-500 text-2xl">⚡</span>
             <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Battery</span>
           </div>
           <div className="text-center mt-auto">
             <span className={`text-5xl font-light tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>100%</span>
           </div>
        </div>

        <div className={`col-span-1 p-5 rounded-[2rem] shadow-sm border flex flex-col justify-between aspect-square ${isDark ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-gray-200 backdrop-blur-xl'}`}>
           <div className="flex items-center gap-2">
             <span className="text-blue-500 text-2xl">💾</span>
             <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Storage</span>
           </div>
           <div className="w-full h-4 bg-gray-500/20 rounded-full mt-auto overflow-hidden">
              <div className="w-2/3 h-full bg-blue-500 rounded-full"></div>
           </div>
           <p className={`text-xs mt-3 font-semibold text-center ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>66% Used</p>
        </div>

        <div className={`col-span-2 p-5 rounded-[2rem] shadow-sm border flex flex-col gap-3 ${isDark ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-gray-200 backdrop-blur-xl'}`}>
           <div className="flex items-center gap-2 mb-2">
             <span className="text-purple-500 text-xl">⏳</span>
             <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Screen Time</span>
           </div>
           <div className="flex items-end gap-2">
             <h3 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>4<span className="text-xl font-medium">h</span> 12<span className="text-xl font-medium">m</span></h3>
           </div>
           <div className="flex gap-1 h-3 w-full rounded-full overflow-hidden mt-1">
             <div className="h-full bg-purple-500 w-1/2"></div>
             <div className="h-full bg-blue-500 w-1/4"></div>
             <div className="h-full bg-yellow-500 w-1/4"></div>
           </div>
        </div>

      </div>
    </div>
  );
};

// LockScreen Component
const LockScreen = ({ isDark, onUnlock }: { isDark: boolean; onUnlock: () => void }) => {
  const [time, setTime] = React.useState('');
  const [date, setDate] = React.useState('');
  const [dragY, setDragY] = React.useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = React.useState(false);

  React.useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.y < -80 || info.velocity.y < -500) {
      setIsAnimatingOut(true);
      setTimeout(onUnlock, 350);
    }
    setDragY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isAnimatingOut ? 0 : 1 }}
      transition={{ duration: isAnimatingOut ? 0.35 : 0.4 }}
      className={`absolute inset-0 z-[200] flex flex-col ${isDark ? 'bg-gradient-to-b from-black via-slate-900 to-black text-white' : 'bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 text-white'}`}
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragEnd={handleDragEnd}
        onDrag={(_, info) => setDragY(info.offset.y)}
        animate={{ y: isAnimatingOut ? -800 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex-1 flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-20 mb-3 text-3xl opacity-80"
        >
          🔒
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-[88px] font-thin tracking-tighter leading-none"
        >
          {time}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg font-light opacity-80 mt-2"
        >
          {date}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex gap-3 px-6"
        >
          <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center min-w-[110px]">
            <div className="text-[10px] uppercase tracking-wider opacity-70 font-semibold">Bahir Dar</div>
            <div className="text-2xl mt-1">⛅ 22°</div>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center min-w-[110px]">
            <div className="text-[10px] uppercase tracking-wider opacity-70 font-semibold">Portfolio</div>
            <div className="text-2xl mt-1">🦁 OS</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: dragY < -30 ? 0 : [0.4, 1, 0.4] }}
          transition={{ delay: 0.7, duration: 2, repeat: Infinity }}
          className="absolute bottom-16 flex flex-col items-center gap-2"
        >
          <div className="text-sm font-light opacity-70">Swipe up to unlock</div>
          <div className="text-2xl opacity-80">↑</div>
        </motion.div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-white/40" />
      </motion.div>
    </motion.div>
  );
};

// Dock Component
const Dock = ({
  isDark,
  onOpenApp,
  apps,
}: {
  isDark: boolean;
  onOpenApp: (app: AppItem) => void;
  apps: AppItem[];
}) => {
  const dockAppIds = ['about', 'projects', 'contact', 'terminal'];
  const dockApps = dockAppIds
    .map(id => apps.find(a => a.id === id))
    .filter(Boolean) as AppItem[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
      className="flex justify-center items-end pb-3 pt-1 z-30 relative pointer-events-none"
    >
      <div
        className={`pointer-events-auto flex items-end gap-3 px-4 py-2.5 rounded-[2rem] shadow-2xl border backdrop-blur-2xl ${
          isDark
            ? 'bg-slate-800/50 border-white/10'
            : 'bg-white/60 border-white/60'
        }`}
      >
        {dockApps.map((app, i) => (
          <motion.button
            key={app.id}
            onClick={() => onOpenApp(app)}
            whileHover={{ y: -10, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="relative flex items-center justify-center"
            title={app.name}
          >
            <span className="text-[40px] sm:text-[44px] leading-none drop-shadow-lg">
              {app.icon}
            </span>
            {i < dockApps.length - 1 && (
              <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-px h-6 bg-white/10" />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Notification Component
type Toast = { id: number; title: string; message: string; icon: string };

const NotificationStack = ({ toasts, isDark, onDismiss }: { toasts: Toast[]; isDark: boolean; onDismiss: (id: number) => void }) => {
  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onClick={() => onDismiss(toast.id)}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border cursor-pointer backdrop-blur-2xl ${
              isDark
                ? 'bg-slate-800/90 border-white/10 text-white'
                : 'bg-white/95 border-gray-200 text-gray-900'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
              {toast.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate">{toast.title}</div>
              <div className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{toast.message}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// 1. Top Status Bar Component
const TopBar = ({ isDark, onOpenSettings }: { isDark: boolean; onOpenSettings: () => void }) => {
  const [time, setTime] = React.useState<string>('');
  const [batteryLevel, setBatteryLevel] = React.useState<number>(100);
  const [isOnline, setIsOnline] = React.useState<boolean>(true);

  React.useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    updateTime();
    const interval = setInterval(updateTime, 10000);
    setIsOnline(navigator.onLine);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full h-8 px-4 flex items-center justify-between text-[11px] sm:text-xs font-semibold tracking-wide z-50 relative backdrop-blur-md border-b transition-colors duration-500 ${
      isDark ? 'bg-slate-900/50 text-slate-200 border-slate-800/50' : 'bg-white/70 text-gray-800 border-gray-200/70'
    }`}>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 cursor-default">
          
        
        </span>
      </div>

      {/* THIS IS THE BUTTON TO OPEN THE CONTROL CENTER */}
      <button
        onClick={onOpenSettings}
        className={`flex items-center gap-3 px-2 py-0.5 rounded-md transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
        title="Open Control Center"
      >
        <div className={`transition-opacity duration-300 ${isOnline ? 'opacity-100' : 'opacity-20 text-red-500'}`}>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] opacity-80">{batteryLevel}%</span>
          <div className="flex items-center gap-0.5">
            <div className="w-5 h-2.5 border-current border rounded-sm p-[1px] flex relative overflow-hidden">
              <div className="h-full rounded-[1px] bg-current" style={{ width: `${batteryLevel}%` }}></div>
            </div>
            <div className="w-0.5 h-1 bg-current rounded-r-sm opacity-50"></div>
          </div>
        </div>

        <span className="min-w-[60px] text-right">{time}</span>
      </button>
    </div>
  );
};

// 2. Control Center Component
const ControlCenter = ({ isOpen, onClose, isDark, toggleDarkMode, brightness, setBrightness, volume, setVolume, trashCount, onOpenTrash }: {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  toggleDarkMode: () => void;
  brightness: number;
  setBrightness: (v: number) => void;
  volume: number;
  setVolume: (v: number) => void;
  trashCount: number;
  onOpenTrash: () => void;
}) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol / 100;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.2 }}
            className={`absolute top-10 right-4 w-[320px] rounded-[2.5rem] p-4 z-[101] shadow-2xl backdrop-blur-3xl border ${
              isDark ? 'bg-slate-600/40 border-slate-500/30' : 'bg-white/60 border-white/70'
            }`}
          >
            <div className="flex flex-col gap-4">

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-3xl flex flex-col gap-4 ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" /></svg>
                    </div>
                    <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18v-5l3-3-3-3v5l-3 3 3 3z" /></svg>
                    </div>
                    <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Bluetooth</span>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-4">
                  <button onClick={toggleDarkMode} className={`rounded-3xl flex items-center justify-center transition-transform active:scale-95 ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-indigo-500 text-white' : 'bg-yellow-400 text-white'}`}>
                      {isDark ? '🌙' : '☀️'}
                    </div>
                  </button>

                  <a href="https://github.com/melaku-git" target="_blank" rel="noreferrer" className={`rounded-3xl flex items-center justify-center transition-transform active:scale-95 ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                     <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                     </div>
                  </a>
                </div>
              </div>

              <div className={`h-14 rounded-full flex items-center px-4 backdrop-blur-md ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                <span className="text-xl mr-3 opacity-80">☀️</span>
                <input
                  type="range" min="20" max="100" value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-2 bg-gray-400/30 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              <div className={`h-14 rounded-full flex items-center px-4 backdrop-blur-md ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}>
                <span className="text-xl mr-3 opacity-80">🔊</span>
                <input
                  type="range" min="0" max="100" value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-400/30 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); onOpenTrash(); onClose(); }}
                className={`p-4 rounded-3xl flex items-center justify-between w-full transition-transform active:scale-95 ${isDark ? 'bg-slate-800/60' : 'bg-white/80 shadow-sm'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🗑️</span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Open Trash Bin</span>
                </div>
                <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {trashCount}
                </span>
              </button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


// --- MAIN OS ENGINE ---
export default function Home() {
  const [brightness, setBrightness] = React.useState(100);
  const [volume, setVolume] = React.useState(50);

  const [isLocked, setIsLocked] = React.useState(true);
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const [openFolderId, setOpenFolderId] = React.useState<string | null>(null);

  // App Switcher State
  const [recentApps, setRecentApps] = React.useState<AppItem[]>([]);
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = React.useState(false);

  const [osSettings, setOsSettings] = React.useState<OSSettings>({
    darkMode: true,
    animations: true,
    wifi: true,
    bluetooth: false,
    devMode: false,
    wallpaper: 'default',
    notifications: true,
    dock: true,
  });

  const notify = (title: string, message: string, icon: string) => {
    if (!osSettings.notifications) return;
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, icon }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  const APPS_PER_PAGE = 12;

  const [desktopApps, setDesktopApps] = React.useState<AppItem[]>([...apps]);
  const [trashApps, setTrashApps] = React.useState<AppItem[]>([]);

  const [activeApp, setActiveApp] = React.useState<AppItem | null>(null);
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isTrashOpen, setIsTrashOpen] = React.useState(false);
  const [isJiggleMode, setIsJiggleMode] = React.useState(false);

  const [isSelectMode, setIsSelectMode] = React.useState(false);
  const [selectedAppIds, setSelectedAppIds] = React.useState<Set<string>>(new Set());

  const [isWidgetPromptOpen, setIsWidgetPromptOpen] = React.useState(false);
  const emptySpaceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDark = osSettings.darkMode;
  const animDuration = osSettings.animations ? 0.3 : 0;

  const currentWallpaper = WALLPAPERS[osSettings.wallpaper] || WALLPAPERS.default;
  const wallpaper = isDark ? currentWallpaper.dark : currentWallpaper.light;

  const totalPages = Math.ceil(desktopApps.length / APPS_PER_PAGE) + 1;
  const parallaxX = (currentPage - totalPages / 2) * -12;

  const handleEmptySpaceDown = () => {
    if (emptySpaceTimerRef.current) clearTimeout(emptySpaceTimerRef.current);
    emptySpaceTimerRef.current = setTimeout(() => {
      setIsWidgetPromptOpen(true);
    }, 700);
  };

  const handleEmptySpaceUp = () => {
    if (emptySpaceTimerRef.current) {
      clearTimeout(emptySpaceTimerRef.current);
      emptySpaceTimerRef.current = null;
    }
  };

  const toggleSelectApp = (appId: string) => {
    setSelectedAppIds(prev => {
      const next = new Set(prev);
      if (next.has(appId)) next.delete(appId);
      else next.add(appId);
      return next;
    });
  };

  const enterSelectMode = (appId: string) => {
    setIsSelectMode(true);
    setSelectedAppIds(new Set([appId]));
    setActiveMenuId(null);
  };

  const exitSelectMode = () => {
    setIsSelectMode(false);
    setSelectedAppIds(new Set());
  };

  const trashSelected = () => {
    const ids = Array.from(selectedAppIds);
    const toTrash = desktopApps.filter(a => ids.includes(a.id));
    if (toTrash.length === 0) return;
    setTrashApps(prev => [...prev, ...toTrash]);
    setDesktopApps(prev => prev.filter(a => !ids.includes(a.id)));
    notify('Moved to Trash', `${toTrash.length} app${toTrash.length > 1 ? 's' : ''} moved`, '🗑️');
    exitSelectMode();
  };

  const uninstallSelected = () => {
    const ids = Array.from(selectedAppIds);
    const count = ids.length;
    if (count === 0) return;
    setDesktopApps(prev => prev.filter(a => !ids.includes(a.id)));
    notify('Uninstalled', `${count} app${count > 1 ? 's' : ''} uninstalled`, '🗑️');
    exitSelectMode();
  };

  const openApp = (app: AppItem) => {
    setActiveApp(app);
    setActiveMenuId(null);
    setOpenFolderId(null);
    if (!app.isFolder) {
      setRecentApps(prev => {
        const filtered = prev.filter(a => a.id !== app.id);
        return [app, ...filtered].slice(0, 5);
      });
    }
  };

  const uninstallApp = (appId: string) => {
    const app = desktopApps.find(a => a.id === appId);
    setDesktopApps(prev => prev.filter(a => a.id !== appId));
    setActiveMenuId(null);
    if (app) notify('App Uninstalled', `${app.name} has been removed`, '🗑️');
  };

  const moveToTrash = (appId: string) => {
    const appToTrash = desktopApps.find(a => a.id === appId);
    if (appToTrash) {
      setTrashApps(prev => [...prev, appToTrash]);
      setDesktopApps(prev => prev.filter(a => a.id !== appId));
      setActiveMenuId(null);
      notify('Moved to Trash', appToTrash.name, '🗑️');
    }
  };

  const restoreSingleApp = (appId: string) => {
    const appToRestore = trashApps.find(a => a.id === appId);
    if (appToRestore) {
      setDesktopApps(prev => [...prev, appToRestore]);
      setTrashApps(prev => prev.filter(a => a.id !== appId));
      notify('Restored', `${appToRestore.name} is back on the desktop`, '♻️');
    }
  };

  const createNewWidget = (widgetType: 'calendar' | 'battery' | 'storage' | 'screentime') => {
    const widgetInfo: Record<string, { name: string; icon: string; color: string }> = {
      calendar: { name: 'Calendar Widget', icon: '📅', color: 'bg-white' },
      battery: { name: 'Battery Widget', icon: '🔋', color: 'bg-white' },
      storage: { name: 'Storage Widget', icon: '💾', color: 'bg-white' },
      screentime: { name: 'Screen Time', icon: '⏳', color: 'bg-white' },
    };
    const info = widgetInfo[widgetType];
    const newWidget: AppItem = {
      id: `widget-${Date.now()}`,
      name: info.name,
      icon: info.icon,
      color: info.color,
      isWidget: true,
    };
    setDesktopApps(prev => [newWidget, ...prev]);
    setCurrentPage(1);
    setIsWidgetPromptOpen(false);
    notify('Widget Created', `${info.name} added to home screen`, '✨');
  };

  const createFolderFromSelect = () => {
    if (selectedAppIds.size < 2) return;
    const ids = Array.from(selectedAppIds);
    const selectedApps = desktopApps.filter(a => ids.includes(a.id));
    
    const newFolder: AppItem = {
      id: `folder-${Date.now()}`,
      name: 'Folder',
      icon: '📁',
      color: 'bg-gray-400',
      isFolder: true,
      folderApps: selectedApps
    };

    setDesktopApps(prev => {
      const filtered = prev.filter(a => !ids.includes(a.id));
      return [newFolder, ...filtered];
    });
    notify('Folder Created', 'Apps grouped successfully', '📁');
    setIsSelectMode(false);
    setSelectedAppIds(new Set());
  };

  if (isLocked) {
    return (
      <div className="min-h-screen flex flex-col relative font-sans overflow-hidden">
        <LockScreen isDark={isDark} onUnlock={() => setIsLocked(false)} />
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen flex flex-col relative font-sans overflow-hidden transition-colors duration-500 ${wallpaper}`}>

      <motion.div
        aria-hidden
        animate={{ x: parallaxX, scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 30% 20%, rgba(120,120,200,0.15), transparent 50%), radial-gradient(circle at 70% 80%, rgba(200,120,200,0.12), transparent 50%)'
            : 'radial-gradient(circle at 30% 20%, rgba(120,120,200,0.18), transparent 50%), radial-gradient(circle at 70% 80%, rgba(200,120,200,0.15), transparent 50%)',
        }}
      />

      <div className="absolute inset-0 z-[999] pointer-events-none bg-black transition-opacity duration-200" style={{ opacity: 1 - brightness / 100 }} />

      <NotificationStack toasts={toasts} isDark={isDark} onDismiss={dismissToast} />

      <TopBar isDark={isDark} onOpenSettings={() => setIsControlCenterOpen(true)} />

      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        isDark={isDark}
        toggleDarkMode={() => setOsSettings(p => ({...p, darkMode: !p.darkMode}))}
        brightness={brightness} setBrightness={setBrightness}
        volume={volume} setVolume={setVolume}
        trashCount={trashApps.length}
        onOpenTrash={() => setIsTrashOpen(true)}
      />

      <AnimatePresence>
        {isTrashOpen && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(8px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className="absolute inset-0 z-[105] flex items-center justify-center p-4 bg-black/40" onClick={() => setIsTrashOpen(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className={`w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border flex flex-col max-h-[70vh] ${isDark ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-gray-200'}`}>
              <div className={`px-6 py-4 border-b flex justify-between items-center ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}><span>🗑️</span> Trash Bin</h3>
                <button onClick={() => setIsTrashOpen(false)} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>✕</button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                {trashApps.length === 0 ? (
                  <div className={`text-center py-8 text-sm opacity-50 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Trash is empty</div>
                ) : (
                  <div className="space-y-3">
                    {trashApps.map(app => (
                      <div key={app.id} className={`flex items-center justify-between p-3 rounded-2xl border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-700 hover:border-slate-600' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${app.isWidget ? 'bg-white text-black' : app.color}`}>{app.icon}</div>
                          <div>
                            <span className={`font-bold text-sm block ${isDark ? 'text-white' : 'text-gray-900'}`}>{app.name}</span>
                            <span className={`text-[10px] opacity-60 font-mono uppercase tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>{app.isWidget ? 'Widget' : 'App'}</span>
                          </div>
                        </div>
                        <button onClick={() => restoreSingleApp(app.id)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-transform active:scale-95 shadow-sm">Restore</button>
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
           <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(8px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className="absolute inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/40" onClick={() => setIsSearchOpen(false)}>
             <motion.div initial={{ scale: 0.95, y: -20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: -10, opacity: 0 }} onClick={(e) => e.stopPropagation()} className={`w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border ${isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white/95 border-gray-200'}`}>
               <div className={`flex items-center px-4 py-3 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                 <span className="text-2xl mr-3 opacity-50">🔍</span>
                 <input autoFocus type="text" placeholder="Search apps, projects, or skills..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-lg placeholder-opacity-50 text-current" />
                 <button onClick={() => setIsSearchOpen(false)} className={`text-xs px-2 py-1 rounded transition ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>ESC</button>
               </div>
               <div className="max-h-[60vh] overflow-y-auto p-2">
                 {desktopApps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase())).map((app) => (
                   <button key={app.id} onClick={() => { openApp(app); setIsSearchOpen(false); setSearchQuery(''); }} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-700/50 text-white' : 'hover:bg-gray-100 text-gray-900'}`}>
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm ${app.color}`}>{app.icon}</div>
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
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(8px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className="absolute inset-0 z-[110] flex items-center justify-center p-4 bg-black/50" onClick={() => setIsWidgetPromptOpen(false)}>
             <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className={`w-full max-w-md rounded-3xl shadow-2xl border p-6 ${isDark ? 'bg-slate-800/95 border-slate-700 text-white' : 'bg-white/95 border-gray-200 text-gray-900'}`}>
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-2xl shadow-md">✨</div>
                 <div><h3 className="text-lg font-bold">Create New Widget</h3><p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Choose a widget to add to your home screen</p></div>
               </div>
               <div className="grid grid-cols-2 gap-3 mb-4">
                 <button onClick={() => createNewWidget('calendar')} className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] active:scale-95 ${isDark ? 'bg-slate-700/50 border-slate-600 hover:border-slate-500' : 'bg-gray-50 border-gray-200 hover:border-blue-300'}`}><div className="text-3xl mb-2">📅</div><div className="text-sm font-bold">Calendar</div></button>
                 <button onClick={() => createNewWidget('battery')} className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] active:scale-95 ${isDark ? 'bg-slate-700/50 border-slate-600 hover:border-slate-500' : 'bg-gray-50 border-gray-200 hover:border-blue-300'}`}><div className="text-3xl mb-2">🔋</div><div className="text-sm font-bold">Battery</div></button>
                 <button onClick={() => createNewWidget('storage')} className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] active:scale-95 ${isDark ? 'bg-slate-700/50 border-slate-600 hover:border-slate-500' : 'bg-gray-50 border-gray-200 hover:border-blue-300'}`}><div className="text-3xl mb-2">💾</div><div className="text-sm font-bold">Storage</div></button>
                 <button onClick={() => createNewWidget('screentime')} className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] active:scale-95 ${isDark ? 'bg-slate-700/50 border-slate-600 hover:border-slate-500' : 'bg-gray-50 border-gray-200 hover:border-blue-300'}`}><div className="text-3xl mb-2">⏳</div><div className="text-sm font-bold">Screen Time</div></button>
               </div>
               <button onClick={() => setIsWidgetPromptOpen(false)} className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>Cancel</button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!activeApp ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: animDuration }}
            className="flex-1 flex flex-col z-10 h-full relative overflow-hidden"
            onClick={() => activeMenuId && setActiveMenuId(null)}
          >
            {isSelectMode && (
              <motion.div
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className={`mx-4 mt-2 mb-2 px-4 py-2.5 rounded-2xl flex items-center justify-between gap-3 shadow-lg border backdrop-blur-xl shrink-0 ${isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-white/80 border-gray-200 text-gray-900'}`}
              >
                <button onClick={exitSelectMode} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>Cancel</button>
                <span className="text-sm font-bold">{selectedAppIds.size} selected</span>
                <div className="flex gap-2">
                  {selectedAppIds.size >= 2 && (
                    <button onClick={createFolderFromSelect} className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600">📁 Folder</button>
                  )}
                  <button onClick={trashSelected} disabled={selectedAppIds.size === 0} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${selectedAppIds.size === 0 ? 'opacity-40' : isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>🗑️ Trash</button>
                  <button onClick={uninstallSelected} disabled={selectedAppIds.size === 0} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${selectedAppIds.size === 0 ? 'opacity-40' : 'bg-red-500 text-white'}`}>Uninstall</button>
                </div>
              </motion.div>
            )}

            {!isSelectMode && (
              <div className="flex justify-center z-10 w-full px-4 py-2 shrink-0">
                <button onClick={() => setIsSearchOpen(true)} className={`group flex items-center gap-2 w-full max-w-[280px] sm:max-w-xs px-4 py-2 rounded-full backdrop-blur-md border shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 ${isDark ? 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:bg-slate-700/60' : 'bg-white/80 border-gray-300/60 text-gray-600 hover:bg-white shadow-md'}`}>
                  <svg className="w-4 h-4 opacity-80 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <span className="text-sm font-medium tracking-wide flex-1 text-center pr-6 group-hover:text-current">Search</span>
                </button>
              </div>
            )}

            {/* 🚀 THE ULTIMATE CSS SCROLL SNAP FIX 🚀 */}
            <div 
              id="scroll-snap-container"
              className="flex-1 w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4"
              onScroll={(e) => {
                const target = e.target as HTMLDivElement;
                const pageWidth = target.clientWidth;
                const newPage = Math.round(target.scrollLeft / pageWidth);
                if (newPage !== currentPage) setCurrentPage(newPage);
              }}
            >
              {/* Widget Page */}
              <div className="w-full flex-shrink-0 snap-center overflow-y-auto">
                <WidgetView isDark={isDark} />
              </div>

              {/* App Pages */}
              {Array.from({ length: totalPages - 1 }).map((_, pageIndex) => {
                const chunkIndex = pageIndex + 1;
                const chunkApps = desktopApps.slice(pageIndex * APPS_PER_PAGE, (pageIndex + 1) * APPS_PER_PAGE);
                return (
                  <div key={chunkIndex} className="w-full flex-shrink-0 snap-center overflow-y-auto">
                    <div className="w-full max-w-[430px] sm:max-w-5xl mx-auto mt-2 px-6 sm:px-10 pb-10">
                      <Reorder.Group as="div" axis="x" values={chunkApps} onReorder={(newChunk: AppItem[]) => {
                          if (isSelectMode) return;
                          const newApps = [...desktopApps];
                          newApps.splice(pageIndex * APPS_PER_PAGE, newChunk.length, ...newChunk);
                          setDesktopApps(newApps);
                        }} className="flex flex-wrap content-start justify-center gap-6 sm:gap-10 w-full max-w-4xl mx-auto">
                        {chunkApps.map((app) => {
                          const isSelected = selectedAppIds.has(app.id);
                          return (
                          <Reorder.Item as="div" key={app.id} value={app} dragListener={!activeMenuId && !isSelectMode} style={{ touchAction: "none" }} className="relative outline-none shrink-0 w-[68px] sm:w-[84px] h-[90px] sm:h-[110px]">
                            <motion.div onContextMenu={(e) => { e.preventDefault(); setActiveMenuId(app.id); }} onTouchStart={() => { window.longPressTimer = setTimeout(() => setActiveMenuId(app.id), 600); }} onTouchEnd={() => { if (window.longPressTimer) clearTimeout(window.longPressTimer); }} onTouchMove={() => { if (window.longPressTimer) clearTimeout(window.longPressTimer); }} className="w-full h-full flex flex-col items-center group cursor-grab active:cursor-grabbing">
                              
                              <AnimatePresence>
                                {activeMenuId === app.id && !isSelectMode && (
                                  <motion.div initial={{ opacity: 0, scale: 0.85, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.85, y: 8 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className={`absolute top-[75%] left-1/2 -translate-x-1/2 z-[999] w-44 rounded-2xl shadow-2xl flex flex-col overflow-hidden border backdrop-blur-2xl ${isDark ? 'bg-slate-800/95 border-slate-600' : 'bg-white/95 border-gray-200'}`} onPointerDown={(e) => e.stopPropagation()}>
                                    <button onClick={(e) => { e.stopPropagation(); openApp(app); }} className={`px-4 py-2.5 text-sm font-semibold text-left flex items-center gap-3 border-b transition-colors ${isDark ? 'border-slate-700 hover:bg-blue-500/20 text-white' : 'border-gray-100 hover:bg-blue-50 text-gray-800'}`}><span className="text-base">📂</span> Open</button>
                                    <button onClick={(e) => { e.stopPropagation(); moveToTrash(app.id); }} className={`px-4 py-2.5 text-sm font-semibold text-left flex items-center gap-3 border-b transition-colors ${isDark ? 'border-slate-700 hover:bg-orange-500/20 text-orange-400' : 'border-gray-100 hover:bg-orange-50 text-orange-600'}`}><span className="text-base">🗑️</span> Delete</button>
                                    <button onClick={(e) => { e.stopPropagation(); enterSelectMode(app.id); }} className={`px-4 py-2.5 text-sm font-semibold text-left flex items-center gap-3 border-b transition-colors ${isDark ? 'border-slate-700 hover:bg-sky-500/20 text-sky-400' : 'border-gray-100 hover:bg-sky-50 text-sky-600'}`}><span className="text-base">☑️</span> Select</button>
                                    <button onClick={(e) => { e.stopPropagation(); uninstallApp(app.id); }} className={`px-4 py-2.5 text-sm font-semibold text-left flex items-center gap-3 transition-colors ${isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-600'}`}><span className="text-base">❌</span> Uninstall</button>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <motion.button onClick={() => { if (isSelectMode) toggleSelectApp(app.id); else if (app.isFolder) setOpenFolderId(app.id); else if (!activeMenuId) openApp(app); }} whileTap={{ scale: 0.9 }} whileHover={{ scale: isSelectMode ? 0.95 : 1.08 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="relative flex items-center justify-center w-full pointer-events-auto h-[68px] sm:h-[84px]">
                                {app.isFolder && app.folderApps ? (
                                  <div className={`w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-[1.2rem] p-2 grid grid-cols-2 gap-1 shadow-sm ${isDark ? 'bg-slate-700/80 border border-slate-600' : 'bg-gray-200/80 border border-gray-300'}`}>
                                    {app.folderApps.slice(0, 4).map((fa, i) => <div key={i} className="flex items-center justify-center text-xl sm:text-2xl leading-none">{fa.icon}</div>)}
                                  </div>
                                ) : (
                                  <span className="text-[48px] sm:text-[64px] drop-shadow-sm transition-transform leading-none">{app.icon}</span>
                                )}
                                <AnimatePresence>
                                  {isSelectMode && (
                                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-md ${isSelected ? 'bg-blue-500 border-white' : isDark ? 'bg-slate-700/80 border-slate-500' : 'bg-white/80 border-gray-300'}`}>
                                      {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.button>
                              <span className={`text-[11px] mt-1.5 leading-tight font-medium tracking-wide w-full text-center overflow-hidden text-ellipsis whitespace-nowrap pointer-events-none ${isDark ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]' : 'text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]'}`}>{app.name}</span>
                            </motion.div>
                          </Reorder.Item>
                        )})}
                      </Reorder.Group>
                      {!isSelectMode && <div className="w-full h-24" onPointerDown={handleEmptySpaceDown} onPointerUp={handleEmptySpaceUp} onPointerLeave={handleEmptySpaceUp} onContextMenu={(e) => { e.preventDefault(); setIsWidgetPromptOpen(true); }} />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="shrink-0 flex flex-col items-center w-full z-20 pb-4 pt-2">
              {osSettings.dock && !isSelectMode && <Dock isDark={isDark} onOpenApp={openApp} apps={desktopApps} />}
              <div className="flex justify-center items-center gap-2.5 mt-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button key={idx} onClick={() => {
                    const container = document.getElementById('scroll-snap-container');
                    if (container) {
                      container.scrollTo({ left: idx * container.clientWidth, behavior: 'smooth' });
                    }
                  }} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === idx ? (isDark ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-gray-900 shadow-[0_0_8px_rgba(0,0,0,0.5)]') : (isDark ? 'bg-white/30 hover:bg-white/50' : 'bg-gray-900/30 hover:bg-gray-900/50')}`} />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`app-container-${activeApp.id}`}
            initial={{ opacity: 0, scale: 0.3, borderRadius: 60 }}
            animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
            exit={{ opacity: 0, scale: 0.3, borderRadius: 60 }}
            transition={{ duration: animDuration + 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 z-50 flex flex-col bg-slate-900 origin-center"
          >
            <div className="pt-12 pb-4 px-6 flex items-center text-white bg-black/40 backdrop-blur-xl border-b border-white/10 shrink-0">
              <button onClick={() => setActiveApp(null)} className="text-white hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors text-sm font-medium">← Back</button>
              <motion.h2 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: animDuration * 0.5 }} className="ml-4 text-xl font-bold flex items-center gap-2">
                <span>{activeApp.icon}</span> {activeApp.name}
              </motion.h2>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: animDuration * 0.4, duration: animDuration }} className={`flex-1 overflow-y-auto pb-24 ${activeApp.id === 'terminal' ? 'p-2 bg-[#1e1e1e]' : (isDark ? 'bg-slate-900 p-6' : 'bg-gray-50 p-6')}`}>
               {activeApp.id === 'notes' ? <NotesContent isDark={isDark} /> :
                activeApp.id === 'calculator' ? <CalculatorContent isDark={isDark} /> :
                activeApp.id === 'game' ? <GameContent isDark={isDark} /> :
                activeApp.id === 'uiux' ? <UIUXContent /> :
                activeApp.id === 'experience' ? <ExperienceContent /> :
                activeApp.id === 'terminal' ? <TerminalContent /> :
                activeApp.id === 'github' ? <GitHubContent /> :
                activeApp.id === 'news' ? <TechNewsContent /> :
                activeApp.id === 'settings' ? <SettingsContent settings={osSettings} setSettings={setOsSettings} notify={notify} /> :
                activeApp.id === 'browser' ? <BrowserContent isDark={isDark} /> :
                activeApp.id === 'contact' ? <ContactContent isDark={isDark} /> :
                activeApp.id === 'architecture' ? <ArchitectureContent isDark={isDark} /> :
                activeApp.id === 'coursework' ? <CourseworkContent isDark={isDark} /> :
                activeApp.id === 'education' ? <EducationContent isDark={isDark} /> :
                activeApp.id === 'mobile' ? <MobileAppsContent isDark={isDark} /> :
                activeApp.id === 'projects' ? <WebAppsContent isDark={isDark} /> :
                activeApp.id === 'skills' ? <TechStackContent isDark={isDark} /> :
                activeApp.id === 'about' ? <AboutMeContent isDark={isDark} /> :
                activeApp.id === 'resume' ? <ResumeContent isDark={isDark} /> : null }
            </motion.div>

            {/* iOS-STYLE BOTTOM NAVIGATION BAR */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-5 py-2.5 rounded-3xl backdrop-blur-2xl bg-slate-800/80 border border-slate-600/50 shadow-2xl z-[60]">
              <button onClick={() => setActiveApp(null)} className="text-white hover:text-blue-400 transition-colors text-xl font-bold px-3 py-1 active:scale-90">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => setActiveApp(null)} className="text-white hover:text-red-400 transition-colors text-xl font-bold px-3 py-1 active:scale-90">
                <div className="w-5 h-5 rounded-full border-2 border-current" />
              </button>
              <button onClick={() => setIsAppSwitcherOpen(true)} className="text-white hover:text-green-400 transition-colors text-xl font-bold px-3 py-1 active:scale-90">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* APP SWITCHER (STACK VIEW) */}
      <AnimatePresence>
        {isAppSwitcherOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 z-[120] flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xl p-4"
            onClick={() => setIsAppSwitcherOpen(false)}
          >
            <h2 className="text-white text-xl font-bold mb-6 drop-shadow-md">App Switcher</h2>
            <div className="flex gap-4 overflow-x-auto w-full max-w-4xl px-4 pb-10 no-scrollbar snap-x snap-mandatory">
              {recentApps.length === 0 ? (
                <div className="text-white/50 text-sm font-medium w-full text-center py-10">No recent apps</div>
              ) : (
                recentApps.map((app) => (
                  <motion.button
                    key={app.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); openApp(app); setIsAppSwitcherOpen(false); }}
                    className="shrink-0 w-[240px] h-[360px] rounded-[2rem] bg-slate-800/90 border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-4 snap-center"
                  >
                    <span className="text-[80px] drop-shadow-lg">{app.icon}</span>
                    <span className="text-white font-bold text-lg">{app.name}</span>
                  </motion.button>
                ))
              )}
            </div>
            <button onClick={() => setIsAppSwitcherOpen(false)} className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-sm transition-colors backdrop-blur-md">
              Close Switcher
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOLDER MODAL OVERLAY */}
      <AnimatePresence>
        {openFolderId && (
          <motion.div initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(20px)' }} exit={{ opacity: 0, backdropFilter: 'blur(0px)' }} className="absolute inset-0 z-[150] flex flex-col items-center pt-24 bg-black/40" onClick={() => setOpenFolderId(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="w-full max-w-md px-6">
              <h2 className="text-white text-2xl font-bold text-center mb-8 drop-shadow-md">
                {desktopApps.find(a => a.id === openFolderId)?.name}
              </h2>
              <div className="grid grid-cols-3 gap-8">
                {desktopApps.find(a => a.id === openFolderId)?.folderApps?.map(app => (
                  <button key={app.id} onClick={() => openApp(app)} className="flex flex-col items-center gap-2 group">
                    <span className="text-[64px] leading-none drop-shadow-lg group-hover:scale-110 transition-transform">{app.icon}</span>
                    <span className="text-xs text-white drop-shadow-md font-medium">{app.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}