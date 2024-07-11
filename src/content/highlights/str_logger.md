---
id: str_logger
user: danielvaughn
title: Built a structured logger to improve incident response and resolution
job_title: Senior DX Engineer
job_id: dx_eng_nem
company: NextEra Mobility
---

We were on GKE (Google Kubernetes Engine), and by default it doesn't parse json logs into structured output.
The problem was that you really want structured logs when you're working in a distributed system.
Another problem was that GCP was piping all of our logs through `stderr`,
making it impossible to distinguish between errors/warnings/logs.

I tried using Google's structured logging module for Python,
but we needed more customization than it was offering.
So I stripped it apart and rebuilt it into a smaller,
more flexible version that provided exactly what we needed.

This module wrapped the default python logger and added a special set of kvars for appending k/v pairs to a json object.
It also provided a means for configuring the logger with default k/v pairs,
which we used to automatically append service-wide information.

This work significantly reduced the time it took for developers to trace and diagnose incidents.
