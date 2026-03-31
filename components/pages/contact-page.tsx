"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Phone, Send, CheckCircle, MessageSquare, Mail } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";

export default function ContactPage({ locale: _ }: { locale: string }) {
	const t = useTranslations("contact");
	const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
	const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("sending");
		try {
			const res = await fetch("https://nodejs-serverless-function-express-two-tau.vercel.app/api/create-lead/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form)
			});
			setStatus(res.ok ? "success" : "error");
			if (res.ok) setForm({ name: "", email: "", phone: "", message: "" });
		} catch {
			setStatus("error");
		}
	};

	const inputClass =
		"w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors";

	const phone = t("info.phone");
	const contacts = [
		{ icon: Phone, label: "PHONE", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
		{ icon: Send, label: "TELEGRAM", value: t("info.telegramHandle"), href: "https://t.me/ithinkteam" },
		{ icon: Mail, label: "EMAIL", value: t("info.email"), href: `mailto:${t("info.email")}` }
	];

	return (
		<div className="pt-24 bg-background">
			<section className="py-16 lg:py-20 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#377dff]/8 rounded-full blur-[120px]" />
				</div>
				<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<SectionBadge icon={MessageSquare} label={t("hero.badge")} variant="blue" className="mb-6" />
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">{t("hero.title")}</h1>
						<p className="text-base text-muted-foreground max-w-2xl mx-auto">{t("hero.subtitle")}</p>
					</m.div>
				</div>
			</section>

			<section className="pb-24 border-t border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
					<div className="grid lg:grid-cols-2 gap-6">
						{/* Contact Info */}
						<m.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5 }}
							className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-6"
						>
							<div>
								<h2 className="text-xl font-bold text-foreground mb-1">{t("info.title")}</h2>
								<p className="text-sm text-muted-foreground">{t("info.subtitle")}</p>
							</div>

							<div className="flex flex-col gap-3">
								{contacts.map(({ icon: Icon, label, value, href }) => (
									<a
										key={label}
										href={href}
										target={label === "TELEGRAM" ? "_blank" : undefined}
										rel={label === "TELEGRAM" ? "noopener noreferrer" : undefined}
										className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-[#377dff]/30 transition-colors group"
									>
										<div className="w-10 h-10 rounded-lg bg-[#377dff]/10 flex items-center justify-center flex-shrink-0">
											<Icon className="w-4 h-4 text-[#377dff]" />
										</div>
										<div>
											<p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">{label}</p>
											<p className="text-sm font-medium text-foreground group-hover:text-[#377dff] transition-colors">{value}</p>
										</div>
									</a>
								))}
							</div>

							<p className="text-xs text-muted-foreground mt-auto">{t("info.responseTime")}</p>
						</m.div>

						{/* Form */}
						<m.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5 }}
							className="bg-card border border-border rounded-2xl p-8"
						>
							{status === "success" ? (
								<div className="flex flex-col items-center justify-center gap-3 h-full py-16">
									<CheckCircle className="w-12 h-12 text-green-500" />
									<p className="text-foreground font-medium text-center">{t("form.success")}</p>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
									<div className="grid grid-cols-2 gap-4">
										<input
											placeholder={t("form.name")}
											value={form.name}
											onChange={(e) => setForm({ ...form, name: e.target.value })}
											required
											className={inputClass}
										/>
										<input
											type="email"
											placeholder={t("form.email")}
											value={form.email}
											onChange={(e) => setForm({ ...form, email: e.target.value })}
											required
											className={inputClass}
										/>
									</div>
									<input
										type="tel"
										placeholder={t("form.phone")}
										value={form.phone}
										onChange={(e) => setForm({ ...form, phone: e.target.value })}
										className={inputClass}
									/>
									<textarea
										placeholder={t("form.message")}
										value={form.message}
										onChange={(e) => setForm({ ...form, message: e.target.value })}
										required
										rows={6}
										className={`${inputClass} resize-none flex-1`}
									/>
									{status === "error" && <p className="text-sm text-red-500">{t("form.error")}</p>}
									<button
										type="submit"
										disabled={status === "sending"}
										className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#377dff] hover:bg-[#2563eb] disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
									>
										<Send className="w-4 h-4" />
										{status === "sending" ? t("form.sending") : t("form.submit")}
									</button>
								</form>
							)}
						</m.div>
					</div>
				</div>
			</section>
		</div>
	);
}
