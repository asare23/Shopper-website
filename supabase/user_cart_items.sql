create table if not exists public.user_cart_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  quantity integer not null default 1 check (quantity > 0),
  product jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

alter table public.user_cart_items enable row level security;

create policy "Users can view their own cart"
  on public.user_cart_items for select
  using (auth.uid() = user_id);

create policy "Users can add to their own cart"
  on public.user_cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cart"
  on public.user_cart_items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own cart"
  on public.user_cart_items for delete
  using (auth.uid() = user_id);