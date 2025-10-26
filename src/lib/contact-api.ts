export type ContactFormPayload = {
  name: string;
  company: string;
  email: string;
  message: string;
};

export type ContactSubmission = ContactFormPayload & {
  id: string;
  receivedAt: string;
};

export type ContactSubmissionResponse = {
  message: string;
  submission: ContactSubmission;
};

const DEFAULT_ENDPOINT = "http://localhost:3001/api/contact";

function resolveEndpoint() {
  const explicitEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
  if (explicitEndpoint && explicitEndpoint.trim().length > 0) {
    const normalized = explicitEndpoint.trim();
    if (normalized === "/") {
      return normalized;
    }
    return normalized.endsWith("/")
      ? normalized.slice(0, -1)
      : normalized;
  }

  const baseUrl = import.meta.env.VITE_CONTACT_API_BASE_URL as string | undefined;
  if (baseUrl && baseUrl.trim().length > 0) {
    const normalizedBase = baseUrl.trim().replace(/\/+$/, "");
    return `${normalizedBase}/api/contact`;
  }

  return DEFAULT_ENDPOINT;
}

async function parseError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      return data.errors.join(" ");
    }
    if (typeof data?.message === "string" && data.message.trim().length > 0) {
      return data.message;
    }
  } catch (error) {
    console.warn("Failed to parse error response", error);
  }

  return `サーバーとの通信に失敗しました。(status: ${response.status})`;
}

export async function submitContactForm(
  payload: ContactFormPayload
): Promise<ContactSubmissionResponse> {
  const endpoint = resolveEndpoint();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message);
  }

  return response.json();
}
