import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { ClientGrid, type Client } from "@/components/customers/client-grid";

/** The 11 clients from `customers.items`, filterable by industry. */
export async function ClientsSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "customers" });
	const page = await getTranslations({ locale, namespace: "customersPage.list" });
	const clientsNs = await getTranslations({ locale, namespace: "clients" });
	const clients = (t.raw("items") as Client[]).map(({ name, industry, description, services }) => ({ name, industry, description, services }));
	return (
		<Section>
			<SectionHeading eyebrow={page("eyebrow")} title={page("title")} className="mb-8 sm:mb-10" />
			<ClientGrid clients={clients} labels={{ all: clientsNs("all"), filter: page("filter"), services: t("services") }} />
		</Section>
	);
}

/** The three client testimonials as a static quote band. */
export async function QuotesSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.testimonials" });
	const items = await getTranslations({ locale, namespace: "testimonials" });
	const quotes = [0, 1, 2].map((i) => ({
		quote: items(`items.${i}.quote`),
		name: items(`items.${i}.name`),
		role: items(`items.${i}.role`),
		company: items(`items.${i}.company`)
	}));
	return (
		<Section tone="muted">
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				{quotes.map((q) => (
					<figure key={q.name} className="reveal flex flex-col rounded-3xl border border-border bg-card p-6 sm:p-8">
						<Quote className="size-5 text-brand-text" aria-hidden="true" />
						<blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground sm:text-lg">{q.quote}</blockquote>
						<figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-5">
							<span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand-text">
								{q.name
									.split(/\s+/)
									.map((w) => w[0])
									.slice(0, 2)
									.join("")}
							</span>
							<span className="min-w-0">
								<span className="block text-sm font-semibold text-foreground">{q.name}</span>
								<span className="block text-sm text-muted-foreground">
									{q.role}, {q.company}
								</span>
							</span>
						</figcaption>
					</figure>
				))}
			</div>
		</Section>
	);
}
