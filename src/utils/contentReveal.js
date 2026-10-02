// Site-wide soft fade for content that appears after data loads (skeleton -> page,
// infinite-scroll cards, route changes), so nothing pops in with a jerk.
// Only sizeable in-flow blocks inside #root are faded; popups, dropdowns and
// carousel slides (which libraries move around constantly) are left alone.
// Opt out on a specific element with `data-no-reveal`.

const MIN_DESCENDANTS = 5;
const SKIP_INSIDE = ".swiper, .swiper-wrapper, .slick-list, .slick-track, [class*='embla'], .rfm-marquee-container, [data-no-reveal]";

const shouldReveal = (el) => {
  if (el.nodeType !== 1 || el.tagName === "SCRIPT" || el.tagName === "STYLE") return false;
  if (el.closest(SKIP_INSIDE)) return false;
  if (el.parentElement?.closest(".content-reveal")) return false; // an ancestor is already fading
  if (el.getElementsByTagName("*").length < MIN_DESCENDANTS) return false;
  const pos = getComputedStyle(el).position;
  return pos !== "fixed" && pos !== "absolute";
};

export const initContentReveal = (rootId = "root") => {
  if (typeof window === "undefined" || window.__contentReveal) return;
  const root = document.getElementById(rootId);
  if (!root) return;
  window.__contentReveal = true;

  document.addEventListener(
    "animationend",
    (e) => {
      if (e.animationName === "content-reveal") e.target.classList.remove("content-reveal");
    },
    true
  );

  new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (shouldReveal(node)) node.classList.add("content-reveal");
      });
    }
  }).observe(root, { childList: true, subtree: true });
};
