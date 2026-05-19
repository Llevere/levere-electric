export type PostAiAction =
  | "reviewTitle"
  | "titleIdeas"
  | "outline"
  | "excerpt"
  | "fullDraft"
  | "faq"
  | "improveHtml"
  | "improveImages";

export type PostAiInput = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  prompt?: string;
};

type ValidationResult = {
  valid: boolean;
  message: string;
};

function hasText(value?: string) {
  return Boolean(value?.trim());
}

function hasImages(content?: string) {
  return /<img\b[^>]*>/i.test(content ?? "");
}

function hasTopicSignal(input: PostAiInput) {
  return (
    hasText(input.title) ||
    hasText(input.excerpt) ||
    hasText(input.content) ||
    hasText(input.prompt)
  );
}

export function validatePostAiInput(
  action: PostAiAction,
  input: PostAiInput,
): ValidationResult {
  switch (action) {
    case "reviewTitle":
      if (!hasText(input.title) && !hasText(input.content)) {
        return {
          valid: false,
          message: "Add a title and some post content before reviewing the title.",
        };
      }
      if (!hasText(input.title)) {
        return {
          valid: false,
          message: "Add a title before reviewing whether it matches the post.",
        };
      }
      if (!hasText(input.content)) {
        return {
          valid: false,
          message: "Add some post content before reviewing whether the title fits it.",
        };
      }
      return { valid: true, message: "" };

    case "titleIdeas":
      if (!hasTopicSignal(input)) {
        return {
          valid: false,
          message: "Add a title, summary, content, or extra notes so title ideas have a topic to work from.",
        };
      }
      return { valid: true, message: "" };

    case "outline":
      if (!hasTopicSignal(input)) {
        return {
          valid: false,
          message: "Add a title, summary, or extra notes before generating a starter outline.",
        };
      }
      return { valid: true, message: "" };

    case "excerpt":
      if (!hasText(input.content)) {
        return {
          valid: false,
          message: "Add the main post content before generating a short summary.",
        };
      }
      return { valid: true, message: "" };

    case "fullDraft":
      if (!hasTopicSignal(input)) {
        return {
          valid: false,
          message: "Add a topic first using the title, summary, content, or extra notes before drafting the post.",
        };
      }
      return { valid: true, message: "" };

    case "faq":
      if (!hasText(input.content) && !hasText(input.title) && !hasText(input.excerpt)) {
        return {
          valid: false,
          message: "Add the post topic or draft content before generating an FAQ section.",
        };
      }
      return { valid: true, message: "" };

    case "improveHtml":
      if (!hasText(input.content)) {
        return {
          valid: false,
          message: "Add some post content before asking the tool to polish the writing.",
        };
      }
      return { valid: true, message: "" };

    case "improveImages":
      if (!hasImages(input.content)) {
        return {
          valid: false,
          message: "Add at least one image to the post before improving image text.",
        };
      }
      return { valid: true, message: "" };
  }
}
