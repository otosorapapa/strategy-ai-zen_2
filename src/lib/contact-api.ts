export type ContactFormPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  preferredDate?: string;
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

type ContactForm7FieldError = {
  message?: string;
};

type ContactForm7Response = {
  status?: string;
  message?: string;
  posted_data_hash?: string;
  invalid_fields?: ContactForm7FieldError[];
};

function isContactForm7Endpoint(endpoint: string): boolean {
  return /(?:contact-form-7|wpcf7)/.test(endpoint);
}

function buildForm7Message(payload: ContactFormPayload): string {
  const details: string[] = [];

  const trimmedCompany = payload.company.trim();
  if (trimmedCompany.length > 0) {
    details.push(`会社名: ${trimmedCompany}`);
  }

  const trimmedPhone = payload.phone?.trim();
  if (trimmedPhone && trimmedPhone.length > 0) {
    details.push(`電話番号: ${trimmedPhone}`);
  }

  const trimmedPreferredDate = payload.preferredDate?.trim();
  if (trimmedPreferredDate && trimmedPreferredDate.length > 0) {
    details.push(`希望日時: ${trimmedPreferredDate}`);
  }

  const trimmedMessage = payload.message.trim();
  if (trimmedMessage.length > 0) {
    if (details.length > 0) {
      details.push("");
    }
    details.push(trimmedMessage);
  }

  return details.join("\n");
}

function createContactForm7Body(payload: ContactFormPayload): FormData {
  const formData = new FormData();
  const trimmedName = payload.name.trim();
  if (trimmedName.length > 0) {
    formData.append("your-name", trimmedName);
  }

  const trimmedEmail = payload.email.trim();
  if (trimmedEmail.length > 0) {
    formData.append("your-email", trimmedEmail);
  }

  const trimmedCompany = payload.company.trim();
  if (trimmedCompany.length > 0) {
    formData.append("your-company", trimmedCompany);
  }

  formData.append("your-subject", "【Web】お問い合わせ");
  const message = buildForm7Message(payload);
  formData.append("your-message", message);

  const trimmedPhone = payload.phone?.trim();
  if (trimmedPhone && trimmedPhone.length > 0) {
    formData.append("tel-07", trimmedPhone);
  }

  const trimmedPreferredDate = payload.preferredDate?.trim();
  if (trimmedPreferredDate && trimmedPreferredDate.length > 0) {
    formData.append("preferred-date", trimmedPreferredDate);
  }

  return formData;
}

function getContactForm7ErrorMessage(
  data: ContactForm7Response | null
): string | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  if (Array.isArray(data.invalid_fields) && data.invalid_fields.length > 0) {
    const messages = data.invalid_fields
      .map((field) => field?.message?.trim())
      .filter((message): message is string => !!message);
    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  if (typeof data.message === "string" && data.message.trim().length > 0) {
    return data.message.trim();
  }

  return null;
}

function ensureSubmissionId(fallback?: string): string {
  if (fallback && fallback.trim().length > 0) {
    return fallback;
  }

  if (typeof crypto !== "undefined") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }

    if (typeof crypto.getRandomValues === "function") {
      const array = new Uint32Array(4);
      crypto.getRandomValues(array);
      return Array.from(array, (value) =>
        value.toString(16).padStart(8, "0")
      ).join("-");
    }
  }

  return `submission-${Date.now()}`;
}

function isContactForm7Response(data: unknown): data is ContactForm7Response {
  return (
    typeof data === "object" &&
    data !== null &&
    "status" in data &&
    typeof (data as ContactForm7Response).status === "string"
  );
}

async function submitViaContactForm7(
  endpoint: string,
  payload: ContactFormPayload
): Promise<ContactSubmissionResponse> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: createContactForm7Body(payload),
  });

  let parsed: ContactForm7Response | null = null;
  let rawBody: string | null = null;
  try {
    rawBody = await response.text();
    if (rawBody) {
      parsed = JSON.parse(rawBody) as ContactForm7Response;
    }
  } catch (error) {
    console.warn("Failed to parse Contact Form 7 response", error, rawBody);
  }

  if (!response.ok) {
    const message =
      getContactForm7ErrorMessage(parsed) ??
      `サーバーとの通信に失敗しました。(status: ${response.status})`;
    throw new Error(message);
  }

  if (!parsed || !isContactForm7Response(parsed)) {
    throw new Error("送信に失敗しました。時間をおいて再度お試しください。");
  }

  if (parsed.status !== "mail_sent") {
    const message =
      getContactForm7ErrorMessage(parsed) ??
      "送信に失敗しました。時間をおいて再度お試しください。";
    throw new Error(message);
  }

  const submission: ContactSubmission = {
    ...payload,
    id: ensureSubmissionId(parsed.posted_data_hash),
    receivedAt: new Date().toISOString(),
  };

  const successMessage =
    typeof parsed.message === "string" && parsed.message.trim().length > 0
      ? parsed.message.trim()
      : "送信が完了しました。";

  return {
    message: successMessage,
    submission,
  };
}

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
  if (isContactForm7Endpoint(endpoint)) {
    return submitViaContactForm7(endpoint, payload);
  }
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
