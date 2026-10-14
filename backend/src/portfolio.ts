import { BadRequestException, Body, Controller, Get, Injectable, Module, OnModuleInit, Post } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import nodemailer from 'nodemailer';
import { Message, Project } from './entities';

// Sample rows, inserted once into an empty table. Edit them in pgAdmin afterwards.
const SEED = [
  {
    title: 'Verbex AI — AI Agent Management Platform',
    summary: 'A full-stack microservices platform to build, manage, and embed AI-powered chatbots on any website, featuring SSE streaming chat, multi-tenant agent management, LLM integration, and Docker deployment.',
    stack: ['Next.js 14', 'Node.js', 'PostgreSQL', 'Docker', 'Nginx', 'OpenRouter LLM', 'TypeScript'],
    liveUrl: null,
    repoUrl: 'https://github.com/SaifAhmed059/Verbex_AI_ChatBot_Platform_FullStack',
    position: 1,
  },
  {
    title: 'AI-Driven Inventory Management App',
    summary: 'A cross-platform mobile application built with React Native and Expo for tracking inventory, real-time product stock, offline SQLite database, voice transcription, and smart product workflows.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Expo SQLite', 'Voice Transcription', 'Mobile'],
    liveUrl: null,
    repoUrl: 'https://github.com/SaifAhmed059/AI-Driven_Inventory_management_App',
    position: 2,
  },
  {
    title: 'Xai — Intelligence Workspace',
    summary: 'A high-fidelity, interactive product landing experience that visually narrates how raw data is transformed into structured intelligence, actionable insight, and automated AI workflows.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Vercel'],
    liveUrl: 'https://x-ai-frontend-assignment-raco-ai.vercel.app',
    repoUrl: 'https://github.com/SaifAhmed059/X_AI_FrontendAssignment_RacoAI',
    position: 3,
  },
  {
    title: 'NexifyStore — Seller Module Backend',
    summary: 'Engineered the dedicated Seller backend module for the NexifyStore e-commerce ecosystem using NestJS and TypeScript. Features include seller authentication, product catalog management, inventory control, order fulfillment workflows, and modular REST APIs.',
    stack: ['NestJS', 'Node.js', 'TypeScript', 'REST APIs', 'Seller Management', 'E-Commerce'],
    liveUrl: null,
    repoUrl: 'https://github.com/SaifAhmed059/NexifyStore-APWB-Backend',
    position: 4,
  },
  {
    title: 'VoiceToText — Real-Time Speech Recognition Engine',
    summary: 'An automated speech-to-text recognition tool utilizing Python, SpeechRecognition, and audio processing to transcribe microphone voice input into real-time text output.',
    stack: ['Python', 'SpeechRecognition', 'PyAudio', 'Google Speech API', 'Audio Processing'],
    liveUrl: null,
    repoUrl: 'https://github.com/SaifAhmed059/speech_to_text_generate',
    position: 5,
  },
];

@Injectable()
export class PortfolioService implements OnModuleInit {
  constructor(
    @InjectRepository(Project) private projects: Repository<Project>,
    @InjectRepository(Message) private messages: Repository<Message>,
  ) {}

  async onModuleInit() {
    if ((await this.projects.count()) === 0) await this.projects.save(SEED.map((s) => this.projects.create(s)));
  }
  listProjects() { return this.projects.find({ order: { position: 'ASC' } }); }
  saveMessage(name: string, email: string, body: string) { return this.messages.save({ name, email, body }); }

  async sendNotificationEmail(senderName: string, senderEmail: string, messageBody: string) {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || smtpUser;

    if (!smtpUser || !smtpPass) {
      console.warn('[Contact Email] SMTP_USER or SMTP_PASS is missing in .env. Skipping email notification.');
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${smtpUser}>`,
        to: receiver,
        replyTo: senderEmail,
        subject: `📬 New Message on Portfolio from ${senderName}`,
        text: `You have received a new contact message:\n\nName: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${messageBody}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
            <div style="border-bottom: 2px solid #6366f1; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #4338ca; margin: 0; font-size: 20px;">New Portfolio Inquiry</h2>
              <span style="font-size: 13px; color: #64748b;">Received via saifahmed portfolio contact form</span>
            </div>
            
            <p style="margin: 0 0 10px; font-size: 15px;"><strong>From:</strong> ${senderName}</p>
            <p style="margin: 0 0 20px; font-size: 15px;"><strong>Sender Email:</strong> <a href="mailto:${senderEmail}" style="color: #4f46e5; text-decoration: none;">${senderEmail}</a></p>
            
            <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #334155;">${messageBody}</p>
            </div>

            <div style="padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
              Tip: You can hit <strong>Reply</strong> directly in your email client to respond to ${senderName} (${senderEmail}).
            </div>
          </div>
        `,
      });

      console.log(`[Contact Email] Notification email successfully sent to ${receiver}`);
    } catch (err) {
      console.error('[Contact Email] Error sending email via Nodemailer:', err);
    }
  }
}

@Controller()
export class PortfolioController {
  constructor(private svc: PortfolioService) {}

  @Get('health') health() { return { ok: true }; }
  @Get('projects') projects() { return this.svc.listProjects(); }

  @Post('contact')
  async contact(@Body() b: { name?: string; email?: string; message?: string }) {
    const name = b?.name?.trim(), email = b?.email?.trim(), message = b?.message?.trim();
    if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email) || message.length > 4000)
      throw new BadRequestException('Enter your name, a valid email and a message.');
    
    // Save to PostgreSQL database
    await this.svc.saveMessage(name, email, message);

    // Send email notification (non-blocking)
    this.svc.sendNotificationEmail(name, email, message).catch((err) => {
      console.error('[Contact Email] Async send failed:', err);
    });

    return { ok: true };
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Project, Message])],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
