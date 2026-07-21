
# Little's Law: estimating delivery without estimating every task

Written: 30th December 2025

Little's Law comes from queuing theory and was proven by John Little in 1961. It's a simple but powerful relationship between three variables in any stable system — and it's genuinely useful for predicting how long software work will take.

## The formula

```math
L = λ × W
```

Where:

- **L** = average number of items in the system (work in progress)
- **λ** (lambda) = average throughput (items completed per time period)
- **W** = average time an item spends in the system (cycle time)

Rearranged to find cycle time:

```math
W = L / λ
```

In words: **average cycle time = work in progress ÷ throughput.**

## Why it matters for estimation

You can use historical data to predict how long future work will take. If you know how many items are typically in progress and how many you complete per week, you can work out the average time for any item to move through the system.

The beauty of it is that it holds regardless of:

- the order items are worked on
- the distribution of item sizes
- how items arrive into the system

## Example

Say your team has:

- 6 items in progress on average (L)
- completes 3 items per week (λ)

Average cycle time: **W = 6 / 3 = 2 weeks.**

Want to halve cycle time to one week? You have two levers: reduce work in progress to 3 items, or increase throughput to 6 per week. (In practice, reducing WIP is usually the easier and healthier of the two.)

## Key assumptions

For it to work well:

1. **The system is stable** — items arrive and leave at roughly the same rate over time.
2. **Items are broken into similar sizes** — the same group tends to break work down consistently.
3. **You have enough data** — more data points, more accurate predictions.

## Practical application

Rather than estimating individual tasks, you can:

1. track how many items are in progress at any time
2. track how many you complete per week
3. use the formula to predict delivery times

This removes the need for detailed upfront estimation and lets the data speak for itself.

---

*A companion to my note on [estimation](/blog/estimates-and-deadlines).*
