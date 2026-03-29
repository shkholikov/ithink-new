'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, CheckCircle, DollarSign, Users, Repeat } from 'lucide-react';

const benefitIcons = [DollarSign, Users, Repeat];

export default function HireUsPage({ locale: _ }: { locale: string }) {
  const t = useTranslations('hireUs');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', budget: '', message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(
        'https://nodejs-serverless-function-express-two-tau.vercel.app/api/create-lead/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone,
            message: `Budget: ${form.budget}\n\n${form.message}`,
          }),
        }
      );
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setForm({ firstName: '', lastName: '', email: '', phone: '', budget: '', message: '' });
    } catch { setStatus('error'); }
  };

  const benefits = [0, 1, 2].map((i) => ({
    title: t(`benefits.${i}.title`),
    description: t(`benefits.${i}.description`),
    Icon: benefitIcons[i],
  }));

  const inputClass = "w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors";

  return (
    <div className="pt-24 bg-background">
      <section className="py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#377dff]/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff] text-xs font-medium mb-6">
              {t('hero.badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">{t('hero.title')}</h1>
            <p className="text-base text-muted-foreground max-w-xl">{t('hero.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 bg-card border border-border rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-[#377dff]/10 flex items-center justify-center flex-shrink-0">
                    <b.Icon className="w-5 h-5 text-[#377dff]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-7"
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                  <p className="text-foreground font-medium text-center">{t('form.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder={t('form.firstName')} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required className={inputClass} />
                    <input placeholder={t('form.lastName')} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required className={inputClass} />
                  </div>
                  <input type="email" placeholder={t('form.email')} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className={inputClass} />
                  <input type="tel" placeholder={t('form.phone')} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                  <input placeholder={t('form.budget')} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} required className={inputClass} />
                  <textarea placeholder={t('form.message')} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className={`${inputClass} resize-none`} />
                  {status === 'error' && <p className="text-sm text-red-500">{t('form.error')}</p>}
                  <button type="submit" disabled={status === 'sending'} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#377dff] hover:bg-[#2563eb] disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors">
                    <Send className="w-4 h-4" />
                    {status === 'sending' ? t('form.sending') : t('form.submit')}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
