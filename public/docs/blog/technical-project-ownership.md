
# What it actually means to own a project

Written: 14th May 2024

Most engineers are handed work. Owning a project is different: the outcome is yours from the first fuzzy idea to the day it's running in production and behaving as expected - and for a while after that. This is how I think about that responsibility.

A note on what this is: not a checklist, and not "the one true process." Every team does the mechanics differently. What follows is the *essence* of the responsibility - the thinking that stays the same whether the project is two pull requests or a quarter-long objective with several workstreams.

> **The whole thing in two sentences:** The project is yours from start to finish. You don't have to personally do everything - you have to make sure everything gets done, work with others to do it, and keep everyone informed of progress.

---

## Part 1: Understanding

As the technical owner you'll usually inherit the work in an incomplete form. It might be a company goal, something that fell out of a technical conversation (tackling tech debt), or just an idea.

The first job is to understand what you know and what you don't - the discovery phase. Gather everything available from the people who already hold context and from existing documentation. Talk to your product manager so you're certain you understand the requirements.

Where there are many unknowns, do the investigation. This usually means gathering requirements for the change. Think *product first* - start from the need, not from jumping straight into building. Find out **why** you're doing the thing, then work out how best to do it.

At this point you probably know more about the project than anyone else, and people will start treating you as the expert. That's exactly why getting the problem right here matters so much.

> This might be a ten-minute back-and-forth with one person, or it might take several meetings. It scales with the size of the project.

## Part 2: Get some feedback

By now you should have a good understanding of what you plan to do. Share it with your team, and with any other team the plan might affect.

For anything large enough to be a significant piece of work, write an RFC (request for comments) - a short document setting out the plan, both technically and in terms of delivery.

Share your findings widely. Ideally you're not working alone: knowledge silos are a risk, and you want understanding spread across the team. Get feedback from everyone with a stake in the work. Don't assume others share your understanding of either the problem or your intended solution.

You'll get questions and comments, and for a big project there may be several rounds. The point of this work is to surface concerns and catch anything you missed in discovery. Effort spent planning here pays off later, where the cost of change is far higher. **Changing a plan early means rewriting part of the plan. Changing it once code exists can have significant knock-on effects and force large rewrites.**

It often helps to do this in a meeting: walk the team through the problem, the *why*, what you've learned, and how you intend to solve it. If anything is still unclear - including things raised in feedback - keep asking questions until it isn't. And as you go, note which documentation you should start or update.

> None of this is licence to go slowly. Move as fast as you can. Don't wait for people to come to you - it's your project, so go and chase them.

## Part 3: Break it down

Everyone's on board and you know what needs doing. Now split the work into manageable chunks.

Create whatever tracking artefact your team uses to represent the work, no matter what tool your team (Jira/Shortcut/Trello/post-it notes) uses this generally means creating tickets or stories that make up the contents of the work. Make sure ownership is unambiguous: a clear description, the owning team, you as the owner, the goal it ladders up to, and a start date. Link the documents you've produced (or are building from) so the tracker becomes the single source of truth - leadership and the team should be able to see the state of the work without hunting through your team's documentation.

> Why bother, when the detail already lives in docs? Because your tracker is what everyone else filters and reports on. If the work isn't represented there, it's invisible in roadmaps and planning, and context gets lost.

Beyond that, how you break work down is largely preference. Aim for small, complete, shippable slices. For a full-stack feature that might be:

- data model and types
- fixtures
- API
- UI

Split further if any of those is large - for example, breaking the UI into separate slices per screen area or component.

For sizing, pick a technique that gives you a feel for complexity:

- **T-shirt sizes** - small / medium / large. Anything bigger should be split.
- **Fibonacci points** - 1 / 2 / 3 / 5 / 8. Anything bigger than an 8 should be split.

Make sure every unit of work contains everything needed to complete it: requirements, links, and any dependencies.

> This is an art, not a science. Start doing it and it gets easier. You'll create some items and then realise they aren't needed - that's fine, explain why and drop them. It evolves.

## Part 4: Setting deadlines… maybe… sometimes

With the work broken down you can make a reasonable first guess at a delivery date. If there's a hard deadline, this matters a lot: it tells you early whether you need to change the work or the team to get the essential parts done. The earlier you have an estimate, the better you can manage expectations. Note the wording - you're setting an **estimate, not a deadline.**

There are many ways to estimate. One I like is Little's Law (queuing theory): using averages from historical data, you can work out roughly how long a single item takes to go from idea to release. It holds up surprisingly well provided items are broken down into broadly similar sizes by the same group over time.

Once you have a rough estimate, discuss it with your product manager and team:

1. Make clear it's an estimate.
2. If there's a hard deadline and your estimate runs past it, raise that now - then you can talk about cutting scope or changing the team.
3. Set the target dates on your tracking.

You've now set an expectation for delivery. The estimate sharpens as the work progresses, so revisit it regularly - weekly is sensible - and keep discussing the timeline with your team.

## Part 5: We can do this

You're ready to go. Work can be picked up from the backlog you've built, and you can delegate sensibly. For complex or widely-shared pieces - setting up data models, types, fixtures - it's often worth pairing.

Make sure everyone working on this knows where the documentation lives and updates it as they go.

Keep returning to the timeline as the project moves. If an item is blocked and can't be worked, the project stalls and the estimate slips. Make sure you and the team surface blockers as they arise; if the person on the work can't clear a blocker, your product manager or engineering manager can help.

## Part 6: Validation

Code is merging - but merged isn't done. You want to release in deliverable chunks, and before anything reaches production and affects real users it needs to work. That's validation.

When something's ready to release, follow your validation process (it varies by team and by the kind of work). Every unit of work should carry its own validation steps so it's clear what "checked" means. Work with your product manager, engineering manager, or tech lead to make sure it's validated properly.

If something fails validation, capture the needed changes. If the failure is broad rather than local, consider a separate fixes item so nothing gets lost. Once fixed, re-run validation on the original.

Keep documentation current.

## Part 7: Launch

Fully validated, it's ready to launch. Tell the team - you might even do the "go live" together.

If the launch needs an app-store release, expect a few days' delay while Apple and Google review it. Making sure the release happens is your responsibility; you can delegate the doing, but not the accountability.

Update the documentation with anything missing or changed - a good moment to write a non-technical summary for the wider team. Once it's live for users, tell the stakeholders who'll be affected, usually with a short post in a shared channel. Share that documentation you've kept current.

## Part 8: We are checking

You might think that's it. It isn't. Validated and launched doesn't mean finished - now it's **your job to watch the project in production.** Keep an eye on your monitoring and analytics (error tracking, logs, product analytics) to confirm everything is integrating and being used as expected.

How long depends on scope. A small, frequently-used change might need a couple of days. An overarching change might need two weeks or more. Make a reasonable call.

That's it - you're done. 🎉

---

*Written from my own approach to leading technical delivery. Tools and ceremonies vary team to team; the ownership doesn't.*
