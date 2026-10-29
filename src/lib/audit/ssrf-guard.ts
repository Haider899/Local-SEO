import dns from "dns/promises";

/**
 * Validates a target URL and enforces strict SSRF protections:
 * - Must be http or https
 * - Disallows private/internal IP ranges (RFC 1918, RFC 3927, Loopback, Cloud Metadata)
 * - Disallows localhost, .internal, .local domains
 */

const PRIVATE_IP_RANGES = [
  // 127.0.0.0/8 (Loopback)
  /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  // 10.0.0.0/8 (Private Network)
  /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  // 172.16.0.0/12 (Private Network)
  /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/,
  // 192.168.0.0/16 (Private Network)
  /^192\.168\.\d{1,3}\.\d{1,3}$/,
  // 169.254.0.0/16 (Link-local, AWS/GCP/Azure Metadata 169.254.169.254)
  /^169\.254\.\d{1,3}\.\d{1,3}$/,
  // 0.0.0.0
  /^0\.0\.0\.0$/,
  // IPv6 loopback and link-local
  /^::1$/,
  /^fc00:/i,
  /^fe80:/i,
];

const DISALLOWED_HOSTNAMES = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "metadata.google.internal",
  "instance-data",
  "169.254.169.254",
];

export interface UrlValidationResult {
  isValid: boolean;
  normalizedUrl: string;
  domain: string;
  error?: string;
}

export function isPrivateIp(ip: string): boolean {
  return PRIVATE_IP_RANGES.some((regex) => regex.test(ip));
}

export async function validateAndSanitizeUrl(rawInput: string): Promise<UrlValidationResult> {
  if (!rawInput || typeof rawInput !== "string") {
    return { isValid: false, normalizedUrl: "", domain: "", error: "Please enter a valid website URL." };
  }

  let trimmed = rawInput.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    trimmed = `https://${trimmed}`;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmed);
  } catch {
    return { isValid: false, normalizedUrl: "", domain: "", error: "Invalid URL format." };
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return { isValid: false, normalizedUrl: "", domain: "", error: "Only HTTP and HTTPS protocols are supported." };
  }

  const hostname = parsedUrl.hostname.toLowerCase();

  if (DISALLOWED_HOSTNAMES.includes(hostname) || hostname.endsWith(".internal") || hostname.endsWith(".local") || hostname.endsWith(".localhost")) {
    return {
      isValid: false,
      normalizedUrl: "",
      domain: "",
      error: "Access to internal, private, or local resources is strictly prohibited.",
    };
  }

  // Check if hostname itself is a raw IP
  if (isPrivateIp(hostname)) {
    return {
      isValid: false,
      normalizedUrl: "",
      domain: "",
      error: "Access to private or local network IP addresses is prohibited.",
    };
  }

  // Resolve DNS to verify resolved IPs are not in private ranges
  try {
    const addresses = await dns.lookup(hostname, { all: true });
    for (const record of addresses) {
      if (isPrivateIp(record.address)) {
        return {
          isValid: false,
          normalizedUrl: "",
          domain: "",
          error: `Domain resolves to a disallowed private address (${record.address}).`,
        };
      }
    }
  } catch (dnsErr) {
    // If DNS fails completely, return error
    return {
      isValid: false,
      normalizedUrl: "",
      domain: "",
      error: `Could not resolve domain '${hostname}'. Please ensure the domain exists and is publicly accessible.`,
    };
  }

  return {
    isValid: true,
    normalizedUrl: parsedUrl.toString(),
    domain: hostname.replace(/^www\./, ""),
  };
}
