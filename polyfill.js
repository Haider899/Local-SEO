// Polyfill global File and Blob for Node.js 18 and below
if (typeof globalThis.File === "undefined" || typeof globalThis.Blob === "undefined") {
  try {
    const buffer = require("node:buffer");
    if (typeof globalThis.File === "undefined" && buffer.File) {
      globalThis.File = buffer.File;
    }
    if (typeof globalThis.Blob === "undefined" && buffer.Blob) {
      globalThis.Blob = buffer.Blob;
    }
  } catch (e) {
    // ignore
  }
}
