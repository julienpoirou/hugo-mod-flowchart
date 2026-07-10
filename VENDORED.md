# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module.
When updating a library, replace the file, update this table, and update
`THIRD_PARTY_LICENSES.md` if the upstream license changed.

| File | Library | Version | Source | License | SHA-256 |
|---|---|---|---|---|---|
| `static/vendor/hugo-mod-flowchart/raphael.min.js` | [Raphaël](https://github.com/DmitryBaranovskiy/raphael) | 2.3.0 | `https://cdn.jsdelivr.net/npm/raphael@2.3.0/raphael.min.js` | MIT | `4da6e9aca75e3576d27ac0962ccadc6d6483cd486901d70d3dee50e77ae7f588` |
| `static/vendor/hugo-mod-flowchart/flowchart.min.js` | [flowchart.js](https://github.com/adrai/flowchart.js) | 1.18.0 | `https://cdn.jsdelivr.net/npm/gh/adrai/flowchart.js@1.18.0/release/flowchart.min.js` (not published to the npm package; only committed to the GitHub repo) | MIT | `425438e3d35b2b5c591222fa00f0000386daa8aba35c111bd7dd73527dc6db7a` |

Note: flowchart.js's own build banner inside the 1.18.0 file still reads
`v1.17.1` — an upstream oversight in their prebuilt bundle, not a version
mismatch on our side. Content was diff-verified against the previous
concatenated bundle at the same tag before the split.

Previously, both libraries were vendored as a single concatenated
`flowchart.min.js` (Raphaël first, then flowchart.js). They are now shipped
as two separate files so each has its own checksum, source, and license
entry, and so the loading order (Raphaël before flowchart.js, which reads
the global `Raphael` object) is explicit in the shortcode rather than baked
into a single opaque bundle.

First-party files (not covered above): `static/vendor/hugo-mod-flowchart/hugo-mod-flowchart.js`,
`static/vendor/hugo-mod-flowchart/hugo-mod-flowchart.css` — licensed under this
repository's [LICENSE](LICENSE).

## Verifying integrity

```bash
sha256sum static/vendor/hugo-mod-flowchart/raphael.min.js
sha256sum static/vendor/hugo-mod-flowchart/flowchart.min.js
```
