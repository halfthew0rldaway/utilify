# UTILIFY V2

## Project Overview

Utilify V2 is a modern browser-based utility suite containing practical tools for developers, designers, writers, students, and professionals. The platform runs entirely in the browser with no authentication, no backend, and no data collection.

Every tool performs its processing locally on the user's device, resulting in instant performance, complete privacy, and compatibility with static hosting platforms such as GitHub Pages.

The project focuses on high-quality user experience, elegant editorial design, excellent typography, smooth interactions, and useful tools that solve real problems.

---

## Core Principles

### Local First

All processing occurs in the browser.

No accounts.

No databases.

No cloud processing.

No API dependencies for core functionality.

### Tool Focused

Every feature must provide actual utility.

Avoid gimmicks, AI wrappers, fake productivity features, dashboards, social elements, gamification, or unnecessary complexity.

### Editorial Design

The interface should resemble a premium digital publication rather than a dashboard.

Large typography, spacious layouts, careful hierarchy, and refined motion should define the experience.

### Performance First

Target Lighthouse scores above 95.

Minimal dependencies.

Optimized assets.

Fast loading even on low-end devices.

---

# Design Direction

## Visual Identity

Utilify should feel like a premium digital toolkit.

References:

* Linear
* Stripe Press
* Mono Company
* Vercel
* A24 Editorial Pages
* Read.cv
* Raycast

Avoid:

* Glassmorphism
* Neumorphism
* Excessive gradients
* AI-generated design patterns
* Neon aesthetics
* Cyberpunk styling
* Floating colorful cards
* Dashboard clutter

---

## Color System

### Light Mode

Background:
`#F8F7F4`

Surface:
`#FFFFFF`

Primary Text:
`#111111`

Secondary Text:
`#666666`

Border:
`#E8E8E8`

### Dark Mode

Background:
`#0F0F0F`

Surface:
`#171717`

Primary Text:
`#F5F5F5`

Secondary Text:
`#A3A3A3`

Border:
`#2A2A2A`

Accent color should be minimal and used sparingly.

No rainbow palettes.

No tool-specific colors.

---

## Typography

### Primary Sans

Geist

Fallback:

```css
font-family:
'Geist',
'Inter',
sans-serif;
```

### Editorial Serif

Instrument Serif

Used only for:

* Hero highlights
* Section introductions
* Feature callouts

### Typography Scale

Hero:
96px–140px

Section Titles:
48px–72px

Tool Titles:
24px–32px

Body:
16px–18px

Large spacing and breathing room are mandatory.

---

## Layout

### Homepage Structure

Hero

Category Navigation

Featured Tools

All Tools

About

Footer

---

### Hero Section

Large editorial heading.

Example:

"Practical tools for people who build, write, design, and create."

Supporting copy:

"Fast. Private. Browser-powered."

Large search bar directly beneath hero.

---

## Motion Design

Animations should feel premium and deliberate.

### Principles

Fast

Subtle

Responsive

Never distracting

### Micro Interactions

Hover lift:

```css
transform: translateY(-2px);
```

Button press:

```css
transform: scale(0.98);
```

Card reveal:

```css
opacity: 0;
transform: translateY(20px);
```

Animated using Intersection Observer.

### Page Transitions

View Transitions API.

Smooth cross-page navigation.

Fade + slight position interpolation.

### Cursor Enhancements

Subtle magnetic buttons.

Text highlight transitions.

No custom cursor replacement.

---

# Site Structure

```text
/
├── index.html
├── pages
│   ├── json-formatter.html
│   ├── markdown-preview.html
│   ├── regex-tester.html
│   ├── jwt-decoder.html
│   ├── hash-generator.html
│   ├── uuid-generator.html
│   ├── password-generator.html
│   ├── base64-tool.html
│   ├── url-encoder.html
│   ├── timestamp-converter.html
│   ├── qr-generator.html
│   ├── qr-scanner.html
│   ├── unit-converter.html
│   ├── timezone-converter.html
│   ├── slug-generator.html
│   ├── markdown-preview.html
│   ├── lorem-generator.html
│   ├── text-analyzer.html
│   ├── color-palette.html
│   ├── gradient-generator.html
│   ├── contrast-checker.html
│   ├── color-converter.html
│   ├── box-shadow-generator.html
│   └── border-radius-generator.html
│
├── assets
│   ├── css
│   │   ├── global.css
│   │   ├── components.css
│   │   ├── animations.css
│   │   └── themes.css
│   │
│   ├── js
│   │   ├── app.js
│   │   ├── search.js
│   │   ├── theme.js
│   │   ├── transitions.js
│   │   └── tools
│   │
│   ├── fonts
│   ├── icons
│   └── images
│
└── README.md
```

---

# Tool Categories

## Text

### Text Analyzer

Features:

* Character count
* Word count
* Sentence count
* Paragraph count
* Reading time
* Reading level

### Case Converter

Features:

* UPPERCASE
* lowercase
* Title Case
* Sentence Case
* camelCase
* snake_case
* kebab-case

### Markdown Preview

Features:

* Live rendering
* Syntax highlighting
* Copy rendered HTML

### Lorem Ipsum Generator

Features:

* Paragraphs
* Sentences
* Words

### Slug Generator

Features:

* URL-safe output
* Automatic cleanup

---

## Developer

### JSON Formatter

Features:

* Format JSON
* Minify JSON
* Validate JSON
* Error detection

### JWT Decoder

Features:

* Header inspection
* Payload inspection
* Expiration viewer

### Base64 Tool

Features:

* Encode
* Decode

### URL Encoder

Features:

* Encode URL
* Decode URL

### Regex Tester

Features:

* Live matching
* Highlight matches
* Pattern flags

### Hash Generator

Features:

* MD5
* SHA-1
* SHA-256
* SHA-512

### UUID Generator

Features:

* Single UUID
* Bulk UUID generation

### Timestamp Converter

Features:

* Unix to Human
* Human to Unix

---

## Design

### Color Palette Generator

Features:

* Random palettes
* Locked colors
* Copy HEX

### Color Converter

Features:

* HEX
* RGB
* HSL

### Contrast Checker

Features:

* WCAG AA
* WCAG AAA

### Gradient Generator

Features:

* Visual editor
* CSS export

### Box Shadow Generator

Features:

* Live preview
* CSS export

### Border Radius Generator

Features:

* Independent corner controls
* CSS export

---

## Utilities

### Unit Converter

Categories:

* Length
* Weight
* Temperature
* Area
* Volume

### Timezone Converter

Features:

* Multiple timezone comparison
* Meeting planner

### Password Generator

Features:

* Custom length
* Symbols
* Numbers
* Strength indicator

### QR Generator

Features:

* PNG export
* SVG export

### QR Scanner

Features:

* Image upload
* QR extraction

---

# Homepage Experience

## Hero

Large editorial statement.

Search immediately visible.

### Search Behavior

Instant filtering.

Keyboard shortcut:

```text
/
```

opens search.

---

## Tool Explorer

Displayed as editorial blocks rather than dashboard cards.

Example:

```text
JSON Formatter

Format, validate and minify JSON documents.

Open Tool →
```

Minimal.

Clean.

Readable.

---

## Featured Tools

Most frequently used tools.

Pinned near top.

---

## Global Features

### Command Palette

Shortcut:

```text
CTRL + K
```

Allows instant navigation to every tool.

### Dark Mode

System preference detection.

Manual toggle.

Preference saved locally.

### Favorites

Stored using LocalStorage.

### Recently Used

Stored using LocalStorage.

---

# Technical Requirements

## Hosting

GitHub Pages

Static deployment only.

## Stack

HTML5

CSS3

Vanilla JavaScript

No framework required.

## Browser APIs

Web Crypto API

Clipboard API

Intersection Observer

View Transitions API

Local Storage

File API

Intl API

Canvas API

---

# Success Criteria

The final product should feel closer to a premium software product than a collection of coding exercises.

Every page should prioritize clarity, typography, motion, and usefulness.

The experience should be elegant enough to sit alongside portfolio projects such as Flux State, Cinea, and future flagship applications while remaining completely static and deployable through GitHub Pages.
