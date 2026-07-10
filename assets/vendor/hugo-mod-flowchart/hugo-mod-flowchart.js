(() => {
  if (window.__hugoModFlowchartInit) return;
  window.__hugoModFlowchartInit = true;

  // Shortcodes pass source through base64 so Hugo does not mangle diagram text.
  const decodeBase64Utf8 = (value) => {
    const binary = window.atob(value || "");
    if (typeof TextDecoder !== "undefined") {
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder("utf-8").decode(bytes);
    }

    let escaped = "";
    for (let index = 0; index < binary.length; index += 1) {
      escaped += `%${binary.charCodeAt(index).toString(16).padStart(2, "0")}`;
    }
    return decodeURIComponent(escaped);
  };

  const renderElement = (element) => {
    if (element.dataset.rendered === "true" || typeof flowchart === "undefined") return;

    const output = element.querySelector("[data-flowchart-output]");
    if (!output) return;

    try {
      const source = decodeBase64Utf8(element.dataset.source || "").trim();
      if (!source) {
        throw new Error("Flowchart source is empty");
      }

      output.innerHTML = "";
      flowchart.parse(source).drawSVG(output);
      output.classList.remove("is-error");
      element.dataset.rendered = "true";
    } catch (error) {
      output.textContent = error.message;
      output.classList.add("is-error");
    }
  };

  const renderAll = (root = document) => {
    root.querySelectorAll("[data-hugo-mod-flowchart]").forEach(renderElement);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => renderAll(), { once: true });
  } else {
    renderAll();
  }

  window.HugoModFlowchart = { renderAll };
})();
