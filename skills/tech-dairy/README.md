---
name: tech-dairy
description: Source the latest tech news and blog posts (AI, frontend dev, VR/MR) and publish them as a new page in the user's Notion "Tech Dairy" database. Trigger when the user says /tech-dairy, "tech dairy", "grab tech news", or "post to notion".
---

# Tech Dairy

Search for fresh tech articles and publish a daily digest to Notion.

## Prerequisites

This skill needs a Notion integration token and the ID of the "Tech Dairy" page/database.

If either is missing, prompt the user:

> To use this skill I need two things:
> 1. **NOTION_TOKEN** — your Notion integration secret (create one at https://www.notion.so/my-integrations)
> 2. **NOTION_PARENT_ID** — the ID of your "Tech Dairy" page (copy it from the page URL)
>
> You can set these as environment variables, or paste them here now.

Once provided, proceed.

## Phase 1: Detect run count for today

Use Bash to check the Melbourne local time and date:

```bash
TZ="Australia/Melbourne" date "+%Y-%m-%d %H:%M"
```

Store the Melbourne date (e.g. `2026-04-11`) and current time for use in the page title.

Query Notion to see how many "Tech Dairy" child pages already exist for today:

```bash
curl -s -X POST "https://api.notion.com/v1/search" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{"query": "<MELBOURNE_DATE>", "filter": {"value": "page", "property": "object"}}' \
| jq '[.results[] | select(.properties.title.title[0].text.content | test("<MELBOURNE_DATE>"))] | length'
```

- If 0 results → this is the first post today → title: `Tech Dairy · <date>`
- If N results → this is the (N+1)th post → title: `Tech Dairy · <date> · #<N+1>`

## Phase 2: Search for articles

Search for **5 articles total** across three categories. Use WebSearch for each.

### Search queries to use (adapt to include current year 2025/2026):

**AI (2 article):**
- Query: `"Anthropic OR OpenAI OR Google DeepMind" blog post 2026 site:anthropic.com OR site:openai.com OR site:deepmind.google`
- Fallback: `latest AI model release blog 2026`

**Frontend Dev (1 articles):**
- Query: `React JavaScript frontend development blog 2026 new features performance`
- Query: `CSS web API frontend tooling update 2026 site:dev.to OR site:medium.com OR site:web.dev`

**VR/MR (1 article):**
- Query: `Vision Pro WebXR mixed reality developer update 2026`

**Wildcard frontend/JS (1 article):**
- Query: `JavaScript TypeScript ecosystem update best practices 2026`

For each result:
1. Pick the most relevant, authoritative, and recent result
2. Use WebFetch to read the article and extract: title, source, date, 2–3 sentence summary, key takeaway, and URL

## Phase 3: Compose content

Build a Notion page with this structure:

### Quick Summary table (at the top)

| # | Category | Title | Source | Link |
|---|----------|-------|--------|------|
| 1 | AI | ... | ... | [read →](url) |
| 2 | Frontend | ... | ... | [read →](url) |
| 3 | Frontend | ... | ... | [read →](url) |
| 4 | VR/MR | ... | ... | [read →](url) |
| 5 | JS/TS | ... | ... | [read →](url) |

### Article sections (one per article)

Each section:
```
## [emoji] [Article Title]

**Source:** [Publication name]  |  **Date:** [publish date]  |  **Category:** [AI / Frontend / VR/MR / JS]

[2–3 sentence summary focused on what's new and why it matters to a React/frontend dev]

**Key takeaway:** [one sentence]

[Read original →](url)
```

Emoji guide:
- AI articles: 🤖
- Frontend/React/CSS: ⚛️
- VR/MR: 🥽
- JS/TS/tooling: 🛠️

## Phase 4: Publish to Notion

Use the Notion API to create a new child page under the parent. Build the full Notion block JSON and POST it.

Use Bash to POST via curl:

```bash
curl -s -X POST "https://api.notion.com/v1/pages" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '<JSON_PAYLOAD>'
```

### Notion block structure to generate

```json
{
  "parent": { "page_id": "<NOTION_PARENT_ID>" },
  "properties": {
    "title": {
      "title": [{ "text": { "content": "<PAGE_TITLE>" } }]
    }
  },
  "children": [
    {
      "object": "block",
      "type": "table",
      ...quick summary table blocks...
    },
    {
      "object": "block",
      "type": "divider"
    },
    ...heading_2 + paragraph + quote blocks for each article...
  ]
}
```

Build the full payload carefully. For each article use:
- `heading_2` for the article title with emoji
- `paragraph` blocks for metadata line, summary, key takeaway
- `bookmark` block for the URL (Notion renders it as a rich link preview)
- `divider` between articles

## Phase 5: Confirm delivery

After a successful API response (HTTP 200), tell the user:

```
Published → "Tech Dairy · <date>" on Notion
5 articles: 1 AI · 2 Frontend · 1 VR/MR · 1 JS/Tooling
```

If the API call fails, show the error and suggest:
- Check that the integration is connected to the "Tech Dairy" page (Share → invite your integration)
- Verify the token and page ID are correct

## Options (user can pass inline)

| Flag | Effect |
|------|--------|
| `topic: <keyword>` | Narrow the search to a specific topic (e.g. `topic: React Server Components`) |
| `count: <n>` | Change number of articles (default 5) |
| `lang: zh` | Write summaries in Chinese (default: English) |
