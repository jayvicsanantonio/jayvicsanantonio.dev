import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SENTRY_DSN: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.string().url(),
  },
  runtimeEnv: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
});
