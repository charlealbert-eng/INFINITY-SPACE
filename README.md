# INFINITY SPACE — Mission de survie sur Mars

Simulateur éducatif (FR/EN, dès 7 ans avec le mode « Lili ») : 10 sols pour gérer eau, oxygène, énergie, nourriture et radiation dans le cratère Jezero. Site statique, sans serveur.

## Structure
- `index.html` — écrans (accueil, histoire, mission, résultats, modales)
- `css/` — `style.css` (interface), `kid.css` (mode enfants)
- `js/missions-data.js` — missions FR/EN ; `main.js` — état, langue, sauvegarde, DONKI ; `simulation.js` / `mission.js` — décisions et résultats
- `js/kids*.js`, `voix-textes.js` — mode enfants (Lili, cœurs, chrono, jouets)
- `js/map3d.js`, `background.js`, `rover.js` — carte 3D, fond, photos Perseverance
- `js/nasa-cache.js` — clé NASA configurable + cache de secours ; `js/extras.js` — bouton chrono ON/OFF + hors-ligne
- `sw.js`, `manifest.webmanifest` — PWA (jouable hors-ligne après une première visite)
- `assets/voix/` — mp3 optionnels de Lili (liste dans `LISTE-DES-PHRASES.txt`) ; sinon synthèse vocale du navigateur

## Clé NASA (recommandé)
Clé gratuite sur https://api.nasa.gov, puis dans la console du navigateur :
`localStorage.setItem("infinity_nasa_key","VOTRE_CLE")`

## Déploiement GitHub Pages
Déposer tout le dossier à la racine du dépôt, puis Settings → Pages → Branch: main / (root).
