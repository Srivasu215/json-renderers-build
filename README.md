# json-renderers-build

> **Headless Component Specification Compiler for JSON-Driven UIs**  
> Compiles structured data, columns, and declarative component blueprints into JSON-to-DOM specification ASTs (`specAsJsonToDom`) using `json-to-spec`.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.3.6-emerald.svg)](package.json)
[![Architecture: Headless](https://img.shields.io/badge/Architecture-Headless%20Spec%20Builder-indigo.svg)](#the-story-of-json-renderers-build)
[![Website: GitHub Pages](https://img.shields.io/badge/Website-GitHub%20Pages-4f46e5?logo=github)](https://keshavsoft.github.io/json-renderers-build/)

Live docs: https://keshavsoft.github.io/json-renderers-build/

---

## The Story of `json-renderers-build`

In the **KeshavSoft Declarative UI Ecosystem**, rendering is split into a few clear responsibilities:

1. **Data shaping (upstream, optional):** `@keshavsoft/json-transformer` or similar logic prepares business JSON into a stable shape.
2. **Specification Compilation (THIS REPO — `json-renderers-build`)**  
   Transforms data, field arrays, and UI blueprints (`skeleton.json`) into an abstract, deterministic DOM specification tree (`specAsJsonToDom`).
3. **DOM Instantiation & Mounting (Downstream — `@keshavsoft/json-to-tag` + `json-renderers`)**  
   Consumes that compiled specification tree and constructs real browser DOM nodes (`HTMLElement`), mounting them into target HTML containers.

This repo does not create live browser DOM by itself. Its output is a headless JSON spec, not a rendered page. The actual DOM hook happens in `@keshavsoft/json-to-tag`, and the runtime layer simply mounts the resulting browser nodes.

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Raw Business Data & Columns                                         │
│    data: [{ id: 1, name: "Alpha" }], columns: ["Name"]                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 2. json-renderers-build (THIS REPO)                                    │
│    • Pre-packaged component skeletons (table, select, selectOptions)   │
│    • Compiles templates via json-to-spec compiler                     │
│    • 100% HEADLESS: Zero DOM queries, zero document mutations         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ returns: specAsJsonToDom (JSON AST)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 3. Downstream DOM Runtime (json-renderers / @keshavsoft/json-to-tag)   │
│    • Takes JSON AST                                                    │
│    • Produces real DOM nodes (HTMLTableElement, HTMLSelectElement)     │
│    • Mounts into document.getElementById(targetHtmlId)                 │
└────────────────────────────────────────────────────────────────────────┘
```

### Why a Dedicated Spec Builder?

- **100% Headless & Isomorphic:** Runs anywhere JavaScript runs — in Node.js (for SSR or static site generation), in Web Workers, in browser contexts, or in command-line build tools.
- **Pure Functional Pipeline:** Given the same data and columns, it returns the exact same specification AST every time. No DOM dependencies or mock DOMs (`jsdom`) required for unit testing.
- **Blueprint Separation:** Component skeletons (`skeleton.json`) and transformation rules can evolve independently from DOM lifecycle and styling concerns.
- **Core Engine for `json-renderers`:** Downstream library `json-renderers` relies on `json-renderers-build` to generate its AST before mounting.
- **Important boundary:** This repo prepares the UI description; the actual DOM creation still happens in `@keshavsoft/json-to-tag`, while `json-renderers` performs the mounting step into the browser container.

---

## Features

- **Config-Driven Spec Generation:** Converts simple arrays of data and columns into fully structured DOM specifications.
- **Pre-Packaged Blueprints (v3):**
  - **`table`:** Full `<table>`, `<thead>`, `<tbody>` structure styled with standard Bootstrap classes (`table table-hover table-striped mb-0`).
  - **`select`:** Full `<select id="LedgerName">` containing dynamic `<option>` child nodes.
  - **`selectOptionsOnly`:** Option fragment spec (`{ children: [ ...options ] }`) designed to inject options into pre-existing select containers.
- **Global & ESM Distribution:** Usable via npm or directly in the browser via CDN script (`window.ks.jsonRenderersBuild`).
- **Standardized Parameter Architecture:** Adheres to KeshavSoft's `in`-prefixed parameter convention and `local`-variable scoping pattern.

---

## Installation

### NPM

```bash
npm install json-renderers-build
```

### Browser (CDN / ES Module)

```html
<!-- Load ES module bundle directly from CDN -->
<script type="module" src="https://cdn.jsdelivr.net/gh/keshavsoft/json-renderers-build@main/docs/dist/v3/min.js"></script>
```

When loaded via `<script type="module">`, it automatically registers globally on:
```javascript
window.ks.jsonRenderersBuild = {
  meta: {
    version: "v3.0.0",
    description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
  },
  renderToDom: [Function: render]
};
```

---

## Quick Start & Usage

### 1. Generating a Table Specification (`table`)

The `table` renderer generates a complete table specification AST including headers (`<th>`) and data cells (`<td>`).

```javascript
import render from "json-renderers-build";

const records = [
  { id: 101, name: "Alpha Enterprise", city: "Hyderabad" },
  { id: 102, name: "Beta Logistics", city: "Bengaluru" }
];

const columns = [
  { title: "ID" },
  { title: "Name" },
  { title: "City" }
];

const spec = render({
  type: "table",
  data: records,
  columns: columns
});

console.log(spec);
```

#### Compiled Output AST (`specAsJsonToDom`):
```json
{
  "tagName": "table",
  "attributes": {
    "class": "table table-hover table-striped mb-0"
  },
  "children": [
    {
      "tagName": "thead",
      "children": [
        {
          "tagName": "tr",
          "children": [
            { "tagName": "th", "textContent": "ID" },
            { "tagName": "th", "textContent": "Name" },
            { "tagName": "th", "textContent": "City" }
          ]
        }
      ]
    },
    {
      "tagName": "tbody",
      "children": [
        {
          "tagName": "tr",
          "children": [
            { "tagName": "td", "textContent": 101 },
            { "tagName": "td", "textContent": "Alpha Enterprise" },
            { "tagName": "td", "textContent": "Hyderabad" }
          ]
        },
        {
          "tagName": "tr",
          "children": [
            { "tagName": "td", "textContent": 102 },
            { "tagName": "td", "textContent": "Beta Logistics" },
            { "tagName": "td", "textContent": "Bengaluru" }
          ]
        }
      ]
    }
  ]
}
```

---

### 2. Generating a Select Dropdown Specification (`select`)

The `select` renderer creates a complete `<select>` specification populated with `<option>` elements.

```javascript
import render from "json-renderers-build";

const spec = render({
  type: "select",
  data: ["Account Receivable", "Account Payable", "Sales Revenue"]
});

console.log(spec);
```

#### Compiled Output AST:
```json
{
  "tagName": "select",
  "attributes": {
    "id": "LedgerName"
  },
  "children": [
    {
      "tagName": "option",
      "attributes": { "value": "Account Receivable" },
      "textContent": "Account Receivable"
    },
    {
      "tagName": "option",
      "attributes": { "value": "Account Payable" },
      "textContent": "Account Payable"
    },
    {
      "tagName": "option",
      "attributes": { "value": "Sales Revenue" },
      "textContent": "Sales Revenue"
    }
  ]
}
```

---

### 3. Generating Options-Only Fragment Specification (`selectOptionsOnly`)

When you already have a `<select>` element in your markup and only want to dynamically generate its `<option>` items:

```javascript
import render from "json-renderers-build";

const spec = render({
  type: "selectOptionsOnly",
  data: ["North", "South", "East", "West"]
});

console.log(spec);
```

#### Compiled Output AST:
```json
{
  "children": [
    {
      "tagName": "option",
      "attributes": { "value": "North" },
      "textContent": "North"
    },
    {
      "tagName": "option",
      "attributes": { "value": "South" },
      "textContent": "South"
    },
    {
      "tagName": "option",
      "attributes": { "value": "East" },
      "textContent": "East"
    },
    {
      "tagName": "option",
      "attributes": { "value": "West" },
      "textContent": "West"
    }
  ]
}
```

---

## Consumer Integration: From Spec to DOM

To convert the specification returned by `json-renderers-build` into real DOM nodes, downstream consumers (such as `json-renderers`) pipe the AST into `@keshavsoft/json-to-tag`:

```javascript
import renderSpec from "json-renderers-build";
import jsonToTag from "@keshavsoft/json-to-tag";

// Step 1: Compile specification AST (Headless)
const spec = renderSpec({
  type: "table",
  data: myRecords,
  columns: ["Name", "Amount"]
});

// Step 2: Unwrap children if fragment
let jsonToSend = spec;
if (!("tagName" in spec) && "children" in spec) {
  jsonToSend = spec.children;
}

// Step 3: Instantiate DOM elements
const domElement = jsonToTag(jsonToSend);

// Step 4: Mount into target container
const container = document.getElementById("my-container");
container.replaceChildren(domElement);
```

---

## API Reference

### `render(options)` / `default export`

The entry point exported by `json-renderers-build` accepts a single configuration object:

```javascript
render({
  type = "table",
  data = [],
  columns
})
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `"table"` | Type of component spec to build: `"table"`, `"select"`, or `"selectOptionsOnly"`. |
| `data` | `Array` | `[]` | Data array. For `table`: array of row objects. For `select` / `selectOptionsOnly`: array of strings. |
| `columns` | `Array` | `undefined` | Header columns for `table`. Accepts an array of strings (e.g. `["Name"]`) or an array of objects (e.g. `[{ title: "Name" }]`). |

**Returns:** `Object` — Compiled JSON-to-DOM specification AST (`specAsJsonToDom`).

---

## Project Structure

```text
json-renderers-build/
├── docs/                     # Documentation & distribution portal
│   ├── dist/                 # Production bundles (Vite build)
│   │   ├── min.js            # Latest ES bundle
│   │   ├── v2/min.js         # v2 bundle
│   │   └── v3/min.js         # v3 bundle
│   └── index.html            # Interactive Documentation & Live Playground
├── samples/                  # Runnable browser verification samples
│   ├── table/                # Table spec compilation demo
│   ├── select/               # Select dropdown spec demo
│   └── selectOptionsOnly/    # Options fragment demo
├── src/                      # Source code
│   ├── index.js              # Entry router (exports ./v3/index.js)
│   ├── v1/                   # Legacy v1 (early coupled prototype)
│   ├── v2/                   # Legacy v2 (intermediate spec refactor)
│   └── v3/                   # CURRENT: Pure headless spec compiler
│       ├── common/           # Shared utilities (deriveColumnsFromData.js)
│       ├── select/           # Select builder (index.js, skeleton.json)
│       ├── selectOptionsOnly/# Options fragment builder (index.js, skeleton.json)
│       ├── table/            # Table builder (index.js, skeleton.json)
│       ├── meta.js           # Version & metadata descriptor
│       ├── registerGlobal.js # Global window.ks namespace attachment
│       └── index.js          # Component dispatcher map
├── package.json              # Package definition & scripts
├── vite.config.js            # Vite build configuration
└── README.md                 # Complete repository guide
```

---

## Evolution Story

| Version | Status | Architectural Role |
|---|---|---|
| **v1** | Legacy | Early coupled implementation. Required `targetHtmlId` and directly executed DOM mounting using `jsonToTag`. |
| **v2** | Deprecated | Decoupled output to return `specAsJsonToDom`, but still retained legacy parameter baggage (`targetHtmlId`, `showLog`). |
| **v3** | **Current** | **Pure Headless Spec Compiler**. Clean functional API: `(type, data, columns) => spec`. Supports `table`, `select`, and `selectOptionsOnly`. Decoupled from DOM. |

---

## Development & Build

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build production bundle (into docs/dist/v3/min.js and docs/dist/min.js)
npm run build
```

---

## License

MIT © [KeshavSoft](https://github.com/keshavsoft)
