'use client';
import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ContactForm({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setState('sending');
    try {
      const endpoint = API ? `${API}/contact` : '/api/contact';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.get('name'), email: f.get('email'), message: f.get('message') }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.message ?? 'Message not sent.');
      form.reset();
      setState('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Message not sent.');
      setState('error');
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="form-label">
        Your Name
        <input name="name" required autoComplete="name" placeholder="e.g. John Doe" />
      </label>
      <label className="form-label">
        Your Email
        <input name="email" type="email" required autoComplete="email" placeholder="john@example.com" />
      </label>
      <label className="form-label">
        Message
        <textarea name="message" rows={4} required placeholder="Hello Saif, I'd like to talk about..." />
      </label>
      <button className="btn-primary" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending message...' : 'Send Message 🚀'}
      </button>
      <p role="status" className={`form-note ${state === 'sent' ? 'success' : state === 'error' ? 'error' : ''}`}>
        {state === 'sent' && '✓ Message sent successfully! I will reply by email soon.'}
        {state === 'error' && <>{error} You can also email <a href={`mailto:${email}`} style={{ textDecoration: 'underline', color: '#38bdf8' }}>{email}</a> directly.</>}
      </p>
    </form>
  );
}
