# Orange You Glad — Celebrate with Purpose

A celebration page product for adults who want to say "no gifts please" and invite friends to support a shared cause instead.

> **Core promise:** Skip the gifts. Celebrate by supporting a cause together.

---

## What This Is

Orange You Glad is **not a fundraiser**. It's a celebration page with giving built in. The framing matters — if it looks and feels like a donation form, it underperforms. The goal is social grace, not charity guilt.

Hosts create a page for their birthday (or other milestone), pick one cause, write a personal message, and share the link. Guests give directly to Orange You Glad and leave the host a note. Everyone can see the shared impact grow in real time.

## The Recap

The centerpiece of the product is the **Celebration Recap** — visible to everyone, not just the host. It shows:

- Total given by the group
- Number of people who celebrated
- Tangible, personalized impact (e.g. "Emma's birthday provided clean water to 25 people")
- A message wall of everyone's notes

This is the "payoff" moment — what we did together.

---

## Running Locally

```bash
cd vite-project
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## Project Structure

```
vite-project/
└── src/
    ├── components/
    │   ├── create/          # Page creation form + cause selector
    │   ├── event/           # Event page: banner, recap, message wall, give modal
    │   ├── impact/          # Impact dashboard (secondary)
    │   ├── landing/         # Home page sections
    │   ├── layout/          # Navbar + Footer
    │   └── shared/          # Reusable: ProgressBar, AnimatedCounter, Modal, ImpactCard
    ├── context/             # AppContext (global state via useReducer)
    ├── data/
    │   └── mockData.ts      # Sample campaigns, donations, impact rates + helper functions
    ├── hooks/
    │   └── useAppContext.ts
    ├── pages/               # Route-level components
    └── types/
        └── index.ts         # All shared TypeScript types
```

### Key pages

| Route | Page | Purpose |
|---|---|---|
| `/` | LandingPage | Hero, how it works, active celebrations |
| `/create` | CreateEventPage | Form to create a new celebration page |
| `/event/:id` | EventPage | The celebration page itself — give CTA, recap, message wall |
| `/impact` | ImpactDashboardPage | Org-wide impact (secondary) |

### Key data types

```ts
interface Campaign {
  id: string;
  eventType: 'birthday' | 'anniversary' | 'memorial' | 'other';
  name: string;
  hostName: string;
  date: string;
  goalAmount?: number;      // Optional — not all hosts set a goal
  message: string;
  impactArea: ImpactArea;   // Single cause (not a list)
  createdAt: string;
}

interface Donation {
  id: string;
  campaignId: string;
  donorName: string;
  amount: number;
  message: string;          // The note left for the host
  createdAt: string;
}
```

---

## Tech Stack

- **Vite + React 18** — fast dev experience
- **TypeScript** — strict types throughout
- **Tailwind CSS** — utility-first styling, orange/amber color palette
- **React Router v6** — client-side routing
- **Lucide React** — icons
- **No backend** — state lives in React context, seeded with mock data

---

## Cause Areas (MVP)

| Key | Label | Cost per unit |
|---|---|---|
| `water` | Clean Water | $25/person |
| `education` | Education | $30/child/month |
| `health` | Healthcare | $20/treatment |
| `emergency` | Emergency Relief | $15/kit |

---

## Design Principles

- **Celebration-first, not charity-first.** Every copy choice should reinforce that this is a party, not a pledge drive.
- **One cause per page.** Too much choice hurts setup and conversion.
- **The recap is the product.** The impact summary — visible to all — is the emotional payoff of the whole experience.
- **Group momentum, not a fundraising ticker.** Emphasize participation and shared action over a dollar progress bar.
