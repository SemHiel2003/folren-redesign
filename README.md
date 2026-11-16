# Folren — redesign-demo voor Kevin

Nieuw ontwerp van [folrenstudio.com](https://folrenstudio.com/), de site van Kevin (maker van Folren).

**Live:** https://kevin.hiel.digital (sinds 16 november 2026, noindex)

## Let op bij de inhoud

- Alle teksten, prijzen, beelden en video's komen van folrenstudio.com, stand 16 november 2026. Verandert Kevin daar iets (bijvoorbeeld de Black Friday-actie), dan moet het hier ook: de teksten staan in `src/lib/content.ts`.
- Privacy en Terms zijn één-op-één overgenomen in `src/content/legal.ts`.
- Er is geen inlogpagina nagebouwd. "Log in" verwijst naar `https://folrenstudio.com/login/`; "Join on Skool" naar de Skool-groep van Folren.
- De demo "Watch a Short get made" is een vereenvoudigde versie van de animatie op de huidige site, met dezelfde echte gegevens (script, shots, staptijden).
- In de footer staat "Redesign concept by Hiel Digital".

## Techniek

- Next.js 16 (App Router) als **statische export** (`output: "export"`), Tailwind CSS 4, Motion, Radix Accordion, lucide-react.
- Lettertypen: Geist en Geist Mono. Kleuren staan als variabelen bovenaan `src/app/globals.css`.
- Pagina's: `/`, `/pricing/`, `/privacy/`, `/terms/` en een 404.

### 21st.dev-onderdelen

Opgehaald via 21st.dev en aangepast aan de huisstijl:

- **Header 1** (efferd): sticky header met blur en mobiel menu → `components/site/header.tsx`
- **Text Cycle** (wensity): wisselende woorden in de hero → `components/ui/text-cycle.tsx`
- **Feature Grid Spotlight Cards** (Hirael): kaarten met muisgloed en maatkruisjes → `components/site/spotlight-card.tsx`
- **Single Plan Pricing Card** (ln-dev7) met **Border Beam** (Magic UI) → prijskaart in `components/site/sections.tsx`
- **FAQ Two Column** (Hirael) → FAQ in `components/site/sections.tsx`

## Lokaal

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # schrijft de statische site naar out/
```

## Deploy (Hiel Digital hosting)

- **Server:** Hetzner, SSH-host `hetzner-hosting`, CloudPanel en nginx. Site-gebruiker `kevin`, map `/home/kevin/htdocs/kevin.hiel.digital/`.
- **DNS:** Cloudflare, proxied A-record `kevin` naar de server (token in `~/.config/cloudflare/hiel-digital-token`).
- **Certificaat:** Let's Encrypt via `clpctl lets-encrypt:install:certificate --domainName=kevin.hiel.digital`.
- **nginx:** de vhost heeft `X-Robots-Tag: noindex, nofollow`, `Cache-Control: no-cache` op HTML, een jaar cache op `/_next/static/` (bestandsnamen met hash), één uur op overige media, `try_files` en `error_page 404 /404.html`. De oorspronkelijke vhost staat in `/root/kevin.hiel.digital.conf.orig`. Het SFTP-wachtwoord is niet opgeslagen.

### Update uitrollen

```sh
npm run build
COPYFILE_DISABLE=1 tar --no-mac-metadata --no-xattrs -czf - -C out . | ssh hetzner-hosting \
  'R=/home/kevin/htdocs/kevin.hiel.digital; rm -rf $R/* && tar -xzf - -C $R && chown -R kevin:kevin $R'
```

Beelden en video's in `public/media/` houden dezelfde naam; Cloudflare en browsers bewaren die tot een uur.
