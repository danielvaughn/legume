---
id: deployment_latency
user: danielvaughn
title: Reduced deployment latency from 45 min to 10 min
job_title: Senior DX Engineer
job_id: dx_eng_nem
company: NextEra Mobility
---

We used CircleCI for our deployments,
and since we had a distributed backend with lots of workloads,
deploying was a complex web of automated & manual jobs.

The main deployment workflow processed several jobs in sequence,
and each of them required a common set of tools.
Their installation was part of the workflow for a couple of reasons:

1. The required toolset was subject to change
2. Various jobs ran on different images, so they needed to be installed separately

Over time this caused the latency to gradually rise,
and once we began to see 40+ minute waittimes for deployments,
we knew something had to be done.

My solution was to create a new, minimal base Docker image using Docker buildx,
which allowed for defining multi-platform images.
This image allowed us to (a) have an image with the tools pre-installed,
and (b) were configured separately for each Linux distro we targeted.

The result was that completely eliminated the need to perform an install multiple times throughout our deployment workflow,
reducing the average latency from 45 minutes to about 10 minutes.
