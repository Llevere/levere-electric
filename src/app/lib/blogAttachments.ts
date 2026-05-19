export type BlogAttachment = {
  src: string;
  alt: string;
  title: string;
};

function decodeAttribute(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function getAttr(tag: string, name: string) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return decodeAttribute((match?.[1] ?? "").trim());
}

export function splitBlogContentAndAttachments(html: string) {
  const attachments: BlogAttachment[] = [];

  const contentWithoutImages = html
    .replace(/<img\b[^>]*>/gi, (tag) => {
      const src = getAttr(tag, "src");
      if (!src) return "";

      attachments.push({
        src,
        alt: getAttr(tag, "alt"),
        title: getAttr(tag, "title"),
      });

      return "";
    })
    .replace(/(<br\s*\/?>\s*){2,}/gi, "<br />")
    .trim();

  return {
    content: contentWithoutImages,
    attachments,
  };
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildBlogContentWithAttachments(content: string, attachments: BlogAttachment[]) {
  const attachmentHtml = attachments
    .map((attachment) => {
      const attrs = [`src="${escapeAttribute(attachment.src)}"`];

      if (attachment.alt) {
        attrs.push(`alt="${escapeAttribute(attachment.alt)}"`);
      }

      if (attachment.title) {
        attrs.push(`title="${escapeAttribute(attachment.title)}"`);
      }

      return `<img ${attrs.join(" ")} />`;
    })
    .join("\n");

  return [content.trim(), attachmentHtml.trim()].filter(Boolean).join("\n");
}
