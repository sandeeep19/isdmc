# Lightsail deployment

Production runs on a single Lightsail instance with docker-compose behind nginx.

| | |
|---|---|
| Instance | `isdmc-prod` (us-east-1a, `small_3_0`, 2 GB RAM) |
| Static IP | `35.172.253.218` |
| App root | `/opt/isdmc` |
| SSH | `ssh -i ~/.ssh/isdmc-lightsail.pem ubuntu@35.172.253.218` |
| Cost | $12/mo instance; static IP free while attached |

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

Note this file is also tracked in git, so a `git pull` on the server would
overwrite live data. Deploys use rsync with `backend/db.sqlite3` NOT excluded,
which means a local copy would also overwrite it — exclude it explicitly once
the live data diverges from the repo.
