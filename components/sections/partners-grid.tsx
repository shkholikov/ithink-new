'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function PartnersGrid() {
  const t = useTranslations('partners');

  const partners = [0, 1, 2, 3, 4].map((i) => ({
    name: t(`items.${i}.name`),
    description: t(`items.${i}.description`),
  }));

  const accents = [
    'bg-blue-500/10 border-blue-500/20 text-blue-500',
    'bg-orange-500/10 border-orange-500/20 text-orange-500',
    'bg-green-500/10 border-green-500/20 text-green-500',
    'bg-teal-500/10 border-teal-500/20 text-teal-500',
    'bg-purple-500/10 border-purple-500/20 text-purple-500',
  ];

  return (
    <section className="py-24 lg:py-32 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#f9b934]/10 border border-[#f9b934]/30 text-[#f9b934] dark:text-[#f9b934] text-xs font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">{t('subtitle')}</p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-border hover:border-[#377dff]/25 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${accents[i]}`}>
                    <span className="text-sm font-black">
                      {partner.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{partner.name}</h3>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 text-[#377dff]" />
                  {t('officialPartner')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
