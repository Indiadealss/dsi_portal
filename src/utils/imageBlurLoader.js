// Site-wide image loading states: every <img> that is still downloading gets the
// `img-loading` class (kept invisible, see index.css) so no half-drawn image shows;
// once it loads it swaps to `img-reveal` (gentle fade + de-blur).
// Cached images skip both. Opt out on a specific image with `data-no-blur`.

const mark = (img) => {
  if (img.hasAttribute("data-no-blur")) return;
  if (img.complete && img.naturalWidth > 0) {
    img.classList.remove("img-loading");
  } else {
    img.classList.remove("img-reveal");
    img.classList.add("img-loading");
  }
};

const scan = (node) => {
  if (node.nodeType !== 1) return;
  if (node.tagName === "IMG") mark(node);
  else node.querySelectorAll?.("img").forEach(mark);
};

export const initImageBlurLoader = () => {
  if (typeof window === "undefined" || window.__imgBlurLoader) return;
  window.__imgBlurLoader = true;

  // load/error don't bubble, so listen in the capture phase
  const loaded = (e) => {
    const img = e.target;
    if (img?.tagName !== "IMG" || !img.classList.contains("img-loading")) return;
    img.classList.remove("img-loading");
    img.classList.add("img-reveal");
  };
  const failed = (e) => {
    if (e.target?.tagName === "IMG") e.target.classList.remove("img-loading");
  };
  // drop the reveal class afterwards so it can't clash with the image's own animations
  const revealed = (e) => {
    if (e.animationName === "img-reveal") e.target.classList.remove("img-reveal");
  };
  document.addEventListener("load", loaded, true);
  document.addEventListener("error", failed, true);
  document.addEventListener("animationend", revealed, true);

  new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "attributes") mark(m.target); // src/srcset swapped (carousels, lazy loaders)
      else m.addedNodes.forEach(scan);
    }
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "srcset"],
  });

  scan(document.body);
};
