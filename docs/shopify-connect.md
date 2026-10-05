# Shopify Store verbinden

Das Theme liegt lokal im Repo. **Ohne Verbindung zu einem Shop** siehst du nur die statische Vorschau unter `preview/` — keine Live-URL, keine Admin-Seiten wie `/pages/regeln`.

Die Shopify CLI ist im Projekt unter `.shopify-cli/` bereits als Dependency eingetragen. Du brauchst **keinen** globalen `shopify`-Install, nur Node.js auf dem Mac.

## Voraussetzungen

- Ein Shopify-Shop (Admin-Zugang als Inhaber oder Mitarbeiter mit Theme-Rechten)
- Die Shop-URL: `dein-shop.myshopify.com`
- **Node.js 22+** für die Shopify CLI (dein System hatte v20 — nutze `npm run …`, das bindet die Node-22 aus `.shopify/` ein, oder `nvm use` mit `.nvmrc`)

## 1. CLI installieren (einmalig pro Rechner)

Im **Projektroot** (`capshot-store-main`):

```bash
npm install --prefix .shopify-cli
```

Optional prüfen:

```bash
npm run shopify -- version
```

## 2. Mit dem Shop anmelden

```bash
npm run auth:login
```

- Im Browser bei Shopify einloggen
- Den **richtigen Shop** auswählen und Zugriff bestätigen

Falls die CLI meckert wegen alter Config:

```bash
rm -rf ~/Library/Preferences/shopify-cli-theme-conf-nodejs
npm run auth:login
```

## 3. Theme lokal mit Live-Daten testen

```bash
npm run theme:dev -- --store dein-shop.myshopify.com
```

- Öffnet eine Vorschau-URL (Tunnel) mit deinem echten Shop-Kontext
- Änderungen an Liquid/CSS syncen in die Dev-Theme-Kopie

Beim ersten Mal fragt die CLI nach dem Store, wenn du `--store` weglässt:

```bash
npm run theme:dev
```

## 4. Theme in den Shop hochladen

**Unveröffentlichte Kopie** (sicher zum Testen):

```bash
npm run theme:push -- --store dein-shop.myshopify.com --unpublished
```

**Direkt live** (nur wenn du das willst):

```bash
npm run theme:push -- --store dein-shop.myshopify.com --live
```

Themes auflisten:

```bash
npm run theme:list -- --store dein-shop.myshopify.com
```

## 5. Nach dem Push: Seite „Regeln“

Im Shopify Admin:

1. **Online Store → Pages → Add page**
2. Titel: z. B. **Capshot Regeln**
3. Handle: **`regeln`**
4. Theme template: **`regeln`**
5. Speichern → `https://dein-shop.com/pages/regeln`

Weitere Schritte (Produkt, Rechtstexte): [store-setup.md](./store-setup.md)

## Ohne Shopify (nur Design/Regeln prüfen)

| Was | Wo |
|-----|-----|
| Startseite | `preview/index.html` |
| Produkt | `preview/capshot.html` |
| **Regeln** | `preview/regeln.html` |

Im Projektroot z. B.:

```bash
python3 -m http.server 8080
```

Dann im Browser: `http://localhost:8080/preview/regeln.html`

## Typische Probleme

| Symptom | Lösung |
|---------|--------|
| `shopify: command not found` | Im Projektroot `npm run theme:dev` nutzen, nicht globales `shopify` |
| Kein Shop in der Liste | `npm run auth:login` erneut, anderen Browser-Account prüfen |
| 403 / keine Theme-Rechte | Im Admin Rolle mit **Themes bearbeiten** |
| Regeln-Seite leer / Standard-Layout | Seite muss Template **`regeln`** haben, nicht „page“ |

## Noch kein Shop?

1. [Shopify Partner](https://partners.shopify.com) → **Development store** anlegen (kostenlos zum Testen), oder
2. Bestehenden Merchant-Shop nutzen, zu dem du eingeladen bist.

Danach ab Schritt 2 oben.
