'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactCta() {
  const t = useTranslations('cta');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(
        'https://nodejs-serverless-function-express-two-tau.vercel.app/api/create-lead/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 lg:py-32 border-t border-border bg-secondary/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-card border border-border rounded-3xl p-8 sm:p-12 overflow-hidden shadow-sm"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#377dff]/5 via-transparent to-purple-600/5 pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">{t('title')}</h2>
              <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
            </div>

            {status === 'success' ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="text-foreground font-medium">{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t('name')}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder={t('email')}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="tel"
                    placeholder={t('phone')}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <textarea
                    placeholder={t('message')}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="sm:col-span-2 text-sm text-red-500">{t('error')}</p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#377dff] hover:bg-[#2563eb] disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {status === 'sending' ? t('sending') : t('submit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
