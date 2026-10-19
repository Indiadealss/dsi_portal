// Project descriptions can be Markdown (imported from Word). Cards and one-line
// previews show plain text, so strip the Markdown syntax there.
// Plain-text descriptions pass through unchanged.
export const toPlainText = (md) =>
  String(md ?? "")
    .replace(/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/gm, "") // table separator rows
    .replace(/^\s*#{1,6}\s+/gm, "")                                      // headings
    .replace(/^\s*[-*+]\s+/gm, "")                                       // bullet markers (numbers kept)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")                             // links
    .replace(/(\*\*|__)(.+?)\1/g, "$2")                                  // bold
    .replace(/(^|[^*\w])\*(?!\s)([^*\n]+?)\*(?!\w)/g, "$1$2")            // italic
    .replace(/\s*\|\s*/g, " ")                                           // table pipes
    .replace(/\\\|/g, "|")
    .replace(/\s+/g, " ")
    .trim();
