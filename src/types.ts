export type ProjectType =
  | "business-website"
  | "saas"
  | "newsletter-saas"
  | "course-platform"
  | "ai-assistant-app";

export type ProjectTypeOption = {
  name: string;
  value: ProjectType;
  description: string;
};

export type Answers = {
  projectName: string;
  projectSlug: string;
  projectType: ProjectType;
  useConvex: boolean;
  useClerk: boolean;
  useStripe: boolean;
  useMdx: boolean;
  includeAssistant: boolean;
  includeBlog: boolean;
  initGit: boolean;
  installDependencies: boolean;
  overwrite: boolean;
};

export type TemplateContext = {
  projectName: string;
  projectSlug: string;
  projectType: string;
  year: string;
};

export type FeatureFlags = Pick<
  Answers,
  "useConvex" | "useClerk" | "useStripe" | "useMdx" | "includeAssistant" | "includeBlog"
>;
