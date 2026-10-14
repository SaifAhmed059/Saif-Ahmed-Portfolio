export type Project = { id?: number; title: string; summary: string; stack: string[]; liveUrl?: string | null; repoUrl?: string | null };

// >>> Edit this file to make the site yours <<<
export const profile = {
  name: 'Saif Ahmed',
  role: 'Full-stack software engineer',
  intro: 'From intuitive user interfaces to robust backend systems, I build scalable web experiences with React, Next.js, Node.js, and PostgreSQL.',
  about: [
    'I am Saif Ahmed Sourav, a Computer Science and Engineering graduate from American International University-Bangladesh(AIUB) who is passionate about software development and building meaningful digital products. I enjoy working across the full stack, developing interactive web applications, exploring mobile app development, and experimenting with AI-powered solutions.',
    'I believe in writing clean, maintainable code and approaching every challenge with curiosity and a problem-solving mindset. I am always eager to learn new technologies, improve my skills, and turn ideas into practical solutions that create real value.',
  ],
  email: 'saifahmd059@gmail.com', // TODO: your email
  avatar: '/saifpic.jpg',
  status: 'Available for new opportunities',
  location: 'Dhaka, Bangladesh',
  github: 'https://github.com/SaifAhmed059', // TODO
  linkedin: 'https://linkedin.com/in/saif-ahmed-a76a682b4', // TODO
  cv: '/Saif_Ahmed_Cv_Portfolio.pdf',
  skills: [
    { group: 'Frontend & Mobile', items: ['React', 'Next.js 14', 'React Native', 'Expo', 'TypeScript', 'Tailwind CSS'] },
    { group: 'Backend & Architecture', items: ['Node.js', 'NestJS', 'REST APIs', 'SSE Streaming', 'Authentication'] },
    { group: 'Database & Storage', items: ['PostgreSQL', 'Expo SQLite', 'TypeORM', 'pgAdmin'] },
    { group: 'AI & Audio Processing', items: ['OpenRouter LLM', 'Python', 'SpeechRecognition', 'Google Speech API'] },
    { group: 'DevOps & Tools', items: ['Docker', 'Vercel', 'Git & GitHub'] },
  ],
  experience: [
    {
      period: 'Feb 2026 – April 2026',
      title: 'App Developer Intern',
      org: 'Neurosoft Technologies Ltd , Gulshan, Dhaka',
      note: 'Developed a cross-platform AI-driven inventory management mobile application featuring offline SQLite sync, voice transcription, and real-time stock tracking.',
    },
  ],
};

export const fallbackProjects: Project[] = [
  {
    title: 'Verbex AI — AI Agent Management Platform',
    summary: 'A full-stack microservices platform to build, manage, and embed AI-powered chatbots on any website, featuring SSE streaming chat, multi-tenant agent management, LLM integration, and Docker deployment.',
    stack: ['Next.js 14', 'Node.js', 'PostgreSQL', 'Docker', 'Nginx', 'OpenRouter LLM', 'TypeScript'],
    liveUrl: null,
    repoUrl: 'https://github.com/SaifAhmed059/Verbex_AI_ChatBot_Platform_FullStack',
  },
  {
    title: 'AI-Driven Inventory Management App',
    summary: 'A cross-platform mobile application built with React Native and Expo for tracking inventory, real-time product stock, offline SQLite database, voice transcription, and smart product workflows.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Expo SQLite', 'Voice Transcription', 'Mobile'],
    liveUrl: null,
    repoUrl: 'https://github.com/SaifAhmed059/AI-Driven_Inventory_management_App',
  },
  {
    title: 'Xai — Intelligence Workspace',
    summary: 'A high-fidelity, interactive product landing experience that visually narrates how raw data is transformed into structured intelligence, actionable insight, and automated AI workflows.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Vercel'],
    liveUrl: 'https://x-ai-frontend-assignment-raco-ai.vercel.app',
    repoUrl: 'https://github.com/SaifAhmed059/X_AI_FrontendAssignment_RacoAI',
  },
  {
    title: 'NexifyStore — Seller Module Backend',
    summary: 'Engineered the dedicated Seller backend module for the NexifyStore e-commerce ecosystem using NestJS and TypeScript. Features include seller authentication, product catalog management, inventory control, order fulfillment workflows, and modular REST APIs.',
    stack: ['NestJS', 'Node.js', 'TypeScript', 'REST APIs', 'Seller Management', 'E-Commerce'],
    liveUrl: null,
    repoUrl: 'https://github.com/SaifAhmed059/NexifyStore-APWB-Backend',
  },
  {
    title: 'VoiceToText — Real-Time Speech Recognition Engine',
    summary: 'An automated speech-to-text recognition tool utilizing Python, SpeechRecognition, and audio processing to transcribe microphone voice input into real-time text output.',
    stack: ['Python', 'SpeechRecognition', 'PyAudio', 'Google Speech API', 'Audio Processing'],
    liveUrl: null,
    repoUrl: 'https://github.com/SaifAhmed059/speech_to_text_generate',
  },
];
