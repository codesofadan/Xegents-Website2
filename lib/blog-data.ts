export interface BlogPost {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  featured?: boolean
  image: string
  body: string   // raw prose — rendered as paragraphs split on \n\n
  sections: { heading: string; body: string }[]
}

export const posts: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // POST 1 — Case Study: Real Estate
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "how-we-saved-real-estate-agency-18-hours-week",
    category: "Case Study",
    title: "How We Saved a Real Estate Agency 18 Hours Per Agent Per Week",
    excerpt:
      "A 6-agent agency was losing $340K/year to manual admin. Here's exactly what we automated, in what order, and what it cost them.",
    date: "Dec 2024",
    readTime: "8 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=85&fit=crop&crop=center",
    body: "When the agency founder first spoke to us, she framed it as a software problem: her CRM wasn't syncing with her document tool, and her agents were copying and pasting the same data across four systems, every day, for every deal.\n\nWe told her it wasn't a software problem. It was a process problem — and the software mismatch was making it visible.\n\nSix agents, each spending roughly three hours a day on administrative work. At a fully-loaded cost of $65/hour per agent, that's $340K/year in salary going to tasks that produce no revenue. Tasks like reformatting listing data, chasing e-signature statuses, manually updating pipeline stages, and sending templated follow-up emails that anyone with a calendar could write.",
    sections: [
      {
        heading: "Week 1–2: Mapping Where the Time Actually Goes",
        body: "We didn't start with tools. We started with a spreadsheet and a stopwatch.\n\nFor two weeks, every agent tracked every task in 15-minute blocks. Not what they thought they were doing — what they were actually doing. There's a consistent 30–40% gap between the two.\n\nThe results were ugly, in the best way. Forty-one percent of agent time across the team was going to five specific tasks: pipeline status updates (manual, done twice daily), document collection follow-ups (templated emails sent by hand), CRM data entry after client calls, proposal formatting, and deal summary reports for the principal.\n\nNone of these tasks required a licensed real estate agent. All of them were eating licensed real estate agent time."
      },
      {
        heading: "The Automation Stack We Built",
        body: "We didn't recommend a new CRM. We automated around the one they had.\n\nFirst: document processing. Contracts and listing agreements hit a shared inbox, an AI reads them, extracts the 14 key data fields the team actually needs (address, price, deadlines, parties, contingencies), and pushes them into the CRM — automatically, with a human review flag if confidence is below 94%.\n\nSecond: pipeline automation. Every deal stage change triggers a pre-built sequence — the right email to the right party at the right time. The agents approved the templates once; the system runs them forever.\n\nThird: call-to-CRM. After every client call, agents record a 90-second voice note on their phone. AI transcribes it, extracts action items and deal updates, and writes the CRM note. The agent reviews it in 10 seconds and hits confirm.\n\nFourth: reporting. The principal's weekly deal summary, which took an agent 2 hours to compile every Friday, is now generated automatically from live CRM data every Friday at 7am."
      },
      {
        heading: "The Results After 90 Days",
        body: "Admin time per agent went from 3.1 hours/day to 42 minutes/day. That's 18 hours per agent per week returned to selling.\n\nIn Q4 — their busiest quarter — the team closed 31% more deals without adding a single hire. Revenue per agent was up 28%. The principal told us the bigger win was intangible: her best agents stopped talking about leaving.\n\nTotal cost of the engagement: a fraction of the $340K annual bleed. The system paid for itself in the first 6 weeks."
      },
      {
        heading: "What We'd Do Differently",
        body: "We over-engineered the document processing pipeline on the first pass. We built for edge cases that almost never happened, which added 3 weeks to deployment. A simpler initial version, trained only on the most common contract types, would have been live in half the time and covered 92% of the volume.\n\nThe lesson: ship the 80% solution, measure what falls through the cracks, then build the edge cases with real data. Don't build for hypothetical exceptions."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // POST 2 — Process: The AI Audit
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "the-ai-audit-what-we-look-for-in-week-one",
    category: "Process",
    title: "The AI Audit: What We Actually Look For in Week One",
    excerpt:
      "Most consultants interview people and write reports. We shadow workflows and time tasks. The difference is about $200K in findings.",
    date: "Nov 2024",
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&fit=crop&crop=center",
    body: "We get asked a version of this question constantly: \"How do you know where to start?\"\n\nThe honest answer is: we don't walk in knowing. We walk in with a method for finding out. And the method involves doing something most consultants actively avoid — following people around while they work, watching what actually happens instead of asking what they think happens.\n\nThe gap between those two things is consistently where the money is.",
    sections: [
      {
        heading: "Why Interviews Lie (and Not on Purpose)",
        body: "When you ask someone to describe their job, they describe it as they understand it — which is the clean, idealized version. The version where the process runs smoothly. They don't mention the three-step workaround they built six months ago because the software doesn't do X. They don't mention that they always re-check Sarah's work before it goes out because Sarah makes a specific type of mistake. They don't mention the Friday afternoon manual export because the weekly report doesn't pull data correctly.\n\nThose workarounds, those shadow processes, those compensations for broken tools — that's where the automation opportunities live. And they never show up in interviews."
      },
      {
        heading: "What We Actually Do in Week One",
        body: "We embed. Not office-visit embed — Slack embed, call embed, screen-share embed. We ask to be on the daily standup for the week. We ask operations leads to walk us through what they're actually doing right now, not what the process document says.\n\nFor every recurring task we find, we answer four questions: How long does it take? How often does it happen? What happens if it's wrong? What does it touch next? That's your prioritization matrix.\n\nHigh frequency + high time cost + low error tolerance + feeds many downstream processes = automate first. Low frequency + low stakes = ignore for now.\n\nWe built SEO-AUDIT-OS for a client using exactly this method. The 'audit report' the team was spending 2-3 weeks producing manually was feeding 4 downstream processes. Automate the audit, and the downstream work largely automates itself."
      },
      {
        heading: "The Numbers We Find (And What They Mean)",
        body: "The average business we audit has 6–9 prime automation candidates in the first week of observation. We rank them by a simple formula: (hours/week × fully-loaded cost/hour) × 52 weeks. That's your annual bleed per process.\n\nThe median finding is $180K–$240K in annualized cost on just the top three candidates. That number surprises people every time, because no one's ever added it up before.\n\nWe show them the math. Then we show them what each automation costs to build. Then we ask them which order makes sense."
      },
      {
        heading: "The Deliverable at the End of Week One",
        body: "We don't write a 40-page report. We produce an AI Opportunity Map: a one-page ranked list of every automation candidate we found, with four columns — process name, annual cost, estimated build cost, and payback period.\n\nThe shortest payback period we've ever produced: 11 days. The average is 6–10 weeks.\n\nFrom there, the client decides what to build. We take the top two or three, sequence them by dependency (some automations unlock other automations), and start building."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // POST 3 — Strategy: Why AI Chatbots Fail
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "why-your-ai-chatbot-failed",
    category: "Strategy",
    title: "Why Your AI Chatbot Failed (And What to Build Instead)",
    excerpt:
      "Generic chatbots trained on your website don't work. Here's the architecture of an AI agent that actually takes actions inside your business.",
    date: "Nov 2024",
    readTime: "7 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=85&fit=crop&crop=center",
    body: "Most companies that have tried AI and concluded \"it doesn't work\" tried an AI chatbot trained on their website or their FAQ document.\n\nThat's not a fair test. It's the equivalent of judging electric cars by riding a golf cart. The thing you tested isn't the thing you think you tested.\n\nHere's what those chatbots actually are: a language model with read access to text documents. That's it. They can answer questions about what's in the documents. They can't do anything.",
    sections: [
      {
        heading: "The Core Problem: Chatbots Are Readers, Not Workers",
        body: "A chatbot trained on your website can tell a customer what your return policy is. It cannot initiate the return. It cannot check the order status. It cannot trigger the refund. It cannot update the CRM to note that the customer requested a return.\n\nSo what happens? The customer asks the chatbot, the chatbot tells them to contact support, the customer contacts support, support manually does all the things the chatbot couldn't do. Your team just answered a question twice.\n\nThat's not automation. That's an extra step dressed up as technology."
      },
      {
        heading: "What an AI Agent Actually Is",
        body: "An AI agent has the same language understanding as a chatbot, but it also has tools. Specifically: the ability to call APIs, read databases, write to systems, trigger workflows, and chain actions together based on outcomes.\n\nFor an e-commerce business: an AI agent can check the order status, confirm it's within the return window, initiate the return label in your shipping software, send the customer the label, log the interaction in your CRM, and flag the item for quality review if the return reason is 'defective' — all in response to one message, without a human touching it.\n\nWe built exactly this architecture for a DTC client. Their support team was handling 4,000+ tickets per month. After deployment, the agent handles 78% of them autonomously. The support team now handles the 22% that require judgment."
      },
      {
        heading: "The Architecture of an Agent That Works",
        body: "A production-ready AI agent has four components:\n\n1. A language model as the reasoning layer — it understands intent, decides what to do, and generates human-sounding responses. We use Claude for reasoning tasks and GPT-4o for classification tasks.\n\n2. A tool layer — a set of defined functions the agent can call: check_order_status(), initiate_return(), send_email(), update_crm(). These are API wrappers around your actual systems.\n\n3. Memory — a record of the conversation and any relevant customer context pulled from your CRM at the start of the session.\n\n4. Escalation logic — clear rules for when the agent stops and a human takes over. Always include this. Agents should escalate on anger signals, complex disputes, and any situation where the agent's confidence in the right action is below a threshold.\n\nThe last point is the one most builders skip. Don't skip it."
      },
      {
        heading: "How Long It Takes to Build",
        body: "A scoped, production-ready AI agent for a specific workflow — say, e-commerce returns — takes 3–5 weeks. Faster if the underlying APIs are well-documented and accessible. Slower if you're working around legacy systems with no API layer.\n\nThe ROI is faster than people expect. On the DTC client above, the agent paid for the build cost in 8 weeks of salary savings. That's a permanent 78% reduction in support headcount requirements."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // POST 4 — Technical: n8n vs Make vs Zapier
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "n8n-vs-make-vs-zapier-which-for-which-job",
    category: "Technical",
    title: "n8n vs Make vs Zapier — Which Tool for Which Job",
    excerpt:
      "We've built automations on all three. Here's a decision framework based on complexity, data volume, and team technical level.",
    date: "Oct 2024",
    readTime: "5 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85&fit=crop&crop=center",
    body: "We get this question from almost every new client. Usually the context is: they've tried one of these tools, hit a wall, and want to know if the problem is the tool or the workflow.\n\nSometimes it's the tool. Most of the time it's both. And the answer is almost never \"use a different tool\" — it's \"redesign the workflow to match the tool's strengths.\"",
    sections: [
      {
        heading: "Zapier: For Teams That Don't Think in Code",
        body: "Zapier's strength is its editorial quality — everything works, everything is documented, the trigger/action model is so clean that a non-technical founder can ship a working automation in 30 minutes.\n\nUse it for: simple two-step workflows (new form submission → CRM contact created), lightweight notification chains, connecting SaaS tools that both have native Zapier integrations.\n\nHit its wall when: you need conditional branching beyond 2–3 levels, you're processing large volumes (Zapier gets expensive fast above ~10K tasks/month), you need to transform or reshape data in non-trivial ways, or you need custom code that does anything complex.\n\nWe use Zapier for client onboarding automations that touch widely-used tools (Notion, Gmail, HubSpot, Slack). The no-code interface means clients can modify their own automations without calling us."
      },
      {
        heading: "Make (formerly Integromat): For Complex Flows on a Budget",
        body: "Make's canvas UI is its killer feature — you see the entire automation as a visual graph. For workflows with branching, looping, error handling, and multiple data transformations, this visual model makes complex logic legible.\n\nUse it for: multi-step workflows with branching logic, data transformation pipelines (parsing, reformatting, aggregating), automations that loop over arrays of data, workflows where you need to see the full picture.\n\nHit its wall when: you need version control, you need complex programmatic logic, or you need to run the automation on your own infrastructure for compliance reasons.\n\nFor our lead generation system, we used Make to handle the multi-branch outreach sequencing. The visual canvas made it possible to QA the logic at a glance — critical when you're automating outbound emails and mistakes are visible to prospects."
      },
      {
        heading: "n8n: For Teams with a Developer on the Floor",
        body: "n8n is what you reach for when Make and Zapier aren't powerful enough — or when you need to own your infrastructure. It's self-hostable, open-source, and has a JavaScript code node that lets you write arbitrary logic inline with the automation flow.\n\nUse it for: high-volume workflows where per-task pricing would be prohibitive, custom integrations with APIs that don't have native connectors, automations requiring complex data transformation or conditional logic, AI-augmented workflows (n8n's LangChain integration is excellent), and any workflow where data sovereignty matters.\n\nHit its wall when: your team has no technical capacity for setup and maintenance, or the automation is simple enough that n8n's power is overkill.\n\nOur SEO-AUDIT-OS used n8n for the orchestration layer. The combination of its HTTP request node, JavaScript code node, and LangChain integration let us build the full 660-check pipeline without needing separate services for each component."
      },
      {
        heading: "The Decision Framework",
        body: "One question narrows it down fast: does anyone on your team know JavaScript or Python?\n\nNo → Zapier for simple, Make for complex.\nYes, but no infrastructure capacity → Make.\nYes, and you want to self-host → n8n.\n\nSecond question: what's your task volume per month?\nUnder 5K → Zapier's pricing is fine.\n5K–50K → Make is significantly cheaper.\nOver 50K → n8n on self-hosted is almost free.\n\nWe've standardized on Make for client projects where the client needs to maintain the automations themselves. We use n8n for our own infrastructure and for clients whose ops team has a technical person."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // POST 5 — Strategy: The 28% Problem
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "the-28-percent-inefficiency-problem",
    category: "Strategy",
    title: "The 28% Problem: Why Most Companies Waste Nearly a Third of Their Operations Budget",
    excerpt:
      "Every dollar you invest in operations, 28 cents disappears into friction, manual handoffs, and processes nobody's touched in years.",
    date: "Oct 2024",
    readTime: "9 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&fit=crop&crop=center",
    body: "There's a McKinsey figure that gets cited often enough in consulting circles that it's almost become background noise: the average company wastes 20–30% of its operational budget on inefficiency. We use 28% as our working number because it's consistent with what we actually see when we audit businesses.\n\nBut the number matters less than what's hiding behind it. Because 28% isn't going to one place. It's distributed across dozens of micro-inefficiencies — each one invisible, each one normalized, each one assumed to be \"just how this works.\"",
    sections: [
      {
        heading: "The Three Categories of Operational Waste",
        body: "When we map where the 28% is going, it consistently falls into three buckets:\n\nBucket 1: Rework. Tasks that have to be done more than once because they were done wrong, or because the output of the first attempt wasn't in the right format for whatever comes next. CRM data entered in one format that gets exported and reformatted by the analyst who receives it. Email threads that replicate information already in the ticketing system. Forms filled out by customers that get typed into a database by a human. Rework is rarely flagged as a problem because the person doing it doesn't know there was a first pass.\n\nBucket 2: Waiting. Approval chains. Handoffs. Processes that require human judgment to proceed, where that judgment is unavailable — so the process sits. We tracked one client's proposal process end-to-end and found that out of 11 working days average time to delivery, 3.5 days was pure waiting. Nothing being done. Work paused, pending a response that needed to come from someone who was also paused, pending something else.\n\nBucket 3: Over-processing. Doing more work than the output requires. The report that has 12 data points when 4 are actually read. The QA checklist with 80 items when experience has established that 12 of them catch 95% of errors. The onboarding process that was designed for a complexity level the company had 4 years ago and never updated. Over-processing is the hardest waste to surface because the people doing the extra work genuinely believe it's necessary."
      },
      {
        heading: "Why This Doesn't Get Fixed Without Intervention",
        body: "The insidious thing about operational waste is that it's self-concealing. The people inside the process can't see it — they're living it. Their mental model of the process is the process. The workaround they built became the process. The manual step they added when the software broke and never removed is now assumed to be intentional.\n\nLeadership doesn't see it either, because the reports they get are summaries of outcomes, not maps of the work that produced them. Revenue is up, costs seem reasonable, projects are generally shipping. The 28% is invisible in the income statement because it's hiding inside salary costs and overhead that look normal.\n\nThe only way to surface it is to watch the work — not review it, watch it. Follow the process from trigger to output. Time every step. Map every handoff. Ask \"why is this step here?\" and accept \"I don't know, it's always been here\" as a finding, not an explanation."
      },
      {
        heading: "What AI Actually Fixes (and What It Doesn't)",
        body: "AI is genuinely transformative for Bucket 1 (rework) and Bucket 2 (waiting). Document processing, data extraction, format conversion, automated handoffs, intelligent routing — all of these directly attack rework and waiting. They're also well-understood engineering problems with measurable outcomes.\n\nBucket 3 (over-processing) is trickier. AI can speed up over-processed work, but it doesn't eliminate the underlying redundancy. For that, you need process redesign — a human decision to stop doing the unnecessary thing. AI won't make that decision for you.\n\nThe businesses that get the most from AI are the ones that do the process redesign first, then automate the refined process. Not the ones that automate the current process and hope the inefficiency becomes fast enough that it doesn't matter."
      },
      {
        heading: "The Number That Should Motivate You",
        body: "For a company with $2M in annual operating costs, 28% is $560K/year. That's not a number you find with an audit — it's a number you manufacture with one.\n\nThe typical Xegents engagement recovers 15–22% of that number in the first 90 days through targeted automation of the highest-yield processes. That's $84K–$123K in annualized savings, on a base case. Higher in companies where the waste is concentrated in expensive-to-run processes (manual billing, manual data entry, manual reporting).\n\nThe question isn't whether the waste is there. It's always there. The question is whether the cost of finding and fixing it is less than the cost of leaving it alone. In every business we've audited, it has been."
      }
    ]
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
