export interface Page {
  pageNumber: number;
  text: string;
  illustrationPrompt: string;
}

export interface Story {
  id: string;
  title: string;
  moral: string;
  pages: Page[];
  createdAt: string;
  parameters: StoryParameters;
}

export interface StoryParameters {
  childName: string;
  childAge: number;
  interests: string;
  style: string;
  triggers: string;
  triggerOption: "gently_mention" | "do_not_mention";
  length: "short" | "medium" | "long";
}

export type ThemeFont = "dyslexic" | "serif" | "comic";
