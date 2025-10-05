# Save-on-Waste ♻️
A web app that redistributes surplus food from restaurants and grocers to local charities. Donors post available food with pickup windows and locations; verified charities claim (lock) listings so pickups don’t collide. Built with Next.js App Router, Supabase Auth/DB, and a Leaflet map powered by OpenStreetMap tiles.

## ✨ Features
- Interactive map: browse live surplus food pins with pickup details.
- Auth & roles: Supabase Auth with SSR and role-based dashboards.
- Create & manage listings (donors).
- Claim/lock system (charities) prevents double booking.
- Route protection via Next.js middleware.
- Theming with Tailwind + shadcn/ui + MUI 7 (Emotion).
- Deploy-ready for Vercel with Supabase integration.

## 🧱 Tech Stack
Next.js, React 19, Tailwind CSS, shadcn/ui, Material UI v7, Emotion, Supabase (Postgres), Leaflet 1.9, React-Leaflet 5, OpenStreetMap API, TypeScript 5, ESLint 9, Turbopack, Vercel

## 🚀 Quick Start
1. Clone & install
```bash
git clone https://github.com/mkk100/save-on-waste.git
cd save-on-waste
npm install
```

2. Create `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run
```bash
npm run dev
```

## 🗃️ Suggested DB Schema
```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('donor','charity')) not null,
  org_name text,
  created_at timestamptz default now()
);

create table listings (
  id bigserial primary key,
  owner uuid not null references profiles(id) on delete cascade,
  title text not null,
  description text,
  quantity integer default 1,
  status text check (status in ('available','claimed')) default 'available',
  claimed_by uuid references profiles(id),
  lat double precision,
  lng double precision,
  created_at timestamptz default now()
);
```

## ☁️ Deployment
Deploy on **Vercel** and link your **Supabase** project for seamless SSR auth and DB integration.

