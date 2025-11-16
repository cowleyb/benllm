import { auth } from "@/src/lib/server"
import { toNextJsHandler } from "better-auth/next-js";
export const { GET, POST } = toNextJsHandler(auth.handler);