// Renders one line with **bold**, *italic* and [links](url) — the inline formatting
// FAQ points keep when imported from Word. Deliberately not full Markdown, so older
// plain points ("1. Near metro", "24*7 water") show exactly as before.
const TOKEN = /(\*\*[^*]+?\*\*|\*(?!\s)[^*\n]+?\*(?!\w)|\[[^\]]+\]\([^)\s]+\))/g;

export default function InlineMarkdown({ text }) {
  const value = String(text ?? "");
  return value.split(TOKEN).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{link[1]}</a>;
    if (/^\*[^*]+\*$/.test(part) && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}
