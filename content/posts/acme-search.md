---
title: Rebuilding product search
summary: From a 900ms median to 80ms, one bad query plan at a time.
date: 2024-03-18
---

Search was the most-used feature in the dashboard and the slowest. The
median query took nearly a second; the p95 was worse than four.

The fix was unglamorous: we profiled the query planner, added two partial
indexes, denormalized one hot join, and moved highlighting from the database
to the client. Median latency landed at 80ms.

The lesson I keep relearning: measure first, and distrust any fix you can't
explain to a teammate in two sentences.
