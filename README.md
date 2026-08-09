# hugo-mod-flowchart

[![CI](https://github.com/julienpoirou/hugo-mod-flowchart/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/julienpoirou/hugo-mod-flowchart/actions/workflows/ci.yml)
[![CodeQL](https://github.com/julienpoirou/hugo-mod-flowchart/actions/workflows/codeql.yml/badge.svg)](https://github.com/julienpoirou/hugo-mod-flowchart/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/julienpoirou/hugo-mod-flowchart/badge)](https://scorecard.dev/viewer/?uri=github.com/julienpoirou/hugo-mod-flowchart)
[![Release](https://img.shields.io/github/v/release/julienpoirou/hugo-mod-flowchart?include_prereleases&sort=semver)](https://github.com/julienpoirou/hugo-mod-flowchart/releases)
[![Hugo Module](https://img.shields.io/badge/Hugo-Module-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/hugo-modules/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<p align="center">
  <img src="./logo.svg" alt="hugo-mod-flowchart logo" width="160" height="160">
</p>

<p align="center">
  <strong><code>flowchart.js</code> diagrams in your Hugo pages.</strong><br>
  One shortcode, vendored runtime, rendered in the reader's browser.
</p>

> **Minimal-maintenance mode.** The vendored stack (`flowchart.js` 1.18.0 on Raphaël 2.3.0) sees little to no upstream activity, so expect no new upstream features. Existing usage keeps working and security issues in the module itself are still addressed. For new projects, consider Mermaid flowcharts via [hugo-mod-mermaid](https://github.com/julienpoirou/hugo-mod-mermaid), which covers the same diagram type with an actively maintained renderer.

## Requires

- Hugo >= `0.124`. The extended edition is not required.

## Install

**Binary** - Hugo and Go installed locally:

```bash
hugo mod init example.com/my-site
hugo mod get github.com/julienpoirou/hugo-mod-flowchart
```

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/julienpoirou/hugo-mod-flowchart"
```

**Container** - Docker installed locally:

```bash
alias hugo='docker run --rm -v "$PWD":/src -p 1313:1313 hugomods/hugo:go-git hugo'
hugo mod init example.com/my-site
hugo mod get github.com/julienpoirou/hugo-mod-flowchart
```

## Usage

**Shortcode** - Raw diagram source between the tags:

```text
{{< flowchart >}}
st=>start: Start
op=>operation: Render
e=>end: Done

st->op->e
{{< /flowchart >}}
```

**Self-closing shortcode** - Source read from a file:

```text
{{< flowchart src="renderers/flowchart.txt" />}}
```

**Self-closing shortcode** - Source passed as base64:

```text
{{< flowchart b64="c3Q9PnN0YXJ0OiBTdGFydAplPT5lbmQ6IEVuZAoKc3QtPmU=" />}}
```

### Parameters

| Param | Description |
|---|---|
| inner content | Raw diagram source between the opening and closing tags |
| `src` | Path, relative to `assets/`, of a file holding the diagram source |
| `b64` | Base64-encoded diagram source |

> At least one input is required. If several are given, `b64` wins over `src`, and `src` wins over the inner content, the others are ignored silently.

> A missing or empty source fails the build with an explicit error rather than emitting a blank page. An invalid `b64` payload is not caught at build time: it surfaces at render time, as an error message in place of the diagram.

> `src` is resolved with `readFile` from the project root, so the file must live in your own site's `assets/`. A file mounted from a theme or from another module will not be found.

## Rendering

The diagram is drawn in the reader's browser as an `<svg>`, by `flowchart.js` on top of Raphaël.

- Raphaël, `flowchart.js`, the stylesheet and the glue are injected once per page, at the first `flowchart` shortcode, in the flow of the content, not in `<head>`. Each one is fingerprinted and carries a Subresource Integrity hash.
- Script order matters: `flowchart.js` reads the global `Raphael` object at parse time. Deferred scripts run in document order, so the ordering holds whatever the load timing.
- Initialization is idempotent, so several diagrams on one page share a single runtime.
- A parse error is written in place of the diagram and its output marked `.is-error`, leaving the rest of the page intact.
- For diagrams injected after page load, call `window.HugoModFlowchart.renderAll(root)`.
- Without JavaScript the shortcode leaves an empty block: there is no server-side fallback.

## Vendored assets

`flowchart.js` `1.18.0` (35 kB) and Raphaël `2.3.0` (91 kB) ship inside the module, no CDN, no third-party request at page load. Provenance, licenses and SHA-256 are recorded in [VENDORED.md](VENDORED.md).

## License

MIT © 2025 [Julien Poirou](mailto:julienpoirou@protonmail.com)
