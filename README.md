# Chatterie de la Grâce — Outil de contrats

Application web professionnelle pour la gestion des contrats et documents officiels de la **Chatterie de la Grâce**.

## Fonctionnalités

- **3 contrats prêts à l'emploi** : attestation de cession, réservation retraité d'élevage, contrat d'élevage.
- **Auto-sauvegarde** locale : tous les champs sont conservés dans le navigateur, par contrat.
- **Logo personnalisé** : glisser-déposer ou import d'une image — réinjectée dans tous les PDF.
- **Signature manuscrite** : pad tactile / souris, conservée par contrat.
- **Export PDF vectoriel** (pdfmake) : texte sélectionnable, qualité d'impression, ~80–150 ko.
- **PWA installable** : Android, iOS (via *Ajouter à l'écran d'accueil*), Windows/macOS.
- **Hors-ligne** : service worker, l'application fonctionne sans connexion.

## Stack

- HTML/CSS/JavaScript vanilla — aucune étape de build.
- [pdfmake](https://pdfmake.github.io/) pour la génération de PDF vectoriels.
- Service worker + Web App Manifest pour le mode installable.
- Hébergement statique sur Vercel.

## Structure

```
.
├── index.html       # squelette de l'application
├── styles.css       # style premium (palette rose de la marque)
├── app.js           # logique métier + génération PDF
├── manifest.json    # manifeste PWA
├── sw.js            # service worker (cache offline)
├── vercel.json      # en-têtes de cache + sécurité
└── icons/           # icônes PWA (192, 512, maskable, favicon, apple)
```

## Personnalisation

Les informations de l'éleveur (nom, adresse, SIRET, téléphone, email) sont définies en haut de `app.js` dans la constante `BREEDER`. Les contrats sont déclaratifs dans la constante `CONTRACTS` du même fichier.

## Données

Toutes les données (champs, signatures, logo) restent **dans le navigateur** (localStorage). Aucun envoi serveur.

---

© Chatterie de la Grâce
