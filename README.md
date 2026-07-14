# hugo-mod-flowchart

[![CI](https://github.com/julienpoirou/hugo-mod-flowchart/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/julienpoirou/hugo-mod-flowchart/actions/workflows/ci.yml)
[![CodeQL](https://github.com/julienpoirou/hugo-mod-flowchart/actions/workflows/codeql.yml/badge.svg)](https://github.com/julienpoirou/hugo-mod-flowchart/actions/workflows/codeql.yml)
[![Release](https://img.shields.io/github/v/release/julienpoirou/hugo-mod-flowchart?include_prereleases&sort=semver)](https://github.com/julienpoirou/hugo-mod-flowchart/releases)
[![Hugo Module](https://img.shields.io/badge/Hugo-Module-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/hugo-modules/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196.svg)](https://www.conventionalcommits.org)

<p align="center">
  <img src="./logo.svg" alt="hugo-mod-flowchart logo" width="160" height="160">
</p>

Standalone Hugo module for `flowchart.js` rendering with a vendored browser runtime and simple shortcode integration.

## Project status

This module is in **minimal-maintenance mode**. The vendored rendering stack
(`flowchart.js` 1.18.0 on top of Raphaël 2.3.0) sees little to no upstream
activity, so no new upstream features or fixes are expected. Existing usage
keeps working and security-relevant issues in the module itself will be
addressed. For new projects, consider Mermaid flowcharts via
[hugo-mod-mermaid](https://github.com/julienpoirou/hugo-mod-mermaid), which
covers the same diagram type with an actively maintained renderer.

## Features

- Render diagrams with `{{< flowchart >}}`
- Support `src`, `b64`, and inline body input modes
- Ship vendored `flowchart.js`
- Keep renderer initialization idempotent on the page
- Fail explicitly at build time when shortcode source is missing

## Requirements

- Hugo `>= 0.124`
- A Hugo site with Hugo Modules enabled

## Installation

Import the module in your Hugo site:

```toml
[module]
  [[module.imports]]
    path = "github.com/julienpoirou/hugo-mod-flowchart"
```

## Usage

Inline source:

```text
{{< flowchart >}}
st=>start: Start
op=>operation: Render Hugo
e=>end: End

st->op->e
{{< /flowchart >}}
```

File source:

```text
{{< flowchart src="renderers/flowchart.txt" />}}
```

Base64 source (when the diagram text would otherwise conflict with Markdown
or shortcode parsing):

```text
{{< flowchart b64="c3Q9PnN0YXJ0OiBTdGFydAplPT5lbmQ6IEVuZAoKc3QtPmU=" />}}
```

## Output assets

The module publishes, through Hugo Pipes (`resources.Get` + `fingerprint`),
so each file's published URL includes a content hash for cache-busting and
ships a Subresource Integrity attribute:

- `libs/hugo-mod-flowchart/raphael.<hash>.min.js`
- `libs/hugo-mod-flowchart/flowchart.<hash>.min.js`
- `libs/hugo-mod-flowchart/hugo-mod-flowchart.<hash>.js`
- `libs/hugo-mod-flowchart/hugo-mod-flowchart.<hash>.css`

Source files live under `assets/libs/hugo-mod-flowchart/` in this
repository; see [`VENDORED.md`](VENDORED.md) for their unfingerprinted
checksums.

## Development

```bash
git clone https://github.com/julienpoirou/hugo-mod-flowchart
cd hugo-mod-flowchart
```

The main verification is handled by GitHub Actions with a minimal Hugo site that mounts the module and builds a sample page.

## Contributing

- Use Conventional Commits for branch history
- Update docs or changelog when behavior changes
- Keep sample flowcharts easy to reproduce in a minimal Hugo page
- See [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) for contribution guidance
