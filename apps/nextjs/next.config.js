import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import("./src/env");

/** @type {import("next").NextConfig} */
const nextConfig = {
  /* config options here */
    transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],

};

export default nextConfig;
