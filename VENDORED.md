# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table and the matching `sha256` in [.vendored/package.json](.vendored/package.json), and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-flowchart/`.

| File | Library | Version | License | SHA-256 |
|---|---|---|---|---|
| `raphael.min.js` | [Raphaël](https://github.com/DmitryBaranovskiy/raphael) | 2.3.0 | MIT | `4da6e9aca75e3576d27ac0962ccadc6d6483cd486901d70d3dee50e77ae7f588` |
| `flowchart.min.js` | [flowchart.js](https://github.com/adrai/flowchart.js) | 1.18.0 | MIT | `425438e3d35b2b5c591222fa00f0000386daa8aba35c111bd7dd73527dc6db7a` |

Sources: `https://cdn.jsdelivr.net/npm/raphael@2.3.0/raphael.min.js` and `https://raw.githubusercontent.com/adrai/flowchart.js/v1.18.0/release/flowchart.min.js`.

The flowchart.js bundle comes from the git tag rather than from npm, because the npm tarball ships sources only. Two details make its checksum differ from a plain download: the trailing `sourceMappingURL` comment is stripped, since the `.map` file is not vendored, and upstream forgot to bump the banner at the top of the file, which still reads `v1.17.1`.

First-party files, under this repository's [LICENSE](LICENSE): `hugo-mod-flowchart.js`, `hugo-mod-flowchart.css`.

## How updates reach us

[.vendored/package.json](.vendored/package.json) pins the same versions as ordinary npm dependencies. Nothing ever installs it. It exists so Dependabot opens a pull request when one of these libraries releases, and so GitHub raises a security alert against the exact code this module serves to readers.

Dependabot can bump that manifest but cannot re-download a minified bundle, so a merged bump would otherwise leave the declared version and the shipped bytes silently out of sync. `scripts/check-vendored.mjs` closes that gap: it fails the build unless the pinned version, this table and the checksum of the committed file all agree.

## Verifying integrity

```bash
node scripts/check-vendored.mjs
sha256sum assets/libs/hugo-mod-flowchart/raphael.min.js
sha256sum assets/libs/hugo-mod-flowchart/flowchart.min.js
```
