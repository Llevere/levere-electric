export type DiffRow = {
  left: string;
  right: string;
  status: "same" | "changed" | "added" | "removed";
};

function decodeHtml(text: string) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function htmlToDiffLines(html: string) {
  return decodeHtml(
    html
      .replace(/<(h1|h2|h3|h4|p|li|blockquote)[^>]*>/gi, "")
      .replace(/<\/(h1|h2|h3|h4|p|li|blockquote)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<hr\s*\/?>/gi, "\n---\n")
      .replace(/<[^>]+>/g, ""),
  )
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export function buildDiffRows(currentHtml: string, nextHtml: string): DiffRow[] {
  const leftLines = htmlToDiffLines(currentHtml);
  const rightLines = htmlToDiffLines(nextHtml);
  const leftLen = leftLines.length;
  const rightLen = rightLines.length;
  const dp = Array.from({ length: leftLen + 1 }, () =>
    Array(rightLen + 1).fill(0),
  );

  for (let i = leftLen - 1; i >= 0; i -= 1) {
    for (let j = rightLen - 1; j >= 0; j -= 1) {
      dp[i][j] =
        leftLines[i] === rightLines[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const rows: DiffRow[] = [];
  let i = 0;
  let j = 0;

  while (i < leftLen && j < rightLen) {
    if (leftLines[i] === rightLines[j]) {
      rows.push({ left: leftLines[i], right: rightLines[j], status: "same" });
      i += 1;
      j += 1;
      continue;
    }

    const removed: string[] = [];
    const added: string[] = [];

    while (i < leftLen && j < rightLen && leftLines[i] !== rightLines[j]) {
      if (dp[i + 1][j] >= dp[i][j + 1]) {
        removed.push(leftLines[i]);
        i += 1;
      } else {
        added.push(rightLines[j]);
        j += 1;
      }
    }

    const maxLen = Math.max(removed.length, added.length);
    for (let index = 0; index < maxLen; index += 1) {
      const left = removed[index] ?? "";
      const right = added[index] ?? "";
      rows.push({
        left,
        right,
        status: left && right ? "changed" : left ? "removed" : "added",
      });
    }
  }

  while (i < leftLen) {
    rows.push({ left: leftLines[i], right: "", status: "removed" });
    i += 1;
  }

  while (j < rightLen) {
    rows.push({ left: "", right: rightLines[j], status: "added" });
    j += 1;
  }

  return rows;
}
