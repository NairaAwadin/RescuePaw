# PROMPT COPILOT — Refonte Design Rescue Paw

---

## Rôle

Tu es un UI/UX Designer Senior spécialisé React/Tailwind. Tu dois revoir le design et les couleurs de TOUTE l'application Rescue Paw (plateforme d'adoption animale et d'analyse du bien-être territorial). Tu ne touches PAS à la logique métier, à l'API client, au routing, ni aux données. Tu retravailles uniquement : les classes Tailwind, l'agencement des composants (layout/grid/flex), les espacements, la typographie, et la palette de couleurs dans `index.css`.

---

## Direction Artistique : « Canard Colvert »

### Palette de couleurs (à remplacer dans `src/index.css` dans le bloc `@theme`)

```
VERT CANARD (Primaire — confiance, nature) :
  50:  #E8F0EC    100: #C2D8CB    400: #6B9E82
  600: #2B6B4F    800: #1A4233    900: #0F2A20

TAUPE (Texte & neutralité — plumage du corps) :
  50:  #F0ECE6    100: #D9D1C7    400: #A89A8B
  600: #7A6F63    800: #4E463E    900: #302B26

BEIGE PLUME (Backgrounds & surfaces — ventre clair) :
  50:  #FBF8F3    100: #F0E8DA    200: #DDD0BB
  300: #C4B59C    500: #9E8E74    700: #6B5D4A

AMBRE BEC (Accent / CTA — bec et pattes orangées) :
  50:  #FDF2E4    100: #F5D9AA    400: #E8AA4C
  600: #C47A1E    800: #8B5A1E    900: #5A3810
```

### Mapping des couleurs

| Usage | Couleur |
|---|---|
| Background page | Beige 50 `#FBF8F3` |
| Surface cartes / cards | `#FFFFFF` avec bordure Beige 200 `#DDD0BB` à 40% opacité |
| Texte principal | Taupe 800 `#4E463E` |
| Texte secondaire | Taupe 600 `#7A6F63` |
| Texte muted / placeholders | Taupe 400 `#A89A8B` |
| Bordures | Beige 200 `#DDD0BB` |
| Boutons primaires | Vert 600 `#2B6B4F` → hover Vert 800 `#1A4233` |
| Boutons CTA adoption | Ambre 400 `#E8AA4C` → hover Ambre 600 `#C47A1E`, texte Ambre 900 |
| Boutons outline | Bordure Taupe 100, texte Taupe 800, hover bg Beige 100 |
| Boutons ghost | Texte Taupe 600, hover bg Beige 50 |
| Badges score positif | Fond Vert 50, texte Vert 800 |
| Badges score négatif | Fond Ambre 50, texte Ambre 800 |
| Badges statut "Signalé" | Fond Taupe 50, texte Taupe 600 |
| Badges statut "Pris en charge" | Fond Ambre 50, texte Ambre 800 |
| Badges statut "Adoptable" | Fond Vert 50, texte Vert 800 |
| Navbar | `#FFFFFF` à 80% opacité + backdrop-blur |
| Navbar lien actif | Fond Vert 50, texte Vert 800 |
| Score gauge (cercle SVG) | A=#2B6B4F, B=#6B9E82, C=#E8AA4C, D=#C47A1E, E=#C0392B |
| Charts (signalements) | Ambre 400 `#E8AA4C` |
| Charts (adoptions) | Vert 600 `#2B6B4F` |
| Doughnut (chiens) | Vert 600 `#2B6B4F` |
| Doughnut (chats) | Ambre 400 `#E8AA4C` |
| Sidebar dashboard | Fond blanc, bordure Beige 200 |
| Inputs focus ring | Vert 100 `#C2D8CB` avec border Vert 400 |

---

## Typographie

- Police : **Plus Jakarta Sans** (déjà importée dans `index.html`)
- Titres h1 : `text-3xl sm:text-4xl font-extrabold tracking-tight` — couleur Taupe 900
- Titres h2 : `text-2xl font-bold` — couleur Taupe 900
- Titres h3 (cartes) : `text-base font-bold` — couleur Taupe 800
- Corps : `text-sm` — couleur Taupe 800
- Labels / muted : `text-xs font-medium` — couleur Taupe 400
- Uppercase labels : `text-[11px] font-semibold uppercase tracking-wider` — couleur Taupe 400
- JAMAIS de noir pur (`#000`). Le plus foncé est Taupe 900 `#302B26`.

---

## Formes & Ombres

- Cartes : `rounded-2xl` (pas de rounded-3xl, on reste sobre)
- Ombres cartes : `shadow-[0_1px_3px_rgba(78,70,62,0.04),0_1px_2px_rgba(78,70,62,0.03)]`
- Ombres hover : `shadow-[0_4px_12px_rgba(78,70,62,0.06),0_2px_4px_rgba(78,70,62,0.04)]`
- Inputs : `rounded-xl` avec bordure Beige 200, fond Beige 50
- Boutons : `rounded-xl`
- Badges : `rounded-full`
- Icônes : Lucide React, `strokeWidth={1.5}`, taille 16-20px selon contexte

---

## Principes d'Agencement (CRITIQUE)

### Whitespace & Respiration
- L'espace est l'élément de design #1. En cas de doute, AJOUTE de l'espace.
- Padding intérieur des cartes : minimum `p-6` (24px)
- Gap entre cartes en grille : `gap-5` (20px) minimum
- Sections entre elles : `pb-20` (80px)
- Le hero doit avoir `pt-36 pb-20` pour laisser respirer le titre
- Jamais plus de 3 colonnes sur les grilles de cartes animaux

### Hiérarchie Visuelle
- Chaque écran a UNE SEULE action principale. Cette action utilise le bouton CTA Ambre.
- Tout le reste est en variant `outline` ou `ghost`.
- La typographie crée la hiérarchie, pas les bordures ni les couleurs.
- Les titres de section ont un `mb-2` suivi d'un sous-titre en Taupe 600, puis `mb-10` avant le contenu.

### Équilibre Émotion / Data
- Pages ADOPTION (quiz, matching, profil animal) : arrondis généreux (`rounded-2xl`), photos grandes, espacement large, couleurs chaudes (Ambre pour les CTA). L'utilisateur doit ressentir de la chaleur et de la confiance.
- Pages ANALYTIQUES (dashboard observatoire, wellbeing card) : arrondis plus contenus (`rounded-xl`), données structurées, peu de couleur saturée, beaucoup de Taupe et Beige. Sobre et scientifique.
- NE JAMAIS mélanger les deux styles sur un même écran.

---

## Anti-patterns (NE FAIS JAMAIS ÇA)

- ❌ Dégradés, effets néon, ombres portées lourdes
- ❌ Bordures colorées vives (pas de `border-green-500`)
- ❌ Dashboard style SaaS/fintech (pas de sidebar sombre, pas de KPI cards trop denses)
- ❌ Trop de badges/tags sur une même carte (max 3)
- ❌ Animations d'entrée (pas de fade-in, pas de slide-up au chargement)
- ❌ Icônes décoratives sans fonction
- ❌ Texte centré sur plus de 2 lignes (sauf hero)
- ❌ Plus de 2 couleurs saturées visibles en même temps sur un écran
- ❌ Noir pur (`#000000`) où que ce soit

---

## Motion

- Hover sur les cartes : `transition-all duration-300 ease-in-out hover:-translate-y-0.5`
- Hover sur les boutons : `transition-all duration-200`
- Barre de progression quiz : `transition-all duration-500 ease-out`
- Le mouvement doit TOUJOURS signifier un changement d'état (sélection, hover, ouverture)
- Le mouvement ne doit JAMAIS être décoratif (pas de bounce, pas de pulse, pas de wiggle)

---

## Composants à revoir — Guide par fichier

### `src/index.css`
Remplacer toute la palette `@theme` avec les couleurs Canard Colvert ci-dessus. Renommer les tokens :
- `--color-forest-*` → `--color-canard-*` (vert canard)
- `--color-sage-*` → supprimer (remplacé par taupe)
- `--color-terra-*` → `--color-ambre-*` (accent ambre bec)
- `--color-cream` → `--color-beige-50` (#FBF8F3)
- `--color-anthracite` → `--color-taupe-900` (#302B26)
- `--color-text-primary` → Taupe 800 (#4E463E)
- `--color-text-secondary` → Taupe 600 (#7A6F63)
- `--color-text-muted` → Taupe 400 (#A89A8B)
- `--color-border` → Beige 200 (#DDD0BB)

### `src/components/ui/Button.jsx`
Adapter les variants `primary`, `secondary`, `outline`, `ghost` avec les nouvelles couleurs.

### `src/components/ui/Card.jsx`
Bordure `border-beige-200/40`, ombre revue avec les tons Taupe.

### `src/components/ui/Badge.jsx`
Pas de changement structurel, les couleurs changent via les parents.

### `src/components/ui/ScoreGauge.jsx`
Mettre à jour le `colorMap` : A=#2B6B4F, B=#6B9E82, C=#E8AA4C, D=#C47A1E, E=#C0392B.

### `src/components/layout/Navbar.jsx`
- Logo : fond Vert 600, texte "Rescue" en Taupe 900, "Paw" en Vert 600
- Lien actif : fond Vert 50, texte Vert 800
- CTA "Créer un compte" : variant secondary (Ambre)

### `src/components/home/HeroSearch.jsx`
- Le pattern de points en fond doit utiliser Vert 600 `#2B6B4F` à 3% opacité
- Le badge tagline : fond Vert 50, texte Vert 800
- Le titre : "empreinte animale" en Vert 600
- Le CTA "Trouver mon compagnon" : Ambre 400

### `src/components/home/WellbeingCard.jsx`
- Infra items : fond Beige 100, icônes en Vert 400
- Facteurs : badges en Beige 100, texte Taupe 600
- Risque élevé : texte Ambre 600

### `src/components/quiz/ConsentStep.jsx` & `QuestionStep.jsx`
- Option sélectionnée : bordure Vert 600, fond Vert 50, icône fond Vert 600
- Option non sélectionnée : bordure Beige 200, fond blanc, icône fond Beige 100
- Barre de progression : fond Beige 100, remplissage Vert 600

### `src/components/matching/AnimalCard.jsx`
- Badge match score : utiliser `getMatchColor()` mis à jour
- Bouton like actif : fond Ambre 400
- CTA "Découvrir son histoire" : fond Vert 50 → hover Vert 600 + texte blanc
- Photo hover : `group-hover:scale-105` sur 500ms

### `src/components/matching/AnimalProfile.jsx`
- Score match : fond et texte selon `getMatchColor()` mis à jour
- Traits : icônes en Taupe 400
- CTA "Contacter le refuge" : Ambre 400

### `src/components/signalement/SignalementForm.jsx`
- Type "Trouvé" : bordure Ambre 400, fond Ambre 50
- Type "Abandon" : bordure Vert 400, fond Vert 50
- Espèce sélectionnée : bordure Vert 600, fond Vert 50
- Inputs : fond Beige 50, bordure Beige 200

### `src/components/dashboard/` (tous)
- KPI icon container : fond Vert 50, icône Vert 600
- KPI variation positive : fond Vert 50, texte Vert 600
- KPI variation négative : fond Ambre 50, texte Ambre 600
- Charts : Ambre pour signalements, Vert pour adoptions
- Sidebar active : fond Vert 50, texte Vert 800
- Sidebar logout hover : fond rouge-50, texte rouge

### `src/pages/LoginPage.jsx` & `RegisterPage.jsx`
- Logo : fond Vert 600
- Inputs : fond Beige 50, bordure Beige 200, focus ring Vert 100
- CTA : Vert 600
- Lien "Créer un compte" : texte Vert 600

### `src/pages/ProfilePage.jsx`
- Avatar container : fond Vert 50, icône Vert 600
- Badge Adoptant : fond Ambre 50, texte Ambre 800
- Badge Observateur : fond Vert 50, texte Vert 800
- Section RGPD danger : fond rouge-50 inchangé

### `src/utils/constants.js`
Mettre à jour TOUS les tokens de couleur :
- `SCORE_CONFIG` : couleurs Vert/Ambre
- `STATUS_CONFIG` : Taupe/Ambre/Vert
- `getMatchColor()` : seuils avec nouvelles couleurs
- Map tiles : garder CartoDB Positron (clair/minimal)

---

## Résumé : Ce qui change vs ce qui ne change PAS

### ✅ CE QUI CHANGE
- Toute la palette de couleurs (forest → canard, terra → ambre, sage → taupe, cream → beige)
- Les classes Tailwind de couleur dans TOUS les composants
- Les ombres (teintées taupe au lieu de noir)
- L'agencement peut être amélioré (plus d'espace, meilleure hiérarchie)
- Les tailles de police si nécessaire pour améliorer la lisibilité

### ❌ CE QUI NE CHANGE PAS
- La structure des fichiers et dossiers
- Les imports et exports
- La logique métier (state, handlers, API calls)
- Le routing (App.jsx)
- Les données mock
- L'AuthContext et le JWT
- Les noms de composants
- Les dépendances (package.json)

---

Applique ces changements fichier par fichier en commençant par `index.css`, puis `constants.js`, puis les composants `ui/`, puis les composants feature, puis les pages.
