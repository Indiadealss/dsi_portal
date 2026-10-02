// Site-wide blur-up for images: every <img> that is still downloading gets the
// `img-loading` class (blurred + shimmer placeholder, see index.css) and loses it
// once it has loaded, so nothing ever shows up as an empty box.
// Opt out on a specific image with `data-no-blur`.

const mark = (img) => {
  if (img.hasAttribute("data-no-blur")) return;
  if (img.complete && img.naturalWidth > 0) {
    img.classList.remove("img-loading");
  } else {
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
  const done = (e) => {
    if (e.target?.tagName === "IMG") e.target.classList.remove("img-loading");
  };
  document.addEventListener("load", done, true);
  document.addEventListener("error", done, true);

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
