import { AppRouter } from "@/server/trpc/routes/app";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
