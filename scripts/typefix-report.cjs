const { execSync } = require("node:child_process")
const fs = require("node:fs")

let out
try {
  out = execSync("pnpm typecheck", { encoding: "utf-8" })
} catch (e) {
  out = e.stdout || e.message || ""
}

// If no errors, write success note.
if (!/error TS\d+/.test(out)) {
  fs.writeFileSync("typefix-report.md", "# TypeScript Report\n\nNo errors.\n")
  process.exit(0)
}

// Parse ts errors to a concise report
const lines = out.split("\n")
const entries = []
for (const line of lines) {
  // Match different error formats
  let m = line.match(/(.*\.ts[x]?):(\d+):(\d+)\s-\serror\s(TS\d+):\s(.+)/)
  if (!m) {
    m = line.match(/(.*\.ts[x]?):\((\d+),(\d+)\)\s-\serror\s(TS\d+):\s(.+)/)
  }
  if (m) entries.push({ file: m[1], line: m[2], col: m[3], code: m[4], msg: m[5] })
}

const grouped = entries.reduce((acc, e) => {
  ;(acc[e.file] ||= []).push(e)
  return acc
}, {})

let md = `# TypeScript Error Report\n\nGenerated: ${new Date().toISOString()}\n\n`
for (const file of Object.keys(grouped)) {
  md += `## ${file}\n`
  grouped[file].forEach((e) => {
    md += `- ${e.code} @${e.line}:${e.col} — ${e.msg}\n`
  })
  md += `\n`
}
md += `\n> Next: fix per file. Prefer explicit types, narrow unions, add null checks, or add module shims in types/globals.d.ts.\n`
fs.writeFileSync("typefix-report.md", md)
