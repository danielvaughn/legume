---
title: Three years at Acme Instruments
summary: What I actually did behind the bullet points.
date: 2024-11-02
order: 1
---

Acme builds measurement hardware, and I joined to help the software catch up
with it. This post demonstrates most of the Markdown features the template
supports.

## What the work looked like

The team was four engineers. We owned everything from the firmware update
service to the customer dashboard.

### A typical quarter

- One infrastructure project
- One customer-facing feature
- A steady stream of support escalations

1. Plan it
2. Ship it
3. Write it down

> The best measurement device is the one whose software you never think
> about.

Inline code like `SELECT * FROM readings` renders in a highlighted span, and
fenced blocks get full syntax highlighting:

```python
def rolling_mean(values, window=5):
    out = []
    for i in range(len(values)):
        chunk = values[max(0, i - window + 1) : i + 1]
        out.append(sum(chunk) / len(chunk))
    return out
```

Images live in `content/images/` and are referenced by relative path. An
emphasized line directly after an image becomes its caption:

![a workbench with an oscilloscope](../images/workbench.png)
*The bench where most of the debugging actually happened.*

External [links](https://example.com) work the way you'd expect.
