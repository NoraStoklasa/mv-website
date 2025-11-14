# MV Website - Language System

## Overview

The website supports English (EN) and Czech (CS) with localStorage to remember user preferences.

## Structure

```
/
├── index.html              # Root redirects to user's preferred language
├── en/                     # English pages
│   ├── index.en.html
│   ├── about.en.html
│   ├── services.en.html
│   ├── contact.en.html
│   ├── header.en.html
│   └── footer.en.html
├── cs/                     # Czech pages
│   ├── index.cs.html
│   ├── about.cs.html
│   ├── services.cs.html
│   ├── contact.cs.html
│   ├── header.cs.html
│   └── footer.cs.html
└── scripts/
    ├── language.js         # Language switching logic
    ├── components.js       # Loads language-specific components
    └── menu.js
```

## How It Works

### 1. Default Language

- **English** is the default language
- First-time visitors are redirected to `/en/index.en.html`

### 2. Language Selection

- Users click **EN** or **CZ** in the header
- Their choice is saved to `localStorage`
- They are immediately redirected to the same page in the selected language

### 3. Remembering Preferences

- On subsequent visits, users automatically see their preferred language
- The preference persists across browser sessions
- The active language is highlighted in the language selector

### 4. Language Switcher Behavior

- Maintains the current page when switching (e.g., about page → about page)
- Updates localStorage on every language change
- Adds "active" class to current language for visual feedback

## Adding New Pages

1. Create both language versions:

   - `/en/pagename.en.html`
   - `/cs/pagename.cs.html`

2. Update both header files with navigation links:

   - `/en/header.en.html` → `<a href="pagename.en.html">`
   - `/cs/header.cs.html` → `<a href="pagename.cs.html">`

3. Include these scripts in the `<head>`:

   ```html
   <script src="../scripts/language.js" defer></script>
   <script src="../scripts/menu.js" defer></script>
   <script src="../scripts/components.js" defer></script>
   ```

4. Use relative paths for assets:
   - CSS: `../css/styles.css`
   - Images: `../assets/images/...`
   - Logo: `../assets/logo.png`

## Technical Details

### localStorage Key

- Key: `preferredLanguage`
- Values: `'en'` or `'cs'`

### URL Structure

- Pattern: `/{language}/{pagename}.{language}.html`
- Examples:
  - English home: `/en/index.en.html`
  - Czech about: `/cs/about.cs.html`

### Scripts Load Order

1. `language.js` - Checks and applies language preference
2. `menu.js` - Mobile menu functionality
3. `components.js` - Loads header/footer for current language
