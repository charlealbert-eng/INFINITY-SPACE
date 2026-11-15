# INFINITY SPACE — Mission de Survie sur Mars

Simulateur éducatif interactif de gestion d'avant-poste martien sur **10 Sols**, conçu avec une architecture modulaire légère et sans latence pour **GitHub Pages**.

## Structure du projet

- `index.html` : Structure de l'application (Écran d'accueil, Poste de commandement épuré, Écran de résultats instantanés, Modales).
- `style.css` : Design system tactique (bleu ardoise, vert menthe, orange solaire) optimisé pour ordinateurs portables et mobiles.
- `missions-data.js` : Base de données complète en **Français (par défaut)** et **Anglais**, intégrant les 10 jours de mission et les références scientifiques réelles.
- `map3d.js` : carte 3D de Mars (NASA/USGS Viking) avec sites d'intérêt FR/EN.
- `rover.js` : **NASA Mars Rover Photos API** — chaque jour de mission affiche les vraies photos du rover Perseverance au même sol (Jezero). Clé gratuite : api.nasa.gov (remplacer `DEMO_KEY`).
- `main.js` : Moteur principal gérant la persistance de la langue (`localStorage`), l'exécution instantanée des décisions, le rendu de la station et la télémétrie NASA DONKI.

## Ressources scientifiques intégrées

- **NASA Mars Rover Photos API** (photos réelles de Perseverance)
- **NASA Open APIs** (`api.nasa.gov`) & **DONKI** (éruptions solaires de classes M et X)
- **NASA RadLab** (débits de dose de radiation en mSv/sol sur Mars)
- **NASA OSDR Bio** (radiobiologie et santé des astronautes)
- **NASA Mars Trek** (topographie du Cratère Jezero)
- **Agence Spatiale Canadienne (ASC-CSA)** (*Food Production Toolkit* : hydroponie en circuit fermé et recyclage de l'eau)

## Déploiement sur GitHub Pages

1. Créez un nouveau dépôt sur GitHub (ex. `infinity-space`).
2. Importez les fichiers `index.html`, `style.css`, `missions-data.js`, `main.js` et `README.md` à la racine du dépôt.
3. Allez dans **Settings → Pages → Build and deployment → Branch: main / (root)** et cliquez sur **Save**.
