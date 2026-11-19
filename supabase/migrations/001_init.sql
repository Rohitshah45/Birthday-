create extension if not exists pgcrypto;
create table birthday_project(id uuid primary key default gen_random_uuid(),
 recipient_name text not null default 'Jennifer', birthday date default '2026-11-21',
 entry_question text not null default 'What''s the best date in the world?',
 answer_hash text, session_hours int not null default 24 check (session_hours between 1 and 168),
 session_epoch int not null default 1, copy jsonb not null default '{}', sections jsonb not null default '[]',
 sender_name text, production_url text, singleton boolean not null default true unique check (singleton),
 created_at timestamptz default now(), updated_at timestamptz default now());
create table media_asset(id uuid primary key default gen_random_uuid(),
 kind text not null check (kind in ('image','video','thumbnail')), bucket text not null default 'media-private',
 path text not null unique, mime_type text, size_bytes bigint, width int, height int, duration_seconds numeric,
 status text not null default 'pending' check (status in ('pending','ready','failed')),
 created_at timestamptz default now(), updated_at timestamptz default now());
create index on media_asset(kind,status);
create table memory(id uuid primary key default gen_random_uuid(),
 asset_id uuid not null references media_asset(id) on delete restrict, thumb_asset_id uuid references media_asset(id),
 caption text, memory_date date, is_favorite boolean not null default false,
 size_variant text not null default 'm' check (size_variant in ('s','m','l')),
 sort_order int not null, is_active boolean not null default true,
 created_at timestamptz default now(), updated_at timestamptz default now());
create index on memory(is_active,sort_order);
create table video_memory(id uuid primary key default gen_random_uuid(),
 asset_id uuid not null references media_asset(id) on delete restrict, poster_asset_id uuid references media_asset(id),
 title text, description text, sort_order int not null, is_active boolean not null default true,
 created_at timestamptz default now(), updated_at timestamptz default now());
create index on video_memory(is_active,sort_order);
create table message_card(id uuid primary key default gen_random_uuid(),
 kind text not null check (kind in ('chaos','flirty')), teaser text not null check (char_length(teaser)<=120),
 body text not null check (char_length(body)<=600), sort_order int not null, is_active boolean not null default true,
 created_at timestamptz default now(), updated_at timestamptz default now());
create index on message_card(kind,is_active,sort_order);
create table birthday_letter(id uuid primary key default gen_random_uuid(),
 title text, greeting text, paragraphs jsonb not null default '[]', closing text, signature text,
 singleton boolean not null default true unique check (singleton),
 created_at timestamptz default now(), updated_at timestamptz default now());
create table auth_attempt(id uuid primary key default gen_random_uuid(), bucket text not null,
 succeeded boolean not null, attempted_at timestamptz not null default now());
create index on auth_attempt(bucket, attempted_at desc);
-- RLS on, NO policies: only the server's service-role key can touch data.
alter table birthday_project enable row level security; alter table media_asset enable row level security;
alter table memory enable row level security; alter table video_memory enable row level security;
alter table message_card enable row level security; alter table birthday_letter enable row level security;
alter table auth_attempt enable row level security;
insert into birthday_project(copy) values ('{"welcome_title":"Hey Jennifer!","welcome_subtitle":"A little world made just for you.","welcome_button":"Open your surprise","birthday_title":"Happy Birthday Jennifer!","birthday_intro":"Today is all about you. Here''s a little collection of memories, smiles and surprises made especially for you.","final_opener":"Okay, enough scrolling. One last thing..."}');
insert into birthday_letter default values;
-- Then create a PRIVATE storage bucket named media-private in the Supabase dashboard.
