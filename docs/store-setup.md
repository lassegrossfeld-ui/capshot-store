# Store Setup

Capshot ist ein Shopify-OS-2.0-Theme für **eine SKU**. Den Store legst du selbst an, dann:

1. Theme hochladen oder `shopify theme push` aus diesem Ordner.
2. Produkt anlegen:
   - Handle: `capshot-matte`
   - Titel: Capshot — Die Bierschnipsen-Matte
   - Preis: **24,90 €**
   - Vergleichspreis (Streichpreis): **29,90 €**
   - Automatischer Rabatt: ab 2 Stück **21,90 € pro Matte** (3 € Nachlass je Stück). Ohne diesen Rabatt zeigt der Toggle 21,90 €, die Kasse würde sonst 24,90 € × 2 abrechnen.
   - Bilder aus `assets/` in dieser Reihenfolge hochladen: packshot, dimensions, kitchen, biergarten, closeup, 2v2, rolled, gift
3. Theme-Einstellungen: Capshot-Produkt auswählen.
4. Seiten: `regeln` (Template `page.regeln`), `kontakt` (Template `page.contact`).
5. Policies: Impressum, AGB, Datenschutz, Widerruf, Versand — Texte in `docs/legal-vorlagen.md`.
6. Versand: DE 0 €. Payments: PayPal, Klarna, Karte, Shop Pay.
7. Domain verbinden. 18+ nur als Footer-Hinweis, kein Age-Gate.
