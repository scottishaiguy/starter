import type { ProjectType, ProjectTypeOption } from "./types.js";

export const projectTypes: ProjectTypeOption[] = [
  {
    name: "Business Website",
    value: "business-website",
    description: "A premium marketing site for service-led businesses."
  },
  {
    name: "SaaS",
    value: "saas",
    description: "A product app with dashboard, auth, billing, and backend state."
  },
  {
    name: "Newsletter SaaS",
    value: "newsletter-saas",
    description: "A content and subscription product for paid newsletters."
  },
  {
    name: "Course Platform",
    value: "course-platform",
    description: "A learning platform with courses, lessons, and paid access."
  },
  {
    name: "AI Assistant App",
    value: "ai-assistant-app",
    description: "A deterministic assistant product shell."
  }
];

export function getProjectTypeLabel(projectType: ProjectType): string {
  return projectTypes.find((option) => option.value === projectType)?.name ?? projectType;
}

export function shouldDefaultStripe(projectType: ProjectType): boolean {
  return projectType === "saas" || projectType === "newsletter-saas" || projectType === "course-platform";
}
