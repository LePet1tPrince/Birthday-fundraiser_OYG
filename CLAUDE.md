# CLAUDE.md — Orange You Glad

Context for AI assistants working in this codebase.

## What we're building

A **celebration page** product — not a fundraiser. Adults create a page for their birthday (or other occasion), pick one cause, and share it with friends. Guests give directly to Orange You Glad and leave the host a note. The key differentiator is the **Celebration Recap** — a public-facing impact summary with personalized, animated stats that shows what the group achieved together.

**Core mantra:** Skip the gifts. Celebrate by supporting a cause together.

## Product decisions to preserve

- **One cause per page.** The `Campaign.impactArea` field is a single `ImpactArea`, not an array. Do not change this to multi-select — the product explicitly avoids "a catalogue of items."
- **Goal is optional.** `Campaign.goalAmount` is optional. When absent, show contributor count and total given instead of a progress bar.
- **Language.** Never use "donate/donation/fundraiser/fundraising" in UI copy. Use "give/contribution/celebration page/cause" instead.
- **The Recap is the hero.** `CelebrationRecap.tsx` is the most important UI component. It's visible to everyone (not just the host). The animated stats + personalized impact story is the product's emotional payoff.
- **Message wall over donor list.** The `DonorsList` is framed as "Notes for [host]" — messages are prominent, amounts are secondary.

## Architecture

- **State:** All state lives in `AppContext` (React context + useReducer). No backend. Mock data is seeded in `data/mockData.ts`.
- **Routing:** React Router v6. Routes are in `App.tsx`. Page components live in `src/pages/`.
- **Styling:** Tailwind CSS only. Orange/amber palette (`orange-500`, `amber-300`). No CSS modules, no styled-components.
- **Icons:** Lucide React only.
- **Types:** All shared types are in `src/types/index.ts`. Always update types there first before touching components.

## Common tasks

### Adding a new cause area

1. Add the key to `ImpactArea` union in `types/index.ts`
2. Add the rate config to `IMPACT_RATES` in `data/mockData.ts`
3. Add icon mapping to `AREA_ICONS` in `CelebrationRecap.tsx`
4. Add impact story copy to `IMPACT_STORY` in `CelebrationRecap.tsx`
5. Add icon + color mappings to `ImpactCard.tsx` and `ImpactAreaSelector.tsx`

### Adding a new occasion type

1. Add to `EventType` union in `types/index.ts`
2. Add label to `TYPE_LABELS` in `EventBanner.tsx` and `CampaignCard.tsx`
3. Add icon + label to `eventTypes` array in `CreateEventForm.tsx`

### Adding a real donation submission

Currently `DonateModal` dispatches to React context. To wire up a real payment:
- Add a payment step before the context dispatch in `DonateModal.tsx`
- The dispatch at the end creates the `Donation` record in state

## Key files

| File | What it does |
|---|---|
| `src/types/index.ts` | All shared types — start here |
| `src/data/mockData.ts` | IMPACT_RATES, sample data, helper functions |
| `src/context/AppContext.tsx` | Global state + reducer |
| `src/components/event/CelebrationRecap.tsx` | The hero recap with animated stats + impact story |
| `src/components/event/DonateModal.tsx` | Give modal — single cause, personal note |
| `src/components/event/DonorsList.tsx` | Message wall |
| `src/components/create/ImpactAreaSelector.tsx` | Single-select cause picker |

## Commands

```bash
cd vite-project
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build
npx tsc --noEmit # Type check only
```

## Risks from the product doc to keep in mind

- **Too transactional:** If the UI looks like a donation form, it will underperform. Keep the celebration framing front and center.
- **Too much choice:** Don't add more cause areas beyond 3–5. Don't make the cause selector multi-select.
- **Awkwardness:** The host messaging ("no gifts please") needs to feel socially graceful. Copy should never pressure guests.
