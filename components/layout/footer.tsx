'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Share2, Send } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`}>
              <Image
                src="/logo.png"
                alt="ITHINK"
                width={110}
                height={34}
                className="h-8 w-auto mb-4"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{t('slogan')}</p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com/ithinkuz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors border border-border"
                aria-label="Instagram"
              >
                <Share2 className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="https://t.me/ithinkuzbot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors border border-border"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{t('company')}</p>
            <ul className="space-y-2.5">
              {[
                { label: t('links.about'), href: `/${locale}/about` },
                { label: t('links.customers'), href: `/${locale}/customers` },
                { label: t('links.partners'), href: `/${locale}/partners` },
                { label: t('links.faq'), href: `/${locale}/faq` },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{t('services')}</p>
            <ul className="space-y-2.5">
              {[
                { label: t('links.hireUs'), href: `/${locale}/hire-us` },
                { label: t('links.websites'), href: `/${locale}/websites` },
                { label: t('links.pricing'), href: `/${locale}/pricing` },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{t('contact')}</p>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:info@ithink.uz" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  info@ithink.uz
                </a>
              </li>
              <li>
                <a href="tel:+998555000000" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  +998 55 500-00-XX
                </a>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('links.contactPage')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} ITHINK. {t('rights')}.
          </p>
          <p className="text-xs text-muted-foreground">ithink.uz</p>
        </div>
      </div>
    </footer>
  );
}
