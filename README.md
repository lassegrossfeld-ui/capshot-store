# Capshot Store V1

Shopify-OS-2.0-Theme für die Capshot-Bierschnipsen-Matte (38 × 106 cm, 24,90 €).

## Preview ohne Shopify

Statische Vorschau (inkl. Regeln): `preview/regeln.html` — oder [preview/index.html](preview/index.html).

Lokal mit Server: `python3 -m http.server 8080` → `http://localhost:8080/preview/`

## Shopify Store verbinden

**Der Shop ist nicht automatisch verbunden.** Anleitung Schritt für Schritt:

→ **[docs/shopify-connect.md](docs/shopify-connect.md)** (Login, `theme dev`, `theme push`)

Kurz:

```bash
npm install --prefix .shopify-cli
npm run auth:login
npm run theme:dev -- --store DEIN-SHOP.myshopify.com
```

## Shop einrichten (Produkt, Seiten, Steuern)

Siehe [docs/store-setup.md](docs/store-setup.md).
