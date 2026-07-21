
# Designing a bug process that closes the loop

Written: 1st April 2026

Most bug processes fail in the same two places: reports scatter across DMs, spreadsheets and half a dozen channels, and once a bug *is* logged the reporter never hears anything again. I set out to fix both - one place to report, and a loop that actually closes back to the person who reported it. Then I automated the middle so it ran itself.

## Principle 1: one intake, one format

Every bug goes through a single channel, using a structured submission form. If someone reports a bug any other way - a DM, another channel - you redirect them to the one place. This sounds bureaucratic; it's the opposite. A single, structured intake is what makes everything downstream - triage, deduplication, routing, reporting - possible at all.

The form asks for a small, deliberate set of fields:

| Field | Why it's there |
|-------|----------------|
| **Product area** | The single most valuable field - it's what lets you later spot which areas generate the most bugs. |
| **What's not working?** | The problem, described concretely. |
| **How should it work?** | The expected behaviour - the gap between these two is the bug. |
| **Affected user / account IDs** | Usually the difference between an investigatable bug and a dead end. |
| **Number of reports / importance** | Reporter's signal - not used for automated decisions, but it surfaces things that have been open too long. |
| **Additional info, screenshots** | Context that speeds up investigation. |

One rule worth stating explicitly: **one bug per submission.** Multiple issues in one report can't be tracked or routed independently.

## Principle 2: triage should deduplicate, not just collect

A report arrives and the pipeline:

- **checks it's not a duplicate** of something already logged - and if it is, merges the new detail (extra reporters, IDs, screenshots) into the existing item rather than creating a second one
- **checks it has enough information** to investigate, and asks the reporter for what's missing if not
- **routes it to the right team** by matching the product area and description against a documented ownership map
- **creates a tracked ticket** with the full detail, on the owning team's board
- **notifies team leads** that a new issue has been raised in their ownership domain

For genuinely ambiguous ownership, it flags for a human rather than guessing.

The deduplication matters more than it looks. It means you can tell people: *report it even if you think someone already has.* Nothing is lost to a merge, so no one stays silent - and you get a truer picture of how often something is really happening.

## Principle 3: close the loop

When the triage and assignment pipeline is complete, another pipeline begins to assess the current status of all previously triaged reports. The pipeline:

- **checks if the bug has been resolved** by checking the current state of the thread and looking for completion or resolution indicators, if it has then the pipeline moves onto the next report as there is nothing left to do
- **checks it's status** against the live status of the tracked ticket on the owning team's board
- **updates the report thread** with the current status if the status has changed since the previous check
- **notifies the reporter** if the issue has been resolved

Once a bug is logged, the reporter should not have to go hunting through a tracker to find out what happened to it. Status flows back to them where they reported it: acknowledged, triaged, routed to a team, ticket created - and, as it progresses, being investigated, fix in progress, done.

The reporter never has to leave the place they started. That's what turns a reporting form into a process people actually trust and keep using.

This closes the loop.

## Automating the whole thing

I built the pipeline that runs all of the above automatically. It reads new reports, triages and deduplicates them, routes them to the owning team, opens tracked tickets, and posts status back to the reporter - using the report's own comment thread as the state store, so the system stays stateless and there's a single, auditable record per bug. The entire pipeline was built using Slack workflows, Claude, and a number of MCP tools into our team resources.

Some design decisions worth calling out:

- **Threads as state.** Rather than a separate database, each report's thread *is* its state. It's simple, transparent, and self-healing - the source of truth is the same place humans are already looking.
- **Conservative by default.** When the automation isn't confident - an ambiguous duplicate, an unclear owner - it defers to a human instead of acting. Being wrong quietly is worse than asking.
- **Staged rollout.** It started running on a schedule with a human monitoring output, before moving toward real-time processing. Automating a judgement-heavy workflow is something you earn trust in gradually, not something you flip on at full confidence.

Results: `110 reports processed`, `8.2% - dedupe rate`, `92% - ownership assignment (8% unowned and asked for assistance)`.

## What I'd do next

The process is a starting point, and the roadmap says as much about the thinking as the process does:

- **Real-time triage** - move from a schedule to processing each report the moment it arrives.
- ✅ Complete: **Status updates in-thread** - post progress automatically as the ticket moves, so reporters never check the tracker. 
- **Weekly quality reports** - visibility on bugs reported, triaged, open per team, average time-to-fix, and which product areas generate the most - the data that turns firefighting into root-cause work.
- ✅ Complete: **Resolution notifications** - tell the reporter, where they reported, when their bug is fixed.
- ✅ Complete: **Direct team-lead notifications** - so nothing slips because a tracker notification was missed.

---

*Written from a bug process and automation I designed and shipped. The principles - single intake, deduplicating triage, and a closed loop back to the reporter - transfer to any team; the automation is what made them cheap enough to hold to.*
