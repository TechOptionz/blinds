'use client';
import { useRef, useState } from 'react';
import { enquiryOptions } from '@/content/enquiry-options';
import { enquirySchema } from '@/lib/validations';
type Errors = Record<string, string[] | undefined>;
export function EnquiryForm({ product }: { product: string }) {
  const [errors, setErrors] = useState<Errors>({}); const [pending, setPending] = useState(false); const [status, setStatus] = useState(''); const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending) return;
    const form = new FormData(event.currentTarget);
    const values = { name: form.get('name'), email: form.get('email'), phone: form.get('phone'), product: form.get('product'), message: form.get('message'), consent: form.get('consent') === 'on', website: form.get('website') };
    const parsed = enquirySchema.safeParse(values); setStatus(''); setErrors({});
    if (!parsed.success) { const fields = parsed.error.flatten().fieldErrors; setErrors(fields); setStatus('Please check the highlighted fields and try again.'); formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(fields)[0]}"]`)?.focus(); return; }
    setPending(true);
    try {
      const response = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed.data), signal: AbortSignal.timeout(20000) });
      const data = await response.json();
      if (!response.ok || !data.success) { setErrors(data.fields || {}); setStatus(data.error || "Sorry, we couldn't send your enquiry right now. Please try again."); }
      else { setSuccess(true); setStatus("Thank you — your enquiry has been sent. We'll be in touch using the details you've provided."); }
    } catch { setStatus("Sorry, we couldn't send your enquiry right now. Please check your connection and try again."); } finally { setPending(false); }
  }
  const props = (key: string) => ({ 'aria-invalid': Boolean(errors[key]), 'aria-describedby': errors[key] ? `${key}-error` : undefined });
  const error = (key: string) => errors[key] && <span className="field-error" id={`${key}-error`}>{errors[key]?.[0]}</span>;
  const failed = Boolean(status) && !success;
  return <form ref={formRef} onSubmit={submit} noValidate className="enquiry-form" aria-labelledby="enquiry-heading">
    <div className="enquiry-form-head"><span className="eyebrow">Enquiry form</span><h2 id="enquiry-heading">Send an enquiry</h2><p>Share a few details and we’ll come back to you with ideas and a clear next step.</p></div>
    {success ? <div className="form-success" role="status"><span className="form-success-mark" aria-hidden="true">✓</span><div><h3>Enquiry sent</h3><p>{status}</p></div></div> : <>
      <div className="form-grid">
        <label>Your name <span className="required" aria-hidden="true">*</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name" {...props('name')} />{error('name')}</label>
        <label>Email address <span className="required" aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" inputMode="email" {...props('email')} />{error('email')}</label>
        <label>Phone number <small>Optional</small><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Best number to reach you" inputMode="tel" {...props('phone')} />{error('phone')}</label>
        <label>What are you interested in?<select name="product" defaultValue={product} {...props('product')}><option value="">I’m still exploring</option>{enquiryOptions.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}</select>{error('product')}</label>
        <label className="full-field">Tell us about your space <span className="required" aria-hidden="true">*</span><textarea name="message" rows={6} required minLength={10} maxLength={3000} placeholder="The room, the windows, the look you have in mind, and anything else that would help us prepare." {...props('message')} />{error('message')}</label>
      </div>
      <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="form-footer">
        <div className="form-consent"><label className="consent"><input type="checkbox" name="consent" required {...props('consent')} /><span>I agree to be contacted about my enquiry.</span></label>{error('consent')}<p className="privacy-note">We only use your details to respond to this enquiry. They are never shared or added to a mailing list.</p></div>
        <button className="link-button solid submit-button" disabled={pending}>{pending ? 'Sending…' : 'Send enquiry'}<span className="arrow" aria-hidden="true">→</span></button>
      </div>
      <p role="status" aria-live="polite" className={`form-status${failed ? ' is-error' : ''}`}>{status}</p>
    </>}
  </form>;
}
