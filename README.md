# @chevp/components

Reusable Vanilla Web Components for workspace-based business applications. Framework-agnostic, built on the Web Components standard with TypeScript and Shadow DOM encapsulation.

Two component variants are included:
- **Vanilla** — custom-styled components with a token-based design system
- **Material Design 3** — same API, styled with `@material/web`

## Installation

This package is hosted on **GitHub Packages**, not npmjs.com.

**1. Configure your `.npmrc`** (once per project or globally):

```bash
echo "@chevp:registry=https://npm.pkg.github.com" >> .npmrc
```

**2. Authenticate** (once per machine):

```bash
npm login --registry=https://npm.pkg.github.com
```

Use your GitHub username and a **Personal Access Token** (with `read:packages` scope) as password.

**3. Install:**

```bash
npm install @chevp/components
```

## Components

| Component | Vanilla | Material | Description |
|---|---|---|---|
| **Panel** | `<chevp-panel>` | `<chevp-md-panel>` | Container with header, icon and action slots |
| **Workspace** | `<chevp-workspace>` | `<chevp-md-workspace>` | CSS Grid layout container for panels |
| **Data Table** | `<chevp-data-table>` | `<chevp-md-data-table>` | Configurable table with row click events |
| **Task List** | `<chevp-task-list>` | `<chevp-md-task-list>` | Interactive checklist with priority indicators |
| **Timeline** | `<chevp-timeline>` | `<chevp-md-timeline>` | Chronological event display |
| **Schedule** | `<chevp-schedule>` | `<chevp-md-schedule>` | Calendar/time slot scheduling |
| **Profile Card** | `<chevp-profile-card>` | `<chevp-md-profile-card>` | User profile display |
| **Stat Card** | `<chevp-stat-card>` | `<chevp-md-stat-card>` | Statistics/metric display |
| **Bar Chart** | `<chevp-bar-chart>` | `<chevp-md-bar-chart>` | Bar chart visualization |
| **Doc Editor** | `<chevp-doc-editor>` | `<chevp-md-doc-editor>` | Rich document editor |
| **Badge** | `<chevp-badge>` | `<chevp-md-badge>` | Status badge with color variants |

## Quick Start

```javascript
import { lightTheme, paletteCobalt } from '@chevp/components';

// Apply theme globally
document.adoptedStyleSheets = [lightTheme, paletteCobalt];
```

```html
<chevp-workspace layout="2col">
  <chevp-panel heading="Tasks" icon="checklist">
    <chevp-task-list></chevp-task-list>
  </chevp-panel>
  <chevp-panel heading="Activity" icon="timeline">
    <chevp-timeline></chevp-timeline>
  </chevp-panel>
</chevp-workspace>
```

### Individual Component Imports

```javascript
// Full library
import { ChevpPanel, ChevpWorkspace } from '@chevp/components';

// Tree-shakeable single imports
import '@chevp/components/panel';
import '@chevp/components/workspace';

// Material Design variants
import { ChevpMdPanel } from '@chevp/components/md';
import '@chevp/components/md/panel';
```

## Theming

The design system uses CSS Custom Properties, composed from a **base theme** and a **color palette**.

### Base Themes

```javascript
import { lightTheme, darkTheme } from '@chevp/components';
document.adoptedStyleSheets = [darkTheme, paletteCobalt];
```

### Color Palettes

| Palette | Accent | Character |
|---|---|---|
| `paletteCobalt` | Deep indigo | Corporate, CoreUI-inspired |
| `paletteOcean` | Teal/cyan | Care-oriented |
| `paletteForest` | Emerald green | Nature/sustainability |
| `paletteEmber` | Orange/amber | Warm energy |
| `paletteRose` | Pink/rose | Soft/healthcare |
| `paletteSlate` | Neutral gray | Corporate minimal |
| `paletteNeon` | Vibrant purple | Modern creative |

7 palettes × 2 base themes = **14 theme combinations** without code changes.

### Custom Tokens

Override individual tokens on any element:

```css
:root {
  --chevp-accent: #3b82f6;
  --chevp-radius: 8px;
  --chevp-font: 'Inter', sans-serif;
}
```

## Component Examples

### Workspace Layouts

```html
<!-- Predefined layouts -->
<chevp-workspace layout="2col"></chevp-workspace>
<chevp-workspace layout="3col"></chevp-workspace>
<chevp-workspace layout="sidebar-main"></chevp-workspace>
<chevp-workspace layout="main-sidebar"></chevp-workspace>

<!-- Custom CSS Grid -->
<chevp-workspace columns="1fr 2fr" rows="auto 1fr" areas="'nav main'">
</chevp-workspace>
```

### Data Table

```javascript
const table = document.querySelector('chevp-data-table');
table.setData(
  [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }],
  [{ name: 'Alice', role: 'Engineer' }, { name: 'Bob', role: 'Designer' }]
);
table.addEventListener('chevp:row-clicked', (e) => console.log(e.detail));
```

### Task List

```javascript
const list = document.querySelector('chevp-task-list');
list.setTasks([
  { id: '1', text: 'Review PR', done: false, priority: 'high' },
  { id: '2', text: 'Update docs', done: true, priority: 'low' },
]);
list.addEventListener('chevp:task-toggled', (e) => console.log(e.detail));
```

### Badge

```html
<chevp-badge variant="green">Active</chevp-badge>
<chevp-badge variant="red">Critical</chevp-badge>
<chevp-badge variant="blue">Info</chevp-badge>
```

## Development

```bash
npm run build       # Compile TypeScript
npm run dev         # Watch mode
npm run docs        # Serve demos at http://localhost:3000
npm run test        # Run tests
npm run clean       # Remove dist/
```

Demo page is available under [docs/demo.html](docs/demo.html).

## Architecture

```
src/
├── components/          # Vanilla Web Components
├── components-md/       # Material Design 3 variants
├── styles/
│   ├── tokens.ts        # Design tokens, themes, palettes
│   └── md-tokens.ts     # MD3 token bridge
├── utils/
│   ├── base-component.ts      # Base class (Shadow DOM, emit, addStyles)
│   └── md-base-component.ts   # MD3 base class
├── index.ts             # Vanilla exports
└── index-md.ts          # Material exports
```

All components extend `ChevpBaseComponent` (or `ChevpMdBaseComponent`), which provides Shadow DOM encapsulation, token adoption, and utility methods (`emit`, `addStyles`, `$`).

## License

MIT
