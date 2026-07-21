
# Estimates are a communication tool, not a deadline

Written: 30th December 2025

Estimation is a huge topic. This is a guide rather than a rulebook - you'll see quickly that there are so many unknowns and differences between pieces of work that how you estimate, and what you estimate, changes case to case.

It's written for engineers, but the principles apply to anyone delivering work. I've kept it general on purpose and avoided team-specific jargon, so it prompts thought rather than being followed as a set of rules.

> **The key principle:** estimates can never be perfect - and that's not the point. They're an educated guess used to plan. Not a hard deadline, but a way to *manage* a deadline. Being early or late on an estimate is not a failure. **Not communicating that the estimate is wrong, or that a deadline will be missed, is.**

## Why estimate at all?

Two perspectives make the point.

### Your own work

Day to day, it helps to know roughly how long something will take, so you can set an expectation of where you'll be and plan the next steps. As engineers we don't just write code - we test it, get it reviewed, run it through CI/CD, and release it. Often there's more: validating in a non-production environment, booking time with a colleague for another pair of eyes. Knowing how far through you are, and how long the next step takes, is what lets you plan all of that.

### The team

The people leading the team need a rough time frame so they can plan the week or the cycle. An initial estimate for a task is often very different from what's found once someone actually starts it.

> **If there's a significant difference, flag it as early as possible.** Plans for the week or cycle may need to change. This is one of the most important reasons estimation exists.

Stand-ups are a natural place to sanity-check your own estimate and flag a slip early.

## Techniques

You've probably met some of these:

| Technique | Example |
|-----------|---------|
| T-shirt sizing | XS, S, M, L, XL |
| Story points | Fibonacci: 1, 2, 3, 5, 8, 13 |
| Little's Law | a data-driven approach ([explainer](/blog/littles-law)) |

There are others; the aim is always the same - understand how long something will take.

The same value can mean different things to different groups. An "M" might be three days for one team and a week for another. That's fine - just understand the context of an estimate and share it when groups work together.

### What improves accuracy

Estimates go wrong for reasons you can work on. Like guessing the number of marbles in a jar, without experience you'll be wildly off. Three things sharpen it:

1. **Smaller tasks** - the smaller the task, the more accurate the estimate. Breaking a large task down is hard before you understand it, so do it as you learn more.
2. **Proximity to completion** - the closer you are, the more accurate you get. You know what's left and how long it takes.
3. **Experience** - knowing the codebase and the requirements lets you make an educated guess that's genuinely close.

## Scenarios

### When you know the code that needs to change

The simplest case - you might even know the exact file and line. Estimate from the size of the change, but still factor in the time to add tests, the CI/CD pipeline, code review, and validation.

### When you don't

Harder. You may have an idea but not certainty. Ask: front-end, back-end, or both? Do you need tests? Do you need to migrate data? Is it built on an existing system? Start breaking one XL task into smaller ones - maybe just the front end of a new feature - and the accuracy improves.

> It's fine to be wrong. Saying "I don't know, I need to look at the code / understand the requirements" is a *good* sign - it means you're taking the time to understand the problem.

### Estimating with data

Once you've completed a few tasks, you have data. If three "M" tasks took 3, 3, and 5 days, you can estimate the next "M" at about 3.7 days (the mean). It gets better when the same person or group estimates, when you have more data, and when tasks are smaller. My own preference is Little's Law.

## Summary

Estimates are planning tools, not deadlines. If your estimate changes or a deadline is at risk, tell the people leading the team as early as you can. Accuracy comes from context - knowing the codebase, understanding the requirements, and breaking work down - and it improves over time.

---

*One thing I've found: early in my career we ran hour-long estimation sessions where the whole cross-functional team went through upcoming work together and agreed rough sizes. Different people found they didn't work for them, so we stopped - but I got some of my best experience from them. I still rate them as a way to build estimation intuition, and I'm always happy to run one, one-to-one or as a group.*
