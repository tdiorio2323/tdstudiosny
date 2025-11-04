# TD Studios — Final Route Architecture

## Primary Routes

| Path                | Purpose                | Notes                                      |
| ------------------- | ---------------------- | ------------------------------------------ |
| `/`                 | Landing page           | Hero + "What We Do" + Why TD Studios + CTA |
| `/work`             | Portfolio showcase     | Grid layout with projects and metrics      |
| `/web`              | Web Experience         | Website design, marketing, and builds      |
| `/dev`              | Development            | Platforms, SaaS, dashboards, automation    |
| `/social`           | Social Media Marketing | Growth and content system campaigns        |
| `/design`           | Brand & Visual Design  | Logos, packaging, creative direction       |
| `/process`          | C.L.O.S.E. Method      | Five-step process, deliverables, FAQs      |
| `/resources`        | Content Hub            | Guides, templates, webinars                |
| `/faq`              | General FAQ            | Services · Process · Technical · Design    |
| `/contact`          | Lead intake            | Form → Resend integration                  |
| `/book`             | Consult booking        | Calendly embed                             |
| `/support`          | Live chat              | OpenAI ChatKit interface                   |
| `/legal`            | Terms & Privacy        | Single combined doc                        |
| `/clients/[client]` | Client Portal          | Dynamic post-auth dashboard                |
| `/[client]/signin`  | Client Sign-in         | Dynamic login route                        |

## Removed

- `/pricing` (merged into `/faq`)
- `/services` (split into `/web`, `/dev`, `/social`, `/design`)

## Navigation Structure

`WORK · WEB · DEV · SOCIAL · DESIGN · PROCESS · RESOURCES · FAQ · CONTACT`

---

**Last Updated:** 2025-10-09
**Structure Status:** Production-ready
