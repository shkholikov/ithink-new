"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Phone, Users, Globe, Zap, Shield, BookOpen, Settings, Wifi } from "lucide-react";

interface Props {
	locale: string;
}

const content = {
	ru: {
		badge: "Официальный Партнёр",
		tagline: "Интеграция IP-телефонии Asterisk с CRM-системами",
		since: "С 2017 года",
		installs: "3000+ установок",
		countries: "20 стран",
		aboutTitle: "О коннекторе Itgrix",
		aboutText:
			"Коннектор Itgrix — надёжный инструмент интеграции IP-телефонии Asterisk и CRM-систем для оперативной работы со звонками. Модуль интеграции Itgrix популярен на рынке с 2017 года, установлен более 3000 раз в 20 странах мира, является одним из виджетов, рекомендованных экспертами-интеграторами CRM-систем Битрикс24 и amoCRM.",
		advantagesTitle: "Преимущества",
		advantages: [
			"Работает с любым современным Asterisk (FreePBX, Elastix, Issabel)",
			"Не требует программирования — настройка за 17 минут",
			"Опытная команда разработки продукта",
			"Сильная команда технической поддержки",
			"Неограниченные возможности кастомизации под заказ",
			"Подробная база знаний по работе с модулем",
			"Умеет работать в закрытой сети",
			"Входит в Реестр российского ПО"
		],
		featuresTitle: "Возможности интеграции",
		bitrix24Title: "Для Битрикс24",
		bitrix24Features: [
			"Автоматическое создание лидов для неизвестных номеров",
			"Автосоединение с ответственным при повторном звонке",
			"Сохранение звонков и записей в карточке клиента",
			"Фиксация пропущенных звонков и автосоздание задач",
			"Звонки в один клик прямо из CRM (click-to-call)",
			"Всплывающая карточка звонка с данными клиента",
			"Сквозная аналитика с источниками трафика",
			"Широкие возможности кастомизации"
		],
		amoTitle: "Для amoCRM",
		amoFeatures: [
			"Автоматическое создание контактов для неизвестных номеров",
			"Создание звонков с длительностью, статусом и аудиозаписью",
			"Автораспределение звонков на ответственных сотрудников",
			"Фиксация пропущенных звонков с постановкой задач",
			"Распределение звонков по воронкам продаж",
			"Звонки в один клик прямо из CRM (click-to-call)",
			"Браузерная нотификация с карточкой звонка",
			"Аналитика по звонкам в разрезе сотрудников"
		],
		ctaTitle: "Готовы подключить Itgrix?",
		ctaSubtitle: "Свяжитесь с нами или узнайте больше на официальном сайте Itgrix.",
		ctaBtn: "Подробнее об Itgrix",
		ctaContact: "Связаться с нами"
	},
	uz: {
		badge: "Rasmiy Hamkor",
		tagline: "Asterisk IP-telefoniyasini CRM tizimlariga integratsiya qilish",
		since: "2017 yildan beri",
		installs: "3000+ o'rnatish",
		countries: "20 mamlakat",
		aboutTitle: "Itgrix konnektori haqida",
		aboutText:
			"Itgrix konnektori — Asterisk IP-telefoniyasi va CRM tizimlarini qo'ng'iroqlar bilan samarali ishlash uchun ishonchli integratsiya vositasi. Itgrix integratsiya moduli 2017 yildan beri bozorda mashhur, 20 mamlakatda 3000 martadan ko'proq o'rnatilgan va Bitrix24 va amoCRM CRM tizimlari ekspert-integratorlari tomonidan tavsiya etilgan vidjetlardan biri hisoblanadi.",
		advantagesTitle: "Afzalliklar",
		advantages: [
			"Har qanday zamonaviy Asterisk bilan ishlaydi (FreePBX, Elastix, Issabel)",
			"Dasturlash talab qilinmaydi — 17 daqiqada sozlash",
			"Tajribali mahsulot ishlab chiqish jamoasi",
			"Kuchli texnik qo'llab-quvvatlash jamoasi",
			"Buyurtma asosida cheksiz moslashtirishimkoniyatlari",
			"Modul bilan ishlash bo'yicha batafsil bilimlar bazasi",
			"Yopiq tarmoqda ishlaydi",
			"Rossiya dasturiy ta'minot reestriga kiritilgan"
		],
		featuresTitle: "Integratsiya imkoniyatlari",
		bitrix24Title: "Bitrix24 uchun",
		bitrix24Features: [
			"Noma'lum raqamlar uchun avtomatik lid yaratish",
			"Qayta qo'ng'iroqda ma'sul xodimga avtomatik ulanish",
			"Mijoz kartasida qo'ng'iroqlar va yozuvlarni saqlash",
			"O'tkazib yuborilgan qo'ng'iroqlarni qayd etish va vazifalarni avtomatik yaratish",
			"CRM dan bir klik bilan qo'ng'iroq qilish (click-to-call)",
			"Mijoz ma'lumotlari bilan qo'ng'iroq kartasi",
			"Trafik manbalari bilan kross-kanal tahlili",
			"Keng moslashtirishimkoniyatlari"
		],
		amoTitle: "amoCRM uchun",
		amoFeatures: [
			"Noma'lum raqamlar uchun avtomatik kontakt yaratish",
			"Muddati, holati va audio yozuvi bilan qo'ng'iroqlarni yaratish",
			"Qo'ng'iroqlarni ma'sul xodimlarga avtomatik taqsimlash",
			"O'tkazib yuborilgan qo'ng'iroqlarni vazifalar bilan qayd etish",
			"Savdo hunillariga qo'ng'iroqlarni taqsimlash",
			"CRM dan bir klik bilan qo'ng'iroq qilish (click-to-call)",
			"Qo'ng'iroq kartasi bilan brauzer bildirnomalari",
			"Xodimlar bo'yicha qo'ng'iroqlar tahlili"
		],
		ctaTitle: "Itgrix ni ulashga tayyormisiz?",
		ctaSubtitle: "Biz bilan bog'laning yoki Itgrix rasmiy saytida ko'proq bilib oling.",
		ctaBtn: "Itgrix haqida batafsil",
		ctaContact: "Biz bilan bog'laning"
	},
	en: {
		badge: "Official Partner",
		tagline: "Asterisk IP Telephony Integration for CRM Systems",
		since: "Since 2017",
		installs: "3000+ installs",
		countries: "20 countries",
		aboutTitle: "About Itgrix Connector",
		aboutText:
			"Itgrix is a reliable integration tool for Asterisk IP telephony and CRM systems, enabling efficient call management. The Itgrix integration module has been popular in the market since 2017, installed more than 3000 times across 20 countries, and is one of the recommended widgets by CRM integration experts for Bitrix24 and amoCRM.",
		advantagesTitle: "Advantages",
		advantages: [
			"Works with any modern Asterisk (FreePBX, Elastix, Issabel)",
			"No programming required — 17-minute setup",
			"Experienced product development team",
			"Strong technical support team",
			"Unlimited customization options on demand",
			"Detailed knowledge base for module usage",
			"Works in closed/private networks",
			"Registered in Russian software registry"
		],
		featuresTitle: "Integration Features",
		bitrix24Title: "For Bitrix24",
		bitrix24Features: [
			"Auto lead creation for unknown numbers",
			"Auto-connect to responsible employee on repeat calls",
			"Call logging with recordings in client card",
			"Missed call tracking with auto task creation",
			"Click-to-call directly from CRM",
			"Popup call card with client data during call",
			"Cross-channel analytics with traffic sources",
			"Wide customization capabilities"
		],
		amoTitle: "For amoCRM",
		amoFeatures: [
			"Auto contact creation for unknown numbers",
			"Call logging with duration, status and recording",
			"Auto-routing calls to responsible employees",
			"Missed call tracking with task assignment",
			"Sales funnel distribution by phone number",
			"Click-to-call directly from CRM",
			"Browser notification call card",
			"Call analytics broken down by employee"
		],
		ctaTitle: "Ready to connect Itgrix?",
		ctaSubtitle: "Contact us or learn more on the official Itgrix website.",
		ctaBtn: "Learn more about Itgrix",
		ctaContact: "Contact us"
	}
};

const advantageIcons = [Phone, Zap, Users, Shield, Settings, BookOpen, Wifi, Globe];

export default function PartnerItgrixPage({ locale }: Props) {
	const c = content[locale as keyof typeof content] ?? content.en;

	return (
		<div className="pt-24 bg-background">
			{/* Hero */}
			<section className="py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-amber-100/10 to-background">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-0 right-0 w-[600px] h-[500px] bg-slate-100/20 rounded-full blur-[120px]" />
				</div>
				<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col sm:flex-row items-center gap-10 mb-8">
						<div className="flex-1">
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-medium mb-2">
								<CheckCircle2 className="w-3 h-3" />
								{c.badge}
							</span>
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">Itgrix</h1>
							<p className="text-muted-foreground mt-1">{c.tagline}</p>
						</div>
						<div className="relative w-64 h-36 flex-shrink-0">
							<Image src="/images/partners/itgrix.png" alt="Itgrix" fill className="object-contain p-6" priority />
						</div>
					</div>

					{/* Stats */}
					<div className="flex flex-wrap gap-3">
						{[c.since, c.installs, c.countries].map((stat) => (
							<span
								key={stat}
								className="inline-flex items-center px-4 py-2 rounded-xl bg-card border border-border text-sm font-medium text-foreground"
							>
								{stat}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* About */}
			<section className="border-t border-border py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl font-bold text-foreground mb-4">{c.aboutTitle}</h2>
					<p className="text-muted-foreground leading-relaxed text-base">{c.aboutText}</p>
				</div>
			</section>

			{/* Advantages */}
			<section className="border-t border-border py-16 bg-card/30">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl font-bold text-foreground mb-8">{c.advantagesTitle}</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{c.advantages.map((item, i) => {
							const Icon = advantageIcons[i];
							return (
								<div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
									<div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
										<Icon className="w-4 h-4 text-amber-500" />
									</div>
									<p className="text-sm text-foreground leading-relaxed">{item}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="border-t border-border py-16">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl font-bold text-foreground mb-8">{c.featuresTitle}</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Bitrix24 */}
						<div className="rounded-2xl border border-border bg-card p-6">
							<div className="flex items-center gap-3 mb-5">
								<div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
									<span className="text-sm font-black text-orange-500">B2</span>
								</div>
								<h3 className="text-base font-semibold text-foreground">{c.bitrix24Title}</h3>
							</div>
							<ul className="space-y-3">
								{c.bitrix24Features.map((feature, i) => (
									<li key={i} className="flex items-start gap-2.5">
										<CheckCircle2 className="w-4 h-4 text-[#377dff] shrink-0 mt-0.5" />
										<span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
									</li>
								))}
							</ul>
						</div>

						{/* amoCRM */}
						<div className="rounded-2xl border border-border bg-card p-6">
							<div className="flex items-center gap-3 mb-5">
								<div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
									<span className="text-sm font-black text-blue-500">AM</span>
								</div>
								<h3 className="text-base font-semibold text-foreground">{c.amoTitle}</h3>
							</div>
							<ul className="space-y-3">
								{c.amoFeatures.map((feature, i) => (
									<li key={i} className="flex items-start gap-2.5">
										<CheckCircle2 className="w-4 h-4 text-[#377dff] shrink-0 mt-0.5" />
										<span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="border-t border-border py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="rounded-3xl bg-amber-500/5 border border-amber-500/20 p-10 text-center">
						<h3 className="text-2xl font-bold text-foreground mb-3">{c.ctaTitle}</h3>
						<p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">{c.ctaSubtitle}</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
							<Link
								href="https://itgrix.com/ru"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-colors"
								style={{ backgroundColor: "#ff9800" }}
							>
								{c.ctaBtn}
								<ArrowRight className="w-4 h-4" />
							</Link>
							<Link
								href={`/${locale}/contact`}
								className="inline-flex items-center gap-2 px-6 py-3 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-colors"
							>
								{c.ctaContact}
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
