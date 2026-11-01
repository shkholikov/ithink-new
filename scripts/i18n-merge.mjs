#!/usr/bin/env node
// Deep-merges a patch into messages/{ru,en,uz}.json in one step, so the three files keep the same keys.
// Usage: node scripts/i18n-merge.mjs patch.json
// patch.json: { "ru": { "home": { ... } }, "en": { ... }, "uz": { ... } }  (all three locales required)
// A lock directory serialises concurrent runs; every write re-reads the file first.
import fs from "node:fs";
import path from "node:path";

const LOCALES = ["ru", "en", "uz"];
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const lock = path.join(root, "messages", ".lock");

const patchFile = process.argv[2];
if (!patchFile) {
	console.error("usage: node scripts/i18n-merge.mjs patch.json");
	process.exit(1);
}
const patch = JSON.parse(fs.readFileSync(patchFile, "utf8"));
for (const l of LOCALES) if (!patch[l]) throw new Error(`patch is missing locale "${l}"`);

function keys(obj, prefix = "") {
	return Object.entries(obj).flatMap(([k, v]) => (v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]));
}
const sets = LOCALES.map((l) => new Set(keys(patch[l])));
for (const [i, l] of LOCALES.entries()) {
	const missing = [...sets[0]].filter((k) => !sets[i].has(k));
	const extra = [...sets[i]].filter((k) => !sets[0].has(k));
	if (missing.length || extra.length) throw new Error(`patch key mismatch in ${l}: missing ${missing.join(", ")} extra ${extra.join(", ")}`);
}

function merge(target, src) {
	for (const [k, v] of Object.entries(src)) {
		if (v && typeof v === "object" && !Array.isArray(v) && target[k] && typeof target[k] === "object" && !Array.isArray(target[k])) merge(target[k], v);
		else target[k] = v;
	}
	return target;
}

const deadline = Date.now() + 30000;
while (true) {
	try {
		fs.mkdirSync(lock);
		break;
	} catch {
		if (Date.now() > deadline) throw new Error("messages/.lock held for 30 s; remove it if no merge is running");
		Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
	}
}
try {
	for (const l of LOCALES) {
		const file = path.join(root, "messages", `${l}.json`);
		const data = merge(JSON.parse(fs.readFileSync(file, "utf8")), patch[l]);
		fs.writeFileSync(file, JSON.stringify(data, null, "\t") + "\n");
	}
	console.log(`merged ${sets[0].size} keys into ${LOCALES.join(", ")}`);
} finally {
	fs.rmdirSync(lock);
}
