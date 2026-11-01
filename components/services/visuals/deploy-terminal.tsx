"use client";

import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui/terminal";
import { useReducedMotion } from "./use-reduced-motion";
import { VisualFrame } from "./frame";

const STACK = ["React / Next.js", "Node.js", "Telegram Mini Apps", "Payme / Click"];

/**
 * Software development: Magic UI Terminal types a push, CI checks and a production deploy. Command
 * text is code and stays in English; only the closing line is translated. Reduced motion shows every
 * line at once (no typing). Fixed line heights keep the card from growing while it types.
 */
export function DeployTerminal({ labels }: { labels: { done: string } }) {
	const reduce = useReducedMotion();
	const ok = "min-h-5 text-emerald-700 dark:text-emerald-400";
	const dim = "min-h-5 text-ink-muted";

	return (
		<VisualFrame className="p-0 sm:p-0">
			<Terminal key={reduce ? "static" : "typing"} sequence={!reduce} className="max-h-none max-w-none rounded-none border-0 bg-transparent text-xs sm:text-sm">
				<Cmd still={reduce}>$ git push origin main</Cmd>
				<AnimatedSpan className={dim}>→ CI: lint · typecheck · test</AnimatedSpan>
				<AnimatedSpan className={ok}>✔ Lint</AnimatedSpan>
				<AnimatedSpan className={ok}>✔ Typecheck</AnimatedSpan>
				<AnimatedSpan className={ok}>✔ Tests</AnimatedSpan>
				<Cmd still={reduce}>$ pnpm build</Cmd>
				<AnimatedSpan className={ok}>✔ Next.js · React · Node.js</AnimatedSpan>
				<Cmd still={reduce}>$ deploy --env production</Cmd>
				<AnimatedSpan className={ok}>✔ web  Next.js app</AnimatedSpan>
				<AnimatedSpan className={ok}>✔ api  REST + webhooks</AnimatedSpan>
				<AnimatedSpan className={ok}>✔ bot  Telegram Mini App</AnimatedSpan>
				<AnimatedSpan className="min-h-5 font-semibold text-brand-text">{labels.done}</AnimatedSpan>
			</Terminal>
			<div className="flex flex-wrap gap-2 border-t border-ink-foreground/10 bg-ink-foreground/5 px-4 py-3">
				{STACK.map((s) => (
					<span key={s} className="tag tag-scene">
						{s}
					</span>
				))}
			</div>
		</VisualFrame>
	);
}

/** A typed command; a plain line when motion is reduced. */
function Cmd({ children, still }: { children: string; still: boolean }) {
	return still ? (
		<AnimatedSpan className="min-h-5 text-ink-foreground">{children}</AnimatedSpan>
	) : (
		<TypingAnimation className="min-h-5 text-ink-foreground" duration={40}>
			{children}
		</TypingAnimation>
	);
}
