# Supabase Phase 1

The public website reads the `branches` table through Supabase's REST API using the supplied publishable key.

## Required branch columns

The loader supports these columns:

- `branch_name` (or `name`)
- `address` (or `location` / `city`)
- `map_url`
- `phone`
- `email`
- `timings`
- `active` (optional; rows set to `false` are hidden)
- `display_order` (optional)

## RLS policy

For the public website to load branches, enable a read-only `SELECT` policy for active branch rows. Do not expose any secret/service-role key in this static site.
