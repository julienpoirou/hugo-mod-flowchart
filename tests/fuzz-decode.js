// Property-based verification that arbitrary UTF-8 diagram sources survive the
// browser's base64 decoding path, including the TextDecoder fallback.
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const fc = require("fast-check");

const runtime = fs.readFileSync(
  path.join(__dirname, "../assets/libs/hugo-mod-flowchart/hugo-mod-flowchart.js"),
  "utf8",
);

function render(source, withTextDecoder) {
  let parsed;
  const errors = [];
  const output = {
    innerHTML: "stale output",
    textContent: "",
    classList: {
      add: (name) => errors.push(name),
      remove: () => {},
    },
  };
  const element = {
    dataset: {
      source: Buffer.from(source, "utf8").toString("base64"),
      rendered: "false",
    },
    querySelector: (selector) => {
      assert.equal(selector, "[data-flowchart-output]");
      return output;
    },
  };
  const window = {
    atob: (value) => Buffer.from(value, "base64").toString("binary"),
  };
  const document = {
    readyState: "complete",
    querySelectorAll: (selector) => {
      assert.equal(selector, "[data-hugo-mod-flowchart]");
      return [element];
    },
  };
  const context = {
    document,
    flowchart: {
      parse: (value) => {
        parsed = value;
        return {
          drawSVG: (target) => assert.equal(target, output),
        };
      },
    },
    TextDecoder: withTextDecoder ? TextDecoder : undefined,
    window,
  };

  vm.runInNewContext(runtime, context);
  window.HugoModFlowchart.renderAll();

  assert.equal(parsed, source.trim());
  assert.equal(element.dataset.rendered, "true");
  assert.equal(output.innerHTML, "");
  assert.deepEqual(errors, []);
}

const unicodeSource = fc
  .array(
    fc.integer({ min: 0, max: 0x10f7ff }).map((value) => (value >= 0xd800 ? value + 0x800 : value)),
    { minLength: 1, maxLength: 256 },
  )
  .map((codePoints) => String.fromCodePoint(...codePoints));

fc.assert(
  fc.property(unicodeSource, (source) => {
    fc.pre(source.trim().length > 0);
    render(source, true);
    render(source, false);
  }),
  { numRuns: 500, seed: 20261101 },
);

console.log("PASS: 500 arbitrary UTF-8 sources rendered through both base64 decoding paths");
