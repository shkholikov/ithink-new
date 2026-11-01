#!/usr/bin/env node
// Fails when messages/{ru,en,uz}.json do not have identical key sets. next-intl renders a missing
// key as its path instead of throwing, so this is the only guard.
import fs from "node:fs";

const LOCALES = ["ru", "en", "uz"];
const keys = (obj, prefix = "") =>
	Object.entries(obj).flatMap(([k, v]) => (v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]));
const sets = Object.fromEntries(LOCALES.map((l) => [l, new Set(keys(JSON.parse(fs.readFileSync(`messages/${l}.json`, "utf8"))))]));
const all = new Set(Object.values(sets).flatMap((s) => [...s]));
let bad = 0;
for (const l of LOCALES) {
	const missing = [...all].filter((k) => !sets[l].has(k));
	if (missing.length) {
		bad += missing.length;
		console.error(`${l}: missing ${missing.length}\n  ${missing.slice(0, 40).join("\n  ")}`);
	}
}
// Uzbek is written in Latin script; Cyrillic letters inside it are look-alike typos.
const uz = fs.readFileSync("messages/uz.json", "utf8");
const mixed = [...uz.matchAll(/"([^"]*[A-Za-z][^"]*)"/g)].map((m) => m[1]).filter((s) => /[A-Za-z]/.test(s) && /[Ѐ-ӿ]/.test(s));
if (mixed.length) {
	bad += mixed.length;
	console.error(`uz: ${mixed.length} strings mix Latin and Cyrillic letters\n  ${mixed.slice(0, 20).join("\n  ")}`);
}
if (bad) process.exit(1);
console.log(`messages OK: ${all.size} keys in ${LOCALES.join(", ")}`);
