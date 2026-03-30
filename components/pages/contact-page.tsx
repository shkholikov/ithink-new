"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from "lucide-react";

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

	return (
		<div className="pt-24 bg-background">
			<section className="py-16 lg:py-20 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#377dff]/8 rounded-full blur-[120px]" />
				</div>
				<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff] text-xs font-medium mb-6">
							{t("hero.badge")}
						</span>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">{t("hero.title")}</h1>
						<p className="text-base text-muted-foreground">{t("hero.subtitle")}</p>
					</m.div>
				</div>
			</section>

			<section className="pb-24 border-t border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
					<div className="grid lg:grid-cols-2 gap-12">
						{/* Contact Info */}
						<m.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5 }}
						>
							<h2 className="text-xl font-bold text-foreground mb-7">{t("info.title")}</h2>

							<div className="bg-card border border-border rounded-2xl p-6 mb-5">
								<div className="flex items-center gap-4 mb-4">
									<div className="w-12 h-12 rounded-full bg-[#377dff]/10 flex items-center justify-center flex-shrink-0">
										<span className="text-sm font-bold text-[#377dff]">FK</span>
									</div>
									<div>
										<p className="text-sm font-semibold text-foreground">{t("info.name")}</p>
										<p className="text-xs text-muted-foreground">{t("info.ceo")}</p>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								{[
									{ Icon: Phone, label: t("info.phone"), href: "tel:+998555000000" },
									{ Icon: Mail, label: t("info.email"), href: "mailto:info@ithink.uz" },
									{ Icon: MapPin, label: t("info.address"), href: null }
								].map(({ Icon, label, href }, i) => (
									<div key={i} className="flex items-start gap-3">
										<div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
											<Icon className="w-3.5 h-3.5 text-[#377dff]" />
										</div>
										{href ? (
											<a href={href} className="text-sm text-foreground hover:text-[#377dff] transition-colors">
												{label}
											</a>
										) : (
											<span className="text-sm text-foreground">{label}</span>
										)}
									</div>
								))}

								<div className="flex items-center gap-3 pt-2">
									<Clock className="w-3.5 h-3.5 text-muted-foreground" />
									<span className="text-xs text-muted-foreground">{t("info.responseTime")}</span>
								</div>
							</div>

							<div className="flex gap-3 mt-6">
								<a
									href="https://instagram.com/ithinkuz"
									target="_blank"
									rel="noopener noreferrer"
									className="px-4 py-2 text-xs font-medium bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg border border-border transition-colors"
								>
									Instagram
								</a>
								<a
									href="https://t.me/ithinkuzbot"
									target="_blank"
									rel="noopener noreferrer"
									className="px-4 py-2 text-xs font-medium bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg border border-border transition-colors"
								>
									Telegram
								</a>
							</div>
						</m.div>

						{/* Form */}
						<m.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5 }}
							className="bg-card border border-border rounded-2xl p-7"
						>
							{status === "success" ? (
								<div className="flex flex-col items-center justify-center gap-3 py-12">
									<CheckCircle className="w-12 h-12 text-green-500" />
									<p className="text-foreground font-medium text-center">{t("form.success")}</p>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-4">
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
										rows={4}
										className={`${inputClass} resize-none`}
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
