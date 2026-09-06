"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
	return (
		<MotionConfig reducedMotion="user">
			<LazyMotion features={domAnimation}>{children}</LazyMotion>
		</MotionConfig>
	);
}
