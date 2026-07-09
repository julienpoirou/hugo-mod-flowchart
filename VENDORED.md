# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module.
When updating a library, replace the file, update this table, and update
`THIRD_PARTY_LICENSES.md` if the upstream license changed.

| File | Library | Version | Source | License | SHA-256 |
|---|---|---|---|---|---|
| `static/vendor/hugo-mod-flowchart/flowchart.min.js` | [Raphaël](https://github.com/DmitryBaranovskiy/raphael) + [flowchart.js](https://github.com/adrai/flowchart.js) (concatenated, Raphaël first) | Raphaël 2.3.0, flowchart.js 1.18.0 | `https://cdn.jsdelivr.net/npm/raphael@2.3.0/raphael.min.js` + `https://cdn.jsdelivr.net/npm/flowchart.js@1.18.0/release/flowchart.min.js` | MIT (both) | `4ccaa2bc48241d3414b1cfb30495316cf91711dd4fe80d50911597f7ad2061df` |

First-party files (not covered above): `static/vendor/hugo-mod-flowchart/hugo-mod-flowchart.js`,
`static/vendor/hugo-mod-flowchart/hugo-mod-flowchart.css` — licensed under this
repository's [LICENSE](LICENSE).

## Verifying integrity

```bash
sha256sum static/vendor/hugo-mod-flowchart/flowchart.min.js
```
