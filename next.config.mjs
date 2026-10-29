if (typeof globalThis.File === "undefined") {
  try {
    const { File } = await import("node:buffer");
    if (File) {
      // @ts-ignore
      globalThis.File = File;
    }
  } catch (e) {
    // ignore
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
