import type { PostAiAction } from "@/lib/postAiValidation";

export type ActionConfig = {
  id: PostAiAction;
  label: string;
  description: string;
  helpText: string;
};

export const ACTIONS: ActionConfig[] = [
  {
    id: "reviewTitle",
    label: "Review title",
    description: "Checks whether your title matches the post content.",
    helpText:
      "Best when the draft is mostly written and you want a clearer, more accurate headline.",
  },
  {
    id: "improveImages",
    label: "Improve image text",
    description: "Adds or improves image alt text using the article context.",
    helpText:
      "Useful after adding photos. This improves accessibility without changing your image files.",
  },
  {
    id: "outline",
    label: "Create starter outline",
    description: "Builds a simple title, slug, excerpt, and starter structure.",
    helpText:
      "Good for a blank page when you know the topic but have not started writing yet.",
  },
  {
    id: "fullDraft",
    label: "Draft the post",
    description: "Writes a longer draft from your current topic and notes.",
    helpText:
      "Best for getting a first draft quickly, then editing it in your own voice.",
  },
  {
    id: "excerpt",
    label: "Write short summary",
    description:
      "Creates a short summary for the blog list and search preview.",
    helpText:
      "Use after the main content is written so the summary reflects the final article.",
  },
  {
    id: "titleIdeas",
    label: "Suggest more titles",
    description: "Generates extra title and slug options.",
    helpText:
      "Helpful when the current title is okay but you want stronger alternatives.",
  },
  {
    id: "faq",
    label: "Add FAQ section",
    description: "Creates a short FAQ block you can add to the article.",
    helpText:
      "Useful for service posts where homeowners often ask the same questions.",
  },
  {
    id: "improveHtml",
    label: "Polish writing",
    description: "Improves clarity and flow in the current draft.",
    helpText:
      "Best after you have a draft and want it cleaned up without changing the topic.",
  },
];
