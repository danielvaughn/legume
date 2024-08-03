In the leadup to our first customer deployment,
we realized that we need a simple way to track and alert on system availability,
as this was one of the conditions in our SLA.
To keep it simple and not over-engineer,
we decided to define uptime as successful responses from the most critical 10 endpoints of our system.
If those endpoints responded, then the rest of the system should be fine.

We wanted to use synthetic monitoring for this task as it most closely approximated the user perception of availability.
That is, issuing a request against our system from our own UI.
We also wanted to define our tests in code, as we were using IAC/Terraform for the rest of our infrastructure.

We decided to go with [Checkly](https://www.checklyhq.com),
which provides what they call "monitoring as code."
I built the initial version,
as well as a CD process in CircleCI to automatically deploy any changes to our uptime tests.
I also added Slack alerts for both our staging and production instances so that we would be notified of any risk to uptime prior to deploying.

As soon as we deployed this monitoring setup,
we began noticing all sorts of issues pop up that we didn't know about prior.
We were able to respond to and resolve somewhere around 5-7 critical issues that would have affected our customers had we not caught them.
