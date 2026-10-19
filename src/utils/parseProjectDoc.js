// Reads a project's Word file (.docx) for the post-project form, keeping the
// formatting as Markdown (headings, bold, italic, bullets, numbering, tables, links):
//   - everything above the FAQ part → description ("What makes your property unique"),
//     rendered on the project page with ReactMarkdown. The FAQ part starts at a
//     "Key FAQs" / "FAQs" / "Frequently Asked Questions" heading or the
//     "Why you should consider …" question, whichever comes first.
//   - the "Why you should consider …" question → the FAQ question, exactly as written
//     (minus "1." / "Question 1:")
//   - its answer lines, up to the next question → FAQ points (inline **bold** kept).
//     Other FAQ questions are not imported (the project page shows only this one).
// Headings are found even when numbered ("1. Why You Should Consider X",
// "Question 1: Why …") or when they are numbered-list items in Word.

// checked after NUMBER_PREFIX is stripped, so it must start the line
const WHY_QUESTION = /^why\s+(?:you\s+)?should\s+(?:you\s+)?consider\b/i;
// a short section title such as "Key FAQs", "FAQs", "Frequently Asked Questions:"
const FAQ_SECTION = /^(?:[a-z]+\s+){0,3}(?:faq'?s?|frequently\s+asked\s+questions)\s*[:.]?$/i;
const DESCRIPTION_HEADING = /^(what\s+makes\s+(your|this|the)\s+(property|project)\s+unique|description|about\s+(the\s+)?project|overview)\s*[:?.]?\s*$/i;
// "1.", "1)", "Q1", "Q1.", "Question 1:", "Que 1 -" in front of a heading
const NUMBER_PREFIX = /^\s*(?:(?:q(?:ue(?:stion)?)?\.?\s*\d*|\d+)\s*[.:)\-–]\s*|q(?:ue(?:stion)?)?\.?\s*\d+\s+)/i;

const collapse = (s) => s.replace(/\s+/g, " "); // \s also covers non-breaking spaces

// Inline HTML → Markdown (bold / italic / links / line breaks)
const inline = (node) => {
  let out = "";
  node.childNodes.forEach((child) => {
    if (child.nodeType === 3) {
      out += collapse(child.nodeValue);
      return;
    }
    if (child.nodeType !== 1) return;
    const tag = child.tagName.toLowerCase();
    const inner = inline(child);
    const wrap = (mark) => {
      // keep spaces outside the markers, or Markdown won't pick them up
      const m = inner.match(/^(\s*)(.*?)(\s*)$/s);
      return m[2] ? `${m[1]}${mark}${m[2]}${mark}${m[3]}` : inner;
    };
    if (tag === "strong" || tag === "b") out += wrap("**");
    else if (tag === "em" || tag === "i") out += wrap("*");
    else if (tag === "a" && child.getAttribute("href") && !child.getAttribute("href").startsWith("#")) out += `[${inner.trim()}](${child.getAttribute("href")})`;
    else if (tag === "br") out += "\n";
    else if (tag === "img") out += "";
    else if (tag === "ul" || tag === "ol" || tag === "table") out += ""; // handled as blocks
    else out += inner;
  });
  return out;
};

const plain = (md) => md.replace(/\*\*|\*|\[([^\]]*)\]\([^)]*\)/g, (m, link) => link ?? "").replace(/\s+/g, " ").trim();

// Flatten the document into units: block elements, and one unit per list item,
// so the FAQ heading can be found even when it sits inside a list.
const toUnits = (root) => {
  const units = [];
  let listSeq = 0;

  const walkList = (list, level, listId) => {
    const ordered = list.tagName.toLowerCase() === "ol";
    let n = 0;
    Array.from(list.children).forEach((li) => {
      if (li.tagName.toLowerCase() !== "li") return;
      n += 1;
      const md = inline(li).replace(/\n/g, " ").trim();
      if (md) units.push({ kind: "li", listId, level, ordered, n, md, text: plain(md) });
      Array.from(li.children)
        .filter((c) => /^(ul|ol)$/i.test(c.tagName))
        .forEach((sub) => walkList(sub, level + 1, listId));
    });
  };

  const walk = (el) => {
    Array.from(el.children).forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (/^h[1-6]$/.test(tag)) {
        const md = inline(child).replace(/\n/g, " ").trim();
        if (md) units.push({ kind: "heading", level: Number(tag[1]), md, text: plain(md) });
      } else if (tag === "p") {
        const md = inline(child).replace(/ *\n */g, "  \n").trim();
        if (md) units.push({ kind: "p", md, text: plain(md) });
      } else if (tag === "ul" || tag === "ol") {
        walkList(child, 0, (listSeq += 1));
      } else if (tag === "table") {
        const rows = Array.from(child.querySelectorAll("tr")).map((tr) =>
          Array.from(tr.children).map((cell) => inline(cell).replace(/\s*\n\s*/g, " ").replace(/\|/g, "\\|").trim())
        ).filter((r) => r.some(Boolean));
        if (rows.length) units.push({ kind: "table", rows, md: "", text: rows.map((r) => r.join(" | ")).join(" ") });
      } else {
        walk(child); // div, blockquote, etc.
      }
    });
  };

  walk(root);
  return units;
};

const tableMarkdown = (rows) => {
  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r) => [...r, ...Array(width - r.length).fill("")];
  const line = (r) => `| ${pad(r).join(" | ")} |`;
  return [line(rows[0]), line(Array(width).fill("---")), ...rows.slice(1).map(line)].join("\n");
};

// Units → Markdown, keeping list items of the same list together
const unitsToMarkdown = (units) => {
  const parts = [];
  units.forEach((u, i) => {
    const prev = units[i - 1];
    if (u.kind === "li") {
      const line = `${"   ".repeat(u.level)}${u.ordered ? `${u.n}.` : "-"} ${u.md}`;
      if (prev?.kind === "li" && prev.listId === u.listId) parts[parts.length - 1] += `\n${line}`;
      else parts.push(line);
    } else if (u.kind === "heading") parts.push(`${"#".repeat(Math.min(u.level + 1, 6))} ${u.md}`);
    else if (u.kind === "table") parts.push(tableMarkdown(u.rows));
    else parts.push(u.md);
  });
  return parts.join("\n\n");
};

// Main split, from mammoth's HTML. `parseHtml` returns a DOM root (DOMParser in the browser).
export const splitProjectHtml = (html, parseHtml) => {
  const root = parseHtml(html);
  const units = toUnits(root);

  const bare = (u) => u.text.replace(NUMBER_PREFIX, "").trim();
  const isWhy = (u) => u.text.length <= 200 && WHY_QUESTION.test(bare(u));
  const isFaqSection = (u) => u.text.length <= 60 && FAQ_SECTION.test(bare(u));

  const whyAt = units.findIndex(isWhy);
  const sectionAt = units.findIndex(isFaqSection);
  const faqStart = [whyAt, sectionAt].filter((i) => i !== -1).reduce((a, b) => Math.min(a, b), Infinity);

  let top = faqStart === Infinity ? units : units.slice(0, faqStart);
  if (top.length && DESCRIPTION_HEADING.test(bare(top[0]))) top = top.slice(1);

  // Question exactly as in Word, without the "1." / "Question 1:" numbering
  const why = whyAt === -1 ? null : units[whyAt];
  const faqQuestion = why ? bare(why) : "";

  // The answer ends where the next FAQ question starts
  const typedNumber = why?.text.match(/^\s*(?:q(?:ue(?:stion)?)?\.?\s*)?(\d+)/i)?.[1];
  const isNextQuestion = (u) =>
    isWhy(u) ||
    isFaqSection(u) ||
    u.kind === "heading" ||
    /^\*\*[^*]+\*\*\s*[?:.]?$/.test(u.md) ||                                   // whole line bold
    /^\s*q(?:ue(?:stion)?)?\.?\s*\d+/i.test(u.text) ||                           // "Q2", "Question 2"
    (typedNumber && new RegExp(`^\\s*${Number(typedNumber) + 1}\\s*[.:)\\-–]`).test(u.text)) || // "2." after "1."
    (why.kind === "li" && u.kind === "li" && u.listId === why.listId && u.level === why.level) ||
    (u.text.length <= 200 && /\?\s*$/.test(u.text));
  let bottom = [];
  if (why) {
    const rest = units.slice(whyAt + 1);
    const end = rest.findIndex(isNextQuestion);
    bottom = end === -1 ? rest : rest.slice(0, end);
  }

  const faqPoints = bottom.flatMap((u) =>
    u.kind === "table" ? u.rows.map((r) => r.filter(Boolean).join(" | ")) : [u.md.replace(/\s*\n\s*/g, " ")]
  )
    // typed bullet / number markers — the page already shows points as a bullet list
    .map((p) => p.replace(/^\s*(?:[•●▪◦‣\-–—*](?!\*)|\d+[.)])\s+/, "").trim())
    .filter(Boolean);

  return {
    description: unitsToMarkdown(top),
    faqQuestion,
    faqText: faqPoints.join("\n"),
    foundFaqHeading: !!why,
    foundFaqSection: sectionAt !== -1,
  };
};

export const parseProjectDoc = async (file) => {
  if (!/\.docx$/i.test(file.name)) {
    throw new Error("Please upload a .docx Word file (old .doc files are not supported — open it in Word and Save As .docx).");
  }
  const mammoth = await import("mammoth");
  const { value } = await mammoth.convertToHtml(
    { arrayBuffer: await file.arrayBuffer() },
    // images aren't part of the description — drop them instead of embedding base64
    { convertImage: mammoth.images.imgElement(() => Promise.resolve({ src: "" })) }
  );
  return splitProjectHtml(value, (html) => new DOMParser().parseFromString(`<body>${html}</body>`, "text/html").body);
};
