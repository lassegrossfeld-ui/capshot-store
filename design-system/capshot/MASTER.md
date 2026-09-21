# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/capshot/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Capshot
**Generated:** 2026-09-16
**Category:** E-commerce — single SKU drinking-game mat
**Override note:** Generator greens/oranges replaced with print tokens (magenta / yellow / black).

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#D946EF` | `--color-primary` |
| On Primary | `#0A0A0A` | `--color-on-primary` |
| Secondary | `#C026D3` | `--color-secondary` |
| On Secondary | `#FFFFFF` | `--color-on-secondary` |
| Accent/CTA | `#F5C518` | `--color-accent` |
| On Accent/CTA | `#0A0A0A` | `--color-on-accent` |
| Background | `#0A0A0A` | `--color-background` |
| Foreground | `#FFFFFF` | `--color-foreground` |
| Card | `#111111` | `--color-card` |
| Card Foreground | `#FFFFFF` | `--color-card-foreground` |
| Muted | `#1A1A1A` | `--color-muted` |
| Muted Foreground | `#C4C4C4` | `--color-muted-foreground` |
| Border | `rgba(217,70,239,0.35)` | `--color-border` |
| Destructive | `#EF4444` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` |
| Ring | `#F5C518` | `--color-ring` |

**Color Notes:** Neon court on black. Yellow is the only primary CTA fill. Magenta is brand/hover/lines. Never use generator green/orange.

### Typography

- **Heading Font:** Fredoka
- **Body Font:** Nunito
- **Mood:** rounded, playful, party — matches the Capshot wordmark on the mat
- **Google Fonts:** [Fredoka + Nunito](https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight gaps |
| `--space-sm` | `8px` | Icon gaps |
| `--space-md` | `16px` | Standard padding |
| `--space-lg` | `24px` | Card padding |
| `--space-xl` | `32px` | Large gaps |
| `--space-2xl` | `48px` | Section margins |
| `--space-3xl` | `64px` | Hero padding |

### Buttons

```css
.btn-primary {
  background: #F5C518;
  color: #0A0A0A;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  min-height: 44px;
  cursor: pointer;
  transition: background 200ms ease, transform 200ms ease;
}
.btn-primary:hover { background: #D946EF; color: #0A0A0A; }
.btn-primary:focus-visible { outline: 2px solid #F5C518; outline-offset: 3px; }
```

### Style Guidelines

**Style:** Vibrant & Block-based, dark neon court
**Pattern:** QR-Pong single-product landing (not feature-card grid)
**Section order:** Announcement > Header > Hero > Trust > Buy > How it works > Size > Social > Specs > FAQ > Footer
**CTA:** One primary per screen — `Hol dir dein Capshot`
**Motion:** 150–300ms, transform/opacity only, respect `prefers-reduced-motion`

### Anti-Patterns

- No emojis as icons (inline SVG only)
- No white Shopify-default shell
- No fake 100k player counts
- No Leberschuss field names
- No layout-shifting hovers
- Contrast body text 4.5:1 on black
- Touch targets ≥ 44px
