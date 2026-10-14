import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body?.name?.trim();
    const email = body?.email?.trim();
    const message = body?.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Name, email, and message are required.' }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || 'saifahmd059@gmail.com';

    if (!smtpUser || !smtpPass) {
      console.warn('[Contact API] SMTP_USER or SMTP_PASS not set in environment variables.');
      return NextResponse.json(
        { ok: true, message: 'Message received (Email service awaiting credentials).' },
        { status: 200 }
      );
    }

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
      replyTo: email,
      subject: `📬 New Message on Portfolio from ${name}`,
      text: `You have received a new contact message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
          <div style="border-bottom: 2px solid #6366f1; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #4338ca; margin: 0; font-size: 20px;">New Portfolio Inquiry</h2>
            <span style="font-size: 13px; color: #64748b;">Received via saifahmed portfolio contact form</span>
          </div>
          
          <p style="margin: 0 0 10px; font-size: 15px;"><strong>From:</strong> ${name}</p>
          <p style="margin: 0 0 20px; font-size: 15px;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></p>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #334155;">${message}</p>
          </div>

          <div style="padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
            Tip: You can hit <strong>Reply</strong> directly in your email client to respond to ${name} (${email}).
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, message: 'Message sent successfully.' });
  } catch (error: any) {
    console.error('[Contact API] Failed to send email:', error);
    return NextResponse.json(
      { message: error?.message || 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
