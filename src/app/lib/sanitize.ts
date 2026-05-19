import sanitizeHtml from "sanitize-html";

const BASE_ALLOWED_SCHEMES = ["http", "https", "mailto"];

export function sanitizeBlogHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "h1",
      "h2",
      "h3",
      "h4",
      "blockquote",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "u",
      "a",
      "img",
      "hr",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: BASE_ALLOWED_SCHEMES,
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    allowedClasses: {},
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
        },
      }),
    },
  }).trim();
}

export function sanitizeAiHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["h3", "p", "ul", "ol", "li", "strong"],
    allowedAttributes: {},
    allowedSchemes: BASE_ALLOWED_SCHEMES,
  }).trim();
}
