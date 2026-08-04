---
title: Fieldnotes, an offline-first notebook
summary: The side project that taught me sync is the hard part.
date: 2023-08-11
---

Fieldnotes is a small note-taking app that assumes the network is down. Notes
live in plain files, sync when a connection appears, and merge without
drama — most of the time.

Building it taught me more about conflict resolution than any job has. The
repository is public if you want to read the sync engine; start with
`merge.ts` and work outward.
