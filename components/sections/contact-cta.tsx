"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Send, CheckCircle, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { InstagramIcon } from "@/components/ui/instagram-icon";

export default function ContactCta() {
	const t = useTranslations("cta");
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
			if (res.ok) {
				setStatus("success");
				setForm({ name: "", email: "", phone: "", message: "" });
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	const phoneValue = t("phoneValue");
	const telegramValue = t("telegramValue");
	const emailValue = t("emailValue");
	const instagramValue = t("instagramValue");

	return (
		<section id="contact" className="py-24 lg:py-32 border-t border-border bg-background relative overflow-hidden">
			{/* Background glow */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-[#377dff]/5 rounded-full blur-[120px]" />
				<div className="absolute top-0 right-1/4 w-[400px] h-[200px] bg-purple-600/5 rounded-full blur-[100px]" />
			</div>

			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section header */}
				<m.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<SectionBadge icon={MessageSquare} label="Contact" />
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">{t("title")}</h2>
					<p className="text-sm text-muted-foreground max-w-xl mx-auto">{t("subtitle")}</p>
				</m.div>

				{/* 2-column layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
					{/* Left: Contact info */}
					<m.div
						initial={{ opacity: 0, x: -24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="bg-card border border-border rounded-3xl p-8 lg:p-10 relative overflow-hidden"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-[#377dff]/5 to-transparent pointer-events-none" />
						<div className="relative z-10">
							<h3 className="text-xl font-bold text-foreground mb-2">{t("contactTitle")}</h3>
							<p className="text-sm text-muted-foreground mb-8">{t("contactSubtitle")}</p>

							{/* Contact channels */}
							<div className="space-y-4">
								<a
									href={`tel:${phoneValue.replace(/\s/g, "")}`}
									className="group flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-[#377dff]/40 transition-all duration-200"
								>
									<div className="w-10 h-10 rounded-xl bg-[#377dff]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#377dff]/20 transition-colors">
										<Phone className="w-4 h-4 text-[#377dff]" />
									</div>
									<div>
										<div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Phone</div>
										<div className="text-sm font-medium text-foreground">{phoneValue}</div>
									</div>
								</a>

								<a
									href={telegramValue}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-[#377dff]/40 transition-all duration-200"
								>
									<div className="w-10 h-10 rounded-xl bg-[#377dff]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#377dff]/20 transition-colors">
										<Send className="w-4 h-4 text-[#377dff]" />
									</div>
									<div>
										<div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Telegram</div>
										<div className="text-sm font-medium text-foreground">@ithinkteam</div>
									</div>
								</a>

								<a
									href={`mailto:${emailValue}`}
									className="group flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-[#377dff]/40 transition-all duration-200"
								>
									<div className="w-10 h-10 rounded-xl bg-[#377dff]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#377dff]/20 transition-colors">
										<Mail className="w-4 h-4 text-[#377dff]" />
									</div>
									<div>
										<div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Email</div>
										<div className="text-sm font-medium text-foreground">{emailValue}</div>
									</div>
								</a>

								<a
									href={instagramValue}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-[#e1306c]/40 transition-all duration-200"
								>
									<div className="w-10 h-10 rounded-xl bg-[#e1306c]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e1306c]/20 transition-colors">
										<InstagramIcon className="w-4 h-4 text-[#e1306c]" />
									</div>
									<div>
										<div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Instagram</div>
										<div className="text-sm font-medium text-foreground">@ithinkuz</div>
									</div>
								</a>
							</div>

							{/* Response note */}
							<div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
								<Clock className="w-3.5 h-3.5 text-[#377dff] flex-shrink-0" />
								{t("responseNote")}
							</div>
						</div>
					</m.div>

					{/* Right: Form */}
					<m.div
						initial={{ opacity: 0, x: 24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5, delay: 0.15 }}
						className="bg-card border border-border rounded-3xl p-8 lg:p-10 relative overflow-hidden"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-600/3 pointer-events-none" />
						<div className="relative z-10">
							{status === "success" ? (
								<div className="flex flex-col items-center gap-3 py-12">
									<CheckCircle className="w-12 h-12 text-green-500" />
									<p className="text-foreground font-medium text-center">{t("success")}</p>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<input
											type="text"
											placeholder={t("name")}
											value={form.name}
											onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
											required
											className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors"
										/>
										<input
											type="email"
											placeholder={t("email")}
											value={form.email}
											onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
											required
											className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors"
										/>
									</div>
									<input
										type="tel"
										placeholder={t("phone")}
										value={form.phone}
										onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
										className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors"
									/>
									<textarea
										placeholder={t("message")}
										value={form.message}
										onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
										required
										rows={5}
										className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors resize-none"
									/>

									{status === "error" && <p className="text-sm text-red-500">{t("error")}</p>}

									<button
										type="submit"
										disabled={status === "sending"}
										className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#377dff] hover:bg-[#2563eb] disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-[#377dff]/25"
									>
										<Send className="w-4 h-4" />
										{status === "sending" ? t("sending") : t("submit")}
									</button>
								</form>
							)}
						</div>
					</m.div>
				</div>
			</div>
		</section>
	);
}
