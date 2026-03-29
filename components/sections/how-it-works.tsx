'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageSquare, ClipboardList, Hammer, Headphones } from 'lucide-react';

const stepIcons = [MessageSquare, ClipboardList, Hammer, Headphones];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [0, 1, 2, 3].map((i) => ({
    step: t(`items.${i}.step`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    Icon: stepIcons[i],
  }));

  return (
    <section className="py-24 lg:py-32 border-t border-border bg-secondary/20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#377dff]/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#f9b934]/10 border border-[#f9b934]/30 text-[#f9b934] text-xs font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('title')}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">{t('subtitle')}</p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon circle */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="relative w-20 h-20 rounded-2xl bg-card border border-border hover:border-[#377dff]/40 flex items-center justify-center mb-5 shadow-sm hover:shadow-[#377dff]/10 hover:shadow-lg transition-all duration-300 z-10"
              >
                <step.Icon className="w-7 h-7 text-[#377dff]" />
                {/* Step number badge */}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#377dff] text-white text-[10px] font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </motion.div>

              <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
