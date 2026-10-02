# Lightsail deployment

Production runs on a single Lightsail instance with docker-compose behind nginx.

| | |
|---|---|
| Instance | `isdmc-micro` (us-east-1a, `micro_3_0`, 1 GB RAM, 3 GB swap) |
| Static IP | `35.172.253.218` (attached; free while attached) |
| App root | `/opt/isdmc` |
| SSH | `ssh -i ~/.ssh/isdmc-lightsail.pem ubuntu@35.172.253.218` |
| Cost | $7/mo instance + tax; ~$8.73/mo all-in |

The 3 GB swap matters: `npm run build` will not fit in 1 GB of RAM alone.

Lightsail bills the bundle whether the instance runs or is stopped, so stopping
it saves nothing -- only deleting does. If the instance is ever deleted,
release the static IP too: free while attached, ~$3.60/mo left floating.

## Routing

nginx owns :80/:443 and mirrors what the old ALB did:

| Path | Upstream |
|---|---|
| `/api/*`, `/admin*`, `/static/*` | `backend:8000` (gunicorn) |
| `/media/*` | nginx, from the `media` volume |
| everything else | `frontend:3000` (Next.js) |

`deploy/active.conf` is the live config. It is a copy of either
`nginx.http.conf` (pre-certificate) or `nginx.ssl.conf` (after). It is
gitignored because it is generated.

## Deploy a change

```sh
rsync -az --delete \
  -e "ssh -i ~/.ssh/isdmc-lightsail.pem" \
  --exclude '.git/' --exclude '.venv/' --exclude 'venv/' \
  --exclude 'node_modules/' --exclude '.next/' --exclude '__pycache__/' \
  --exclude 'backend/.env' --exclude 'backend/.env.production' \
  --exclude 'backend/db.sqlite3' \
  ./ ubuntu@35.172.253.218:/opt/isdmc/

ssh -i ~/.ssh/isdmc-lightsail.pem ubuntu@35.172.253.218 \
  'cd /opt/isdmc && sudo docker compose -f docker-compose.prod.yml up -d --build'
```

`backend/.env.production` is excluded on purpose — it holds the SECRET_KEY and
lives only on the server.

## Certificate

Issued 2026-10-02 by Let's Encrypt for `indianstudiodmc.com` +
`www.indianstudiodmc.com`, expires 2026-12-31. Registered without an email
address, so there are no expiry warning mails -- renewal is automatic, but add
an email with `certbot update_account --email <addr>` if you want the alerts.

Issued via the certbot container using the webroot shared with nginx. The `certbot` service re-runs `certbot renew` every 12 hours, so
renewal needs no cron. `nginx.ssl.conf` keeps
`/.well-known/acme-challenge/` on :80 unredirected so renewals work.

## Database

SQLite at `/opt/isdmc/backend/db.sqlite3`, bind-mounted into the backend.
Back it up before any risky change:

```sh
ssh -i ~/.ssh/isdmc-lightsail.pem ubuntu@35.172.253.218 \
  'sudo sqlite3 /opt/isdmc/backend/db.sqlite3 ".backup /tmp/db-$(date +%F).sqlite3"'
```

This file is also tracked in git, so a `git pull` on the server would overwrite
live data. The deploy rsync above excludes it for the same reason -- production
data now lives only on the instance, and a push from a laptop would otherwise
replace it with the repo's copy.
