# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table, and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-flowchart/`.

| File | Library | Version | License | SHA-256 |
|---|---|---|---|---|
| `raphael.min.js` | [Raphaël](https://github.com/DmitryBaranovskiy/raphael) | 2.3.0 | MIT | `4da6e9aca75e3576d27ac0962ccadc6d6483cd486901d70d3dee50e77ae7f588` |
| `flowchart.min.js` | [flowchart.js](https://github.com/adrai/flowchart.js) | 1.18.0 | MIT | `425438e3d35b2b5c591222fa00f0000386daa8aba35c111bd7dd73527dc6db7a` |

Sources: `https://cdn.jsdelivr.net/npm/raphael@2.3.0/raphael.min.js` and `https://raw.githubusercontent.com/adrai/flowchart.js/v1.18.0/release/flowchart.min.js`.

First-party files, under this repository's [LICENSE](LICENSE): `hugo-mod-flowchart.js`, `hugo-mod-flowchart.css`.

## Verifying integrity

```bash
sha256sum assets/libs/hugo-mod-flowchart/raphael.min.js
sha256sum assets/libs/hugo-mod-flowchart/flowchart.min.js
```
