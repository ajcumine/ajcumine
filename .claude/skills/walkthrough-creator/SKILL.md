---
name: walkthrough-creator
description: "Create completionist game walkthrough checklists for the personal website. Use this skill whenever the user asks to: add a new game walkthrough, create a checklist guide for a game, add a game to the walkthroughs section, write a completionist guide, or mentions wanting to track progress through a game. Also use when the user wants to update or improve an existing walkthrough. This skill handles the full pipeline: researching accurate quest data, writing the markdown, and wiring up the page."
---

# Walkthrough Creator

Create completionist walkthrough checklists for games, formatted for the interactive `WalkthroughChecklist` React component on this website.

## Why this skill exists

Game walkthroughs generated from memory are full of hallucinated quest names, wrong NPC names, incorrect locations, and fabricated items. This happened on the first attempt at a Skyrim walkthrough — dozens of fake quest names made it in. The solution is a research-first process that verifies every quest name, NPC, and location against authoritative sources before including it. This skill encodes that hard-won lesson.

## The output format

The walkthrough is a markdown file that gets parsed by the `WalkthroughChecklist` component. The parser is very specific about what it recognises:

- Lines starting with `# ` (single hash) become the page title
- Plain text lines after the title (before the first `## `) become the description (rendered as plain text, no markdown formatting — keep it to one or two simple sentences)
- Lines starting with `## ` become collapsible section headers
- Lines matching `- [ ] \`Tag\` description text` become interactive checkbox items
- `---` horizontal rules are ignored (used as visual separators in the source)
- Everything else is ignored by the parser

**CRITICAL: Nothing else renders.** No bold (`**text**`), no sub-lists, no `### ` headings, no numbered lists (`1. `), no bare text between sections. If it's not one of the five patterns above, it WILL NOT show up on the page and will be silently dropped. This is the #1 source of bugs in walkthrough output.

In particular: do NOT use `### ` for sub-section headings within a `## ` section. The parser does not recognise `###`. If you need to sub-divide a section, either create a new `## ` section or use a regular checklist item as a visual separator.

### Example of correct format

```markdown
# Game Title — Completionist Walkthrough

A one-line description of what this walkthrough covers.

---

## Area Name or Quest Phase

- [ ] `Main` Complete "Exact Quest Name" — brief actionable description
- [ ] `Side` "Quest Name" — speak to NPC Name in Location Name
- [ ] `Collectible` Item Name — specific location within the area

---
```

## Tag vocabulary

Tags are rendered as colored badges. Use ONLY these exact tag strings (case-sensitive):

| Tag | Use for | Colour |
|-----|---------|--------|
| `Main` | Main story/critical path quests | Yellow |
| `Side` | Notable side quests | Grey |
| `Misc` | Minor objectives, miscellaneous tasks | Grey |
| `Collectible` | Items, achievements, collectibles, upgrades | Cyan |

For game-specific quest chains (guild factions, DLC, etc.), create additional tags that make sense for that game. Keep tags at the questline-category level (e.g., `Companions`, `Thieves`, `DLC-DG`).

### Compound tags for linked side content

When a side questline spans multiple sections, use compound tags with `{Category} - {Flavour}` format to show which steps belong together. Examples:

- `Side - Ranni` — all steps in Ranni's questline across multiple regions
- `Side - Alexander` — Iron Fist Alexander's journey encounters
- `Companion - Shadowheart` — Shadowheart's personal quest steps
- `Main - Age of Stars` — main quest steps specific to one ending path

The component's `getTagColor` function automatically extracts the prefix before ` - ` and uses the parent category's colour. So `Side - Ranni` renders in the `Side` colour, `Main - Age of Stars` renders in `Main`'s yellow, etc. No code changes needed for new compound tags.

When creating a new walkthrough, list all the tags you've used and their intended meanings so the user can add colour mappings to the `tagColors` object in the component for any new base categories.

## Annotations

Inline annotations go at the end of a checklist item's description text, in parentheses:

- **Leveled rewards**: `(Leveled — best at 46: Item Name)` — when a quest reward scales with player level
- **Missable content**: `(Missable — reason why)` — when an item or quest can be permanently lost
- **Quest-locked areas**: `(Quest-locked area — details)` — when a location is only accessible during a specific quest
- **Level requirements**: `(requires level X)` — when a quest has a minimum level to start

Example:
```
- [ ] `Main` Complete "Alduin's Wall" — travel to Sky Haven Temple (Leveled — best at 46: Dragonbane katana found in the temple)
- [ ] `Collectible` Nahkriin mask — Skuldafn, guarding the portal (Missable — MUST loot before entering portal to Sovngarde)
```

## No duplicate items

A single in-game action should be a single checklist item. If completing a quest gives a reward, the quest step should mention the reward inline — do NOT also list the reward as a separate `Collectible` item. For example:

WRONG (two items for one action):
```
- [ ] `Main` Complete "The Way of the Voice" — learn Unrelenting Force from the Greybeards
- [ ] `Collectible` Paraglider — obtained from the Old Man
```

RIGHT (one item covering both):
```
- [ ] `Main` Complete "The Isolated Plateau" — speak to the Old Man and receive the Paraglider
```

Only create a separate `Collectible` item when the item is found independently (exploration loot, purchasable gear, etc.) rather than as a direct quest reward.

This also applies to quest objectives that ARE the collectible. For example, if a quest sends you to collect 13 memories at specific locations, those ARE the quest steps — list them as `Main` or `Side` items with the location, not as separate `Collectible` items alongside the quest step. Similarly, if a quest sends you to clear 4 shrines and they give you Spirit Orbs, the shrine completion IS the quest step.

## Branching endings and mutually exclusive paths

Many games have multiple endings or mutually exclusive faction/quest paths. The walkthrough must handle these clearly:

1. **Show the decision point** — include a checklist item at the moment the player must choose, with an annotation explaining the consequences
2. **Create separate sections for each branch** — use `## Ending Path — {Name}` sections (similar to how the Skyrim walkthrough has separate Imperial/Stormcloak subsections under Civil War)
3. **Use compound tags** to label branch-specific steps (e.g., `Main - Age of Stars`, `Main - Lord of Frenzied Flame`) so the player can visually track which path they're on
4. **Note what gets locked out** — when choosing one path permanently locks content from another, annotate it

Research all major endings and the exact decision points that lock them in. Do NOT just document the "default" ending path.

## Prologue and tutorial coverage

If a game has a distinct introductory sequence (e.g., BG3's Nautiloid, Elden Ring's Cave of Knowledge, Skyrim's Helgen), it must be its own section at the start of the walkthrough. Do not skip it — the prologue often contains missable items, early companion recruitment, and important story setup.

## Companion recruitment and mutual exclusivity

For games with recruitable companions/party members, the walkthrough must:

1. Show exactly when and where each companion can be recruited
2. Flag companions that are mutually exclusive (e.g., "recruiting X prevents recruiting Y")
3. Place recruitment steps at the earliest point they become available in the geographic route
4. For companion personal quests, use compound tags like `Companion - {Name}` to link steps across sections

## Intertwined questlines

Some questlines overlap and share steps. When two quests must be progressed simultaneously or visiting a location advances multiple quest chains:

- Combine them into a single checklist item with multiple tags if needed, or describe both in one item
- Do NOT split co-located quest steps across distant sections
- Research which quests share dungeons, NPCs, or areas and co-locate those steps

The goal is a walkthrough the player follows top-to-bottom without needing to jump around.

## DLC and expansion content

Every walkthrough MUST include all released DLC and expansion content. Research DLC separately — do not assume the base game quest list covers everything. Create dedicated sections for major DLC (e.g., `## Dawnguard DLC`, `## Shadow of the Erdtree`). Note when DLC becomes accessible relative to the main story progression.

## Single output file

The skill produces exactly ONE file: the markdown walkthrough at `public/docs/walkthroughs/{game-slug}.md`. Do NOT create supplementary files like README.md, TAG_REFERENCE.md, RESEARCH_SOURCES.md, or IMPLEMENTATION_NOTES.md. All necessary information goes into the walkthrough markdown itself (via inline annotations and the Completionist Notes section).

## The research process

This is the most important part. Do NOT draft walkthrough content from memory and then check it later — this leads to a skeleton full of hallucinated names that's harder to fix than starting clean.

### Step 1: Identify the game's quest structure

Use web search to find the game's quest list from authoritative wikis (UESP for Elder Scrolls, Fextralife/wikis for Souls games, game-specific wikis, etc.). Search for:

- Complete quest list by questline/faction
- Exact quest names in order for each questline
- DLC/expansion quest lists (search separately for each DLC — do not assume the base game list includes them)
- Collectible checklists (unique items, achievements, etc.)
- All recruitable companions and how/when to recruit them
- All endings and the decision points that determine them

For each search, try to reach the game's primary community wiki. If WebFetch is blocked for a domain, work from the search result snippets and cross-reference multiple sources.

### Step 2: Identify level-scaling, missable content, and mutually exclusive paths

Search specifically for:

- "Game name leveled items quest rewards" — which rewards scale with level and at what thresholds
- "Game name missable items/quests" — what can be permanently lost
- "Game name quest-locked areas cannot return" — areas with one-time access
- "Game name point of no return" — moments that lock out content
- "Game name mutually exclusive quests/companions" — choices that permanently lock out other content
- "Game name all endings guide" — how each ending is triggered and what choices lead to it

### Step 3: Plan the geographic/linear route

The walkthrough should be organised as a single recommended path through the game, not separated by questline. The philosophy is:

- Sections are named by location or progression phase (e.g., "Whiterun — First Visit", "The Reach & Markarth")
- Each step is tagged with which questline it belongs to, so the player can see at a glance what they're progressing
- Quest chains are interleaved geographically to minimise backtracking
- Guild/faction questlines may get their own "full questline" sections when they become the focus

### Step 4: Write the content

For each checklist item:

- Use the EXACT quest name from the wiki (in quotes)
- Include the relevant NPC name and location
- Add any level-scaling, missable, or quest-locked annotations
- Keep descriptions concise but specific enough to be actionable

### Step 5: Wire up the page

After creating the markdown file at `public/docs/walkthroughs/{game-slug}.md`:

1. Add the game to the `walkthroughs` array in `pages/walkthroughs/index.tsx`:
```typescript
{
  title: 'Game Title',
  description: 'Brief description of walkthrough scope.',
  href: '/walkthroughs/game-slug',
},
```

2. If the game has unique quest chain tags not already in `WalkthroughChecklist.tsx`, tell the user which tag-to-colour mappings to add to the `tagColors` object.

3. Run TypeScript and ESLint checks to verify nothing is broken.

### Step 6: Verify

After writing the walkthrough, do a verification pass:

- Search for a few specific quest names from the walkthrough to confirm they're real
- Check that the section ordering makes geographic sense
- Verify the total item count is reasonable for the game's scope
- Confirm all annotations (leveled, missable) are backed by research

## Completionist notes section

At the end of the markdown, include a `## Completionist Notes` section with important guidance that doesn't fit into individual checklist items — things like mutually exclusive quest paths, achievement requirements, DLC timing recommendations, and common pitfalls.

## Reference

See `references/skyrim-example.md` for a complete example of a finished walkthrough in the correct format. When in doubt about formatting, match this reference.
