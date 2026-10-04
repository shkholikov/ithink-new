"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const INPUT_CLASS =
	"w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:border-[#377dff] focus-visible:ring-2 focus-visible:ring-[#377dff]/40 transition-colors";

interface ContactFormStrings {
	name: string;
	email: string;
	phone: string;
	message: string;
	submit: string;
	sending: string;
	success: string;
	error: string;
}

interface ContactFormProps {
	strings: ContactFormStrings;
	messageRows?: number;
}

export function ContactForm({ strings, messageRows = 5 }: ContactFormProps) {
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

	if (status === "success") {
		return (
			<div role="status" className="flex flex-col items-center justify-center gap-3 py-12">
				<CheckCircle className="w-12 h-12 text-green-500" />
				<p className="text-foreground font-medium text-center">{strings.success}</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<label className="block">
					<span className="sr-only">{strings.name}</span>
					<input
						type="text"
						placeholder={strings.name}
						value={form.name}
						onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
						required
						className={INPUT_CLASS}
					/>
				</label>
				<label className="block">
					<span className="sr-only">{strings.email}</span>
					<input
						type="email"
						placeholder={strings.email}
						value={form.email}
						onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
						required
						className={INPUT_CLASS}
					/>
				</label>
			</div>
			<label className="block">
				<span className="sr-only">{strings.phone}</span>
				<input
					type="tel"
					placeholder={strings.phone}
					value={form.phone}
					onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
					className={INPUT_CLASS}
				/>
			</label>
			<label className="block">
				<span className="sr-only">{strings.message}</span>
				<textarea
					placeholder={strings.message}
					value={form.message}
					onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
					required
					rows={messageRows}
					className={`${INPUT_CLASS} resize-none`}
				/>
			</label>
			{status === "error" && <p role="alert" className="text-sm text-red-500">{strings.error}</p>}
			<button
				type="submit"
				disabled={status === "sending"}
				className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#377dff] hover:bg-[#2563eb] disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-[#377dff]/25"
			>
				<Send className="w-4 h-4" />
				{status === "sending" ? strings.sending : strings.submit}
			</button>
		</form>
	);
}
