'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const locales = ['uz', 'ru', 'en'] as const;

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const companyLinks = [
    { label: t('about'), href: `/${locale}/about` },
    { label: t('customers'), href: `/${locale}/customers` },
    { label: t('partners'), href: `/${locale}/partners` },
    { label: t('faq'), href: `/${locale}/faq` },
  ];

  const serviceLinks = [
    { label: t('hireUs'), href: `/${locale}/hire-us` },
    { label: t('websites'), href: `/${locale}/websites` },
    { label: t('pricing'), href: `/${locale}/pricing` },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0d0d14]/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="ITHINK"
              width={120}
              height={36}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5">
                {t('company')}
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', activeDropdown === 'company' && 'rotate-180')} />
              </button>
              {activeDropdown === 'company' && (
                <div className="absolute top-full left-0 mt-1 w-48 glass-card rounded-xl overflow-hidden shadow-xl shadow-black/40">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5">
                {t('services')}
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', activeDropdown === 'services' && 'rotate-180')} />
              </button>
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-1 w-48 glass-card rounded-xl overflow-hidden shadow-xl shadow-black/40">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={`/${locale}/pricing`} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5">
              {t('pricing')}
            </Link>

            <Link href={`/${locale}/contact`} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5">
              {t('contactUs')}
            </Link>
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-0.5 bg-white/5 rounded-lg p-0.5">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className={cn(
                    'px-2.5 py-1 text-xs font-medium rounded-md transition-all uppercase',
                    l === locale ? 'bg-[#377dff] text-white' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {l}
                </Link>
              ))}
            </div>

            <Link
              href={`/${locale}/hire-us`}
              className="px-4 py-2 text-sm font-medium bg-[#377dff] hover:bg-[#2563eb] text-white rounded-lg transition-colors"
            >
              {t('hireUs')}
            </Link>
          </div>

          {/* Mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-[#0d0d14] border-l border-white/5 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center p-4 border-b border-white/5">
                  <Image src="/logo.png" alt="ITHINK" width={100} height={30} className="h-7 w-auto" />
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider px-3 py-2">{t('company')}</p>
                  {companyLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-foreground hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      {link.label}
                    </Link>
                  ))}

                  <p className="text-xs text-muted-foreground uppercase tracking-wider px-3 py-2 mt-4">{t('services')}</p>
                  {serviceLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-foreground hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      {link.label}
                    </Link>
                  ))}

                  <Link href={`/${locale}/contact`} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-foreground hover:text-white hover:bg-white/5 rounded-lg transition-colors mt-2">
                    {t('contactUs')}
                  </Link>
                </nav>

                <div className="p-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                    {locales.map((l) => (
                      <Link key={l} href={`/${l}`} onClick={() => setOpen(false)} className={cn('flex-1 text-center py-1.5 text-xs font-medium rounded-md transition-all uppercase', l === locale ? 'bg-[#377dff] text-white' : 'text-muted-foreground hover:text-foreground')}>
                        {l}
                      </Link>
                    ))}
                  </div>
                  <Link href={`/${locale}/hire-us`} onClick={() => setOpen(false)} className="block w-full text-center px-4 py-2.5 text-sm font-medium bg-[#377dff] hover:bg-[#2563eb] text-white rounded-lg transition-colors">
                    {t('hireUs')}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
