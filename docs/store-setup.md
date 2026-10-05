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
4. Seiten anlegen:
   - **Regeln:** Titel z. B. „Capshot Regeln“, Handle `regeln`, Template **`regeln`** (`page.regeln` — Inhalt kommt aus dem Theme, kein Rich-Text nötig).
   - **Kontakt:** Handle `kontakt`, Template `contact`.
   - **Community:** Handle `community`, Template **`community`** (Inhalt aus dem Theme, kein Rich-Text nötig).
   - Startseite und Produktseite verlinken automatisch auf `/pages/regeln` (Teaser + Nav).
5. Rechtstexte: Seiten `impressum`, `datenschutz`, `agb`, `widerruf`, `versand` anlegen und jeweils das Template `page.legal` zuweisen. Der Text kommt aus dem Theme und wechselt mit der Flagge im Header. Dieselben deutschen Texte zusätzlich unter Einstellungen → Richtlinien einfügen, damit der Checkout sie anzeigt.
6. Sprache: Deutsch ist die Standardsprache. Unter Einstellungen → Sprachen einmal **Englisch** hinzufügen und veröffentlichen. Das Dropdown im Header schaltet dann zwischen Deutsch und English. Ohne den Sprach-Schritt bleibt der Shop auf Deutsch. Es gibt kein Kundenkonto im Shop.
7. Steuern: Kleinunternehmer nach § 19 UStG. In Shopify für Deutschland keine Umsatzsteuer erheben. Preise bleiben Endpreise ohne MwSt.-Ausweis. USt-IdNr. DE462531783 nur im Impressum, nicht als Steuerausweis im Checkout.
8. Versand: DE 0 €. Payments: PayPal, Klarna, Karte, Shop Pay.
9. Domain verbinden. 18+ nur als Footer-Hinweis, kein Age-Gate.
