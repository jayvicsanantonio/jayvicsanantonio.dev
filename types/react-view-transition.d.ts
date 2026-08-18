// Types for React's experimental ViewTransition component.
// Next's App Router vendors a React build that exports it; stable @types/react does not declare it.
import type { ComponentType, ReactNode } from "react";

declare module "react" {
  export const ViewTransition: ComponentType<{
    children?: ReactNode;
    name?: string;
    default?: string;
    enter?: string;
    exit?: string;
    update?: string;
    share?: string;
  }>;
}
