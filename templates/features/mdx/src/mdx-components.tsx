import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-4xl font-semibold tracking-normal" {...props} />,
    h2: (props) => <h2 className="mt-10 text-2xl font-semibold" {...props} />,
    p: (props) => <p className="mt-5 leading-8 text-[var(--muted-foreground)]" {...props} />,
    ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6" {...props} />,
    ...components
  };
}
