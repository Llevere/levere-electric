type GeminiPart = {
  text?: string;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiPart[];
  };
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
  error?: {
    message?: string;
  };
};

const DEFAULT_GEMINI_TIMEOUT_MS = 15000;
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash-lite";

class GeminiRequestError extends Error {
  status?: number;
  isRetryable: boolean;

  constructor(message: string, options?: { status?: number; isRetryable?: boolean }) {
    super(message);
    this.name = "GeminiRequestError";
    this.status = options?.status;
    this.isRetryable = options?.isRetryable ?? false;
  }
}

function getGeminiModels() {
  const primary = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
  const fallbackModels = [
    process.env.GEMINI_FALLBACK_MODEL?.trim(),
    process.env.GEMINI_FALLBACK_MODEL_2?.trim(),
  ].filter((value): value is string => Boolean(value));

  return [primary, ...fallbackModels].filter(
    (model, index, allModels) => allModels.indexOf(model) === index,
  );
}

function isRetryableStatus(status: number) {
  return status === 408 || status === 429 || status >= 500;
}

function extractJson(text: string): string {
  const trimmed = text.trim();

  if (trimmed.startsWith("```")) {
    return trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }

  return trimmed;
}

function parseGeminiText(data: GeminiResponse): string {
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();

  if (!text) {
    throw new Error(data.error?.message ?? "Gemini returned an empty response.");
  }

  return text;
}

async function requestGemini({
  apiKey,
  model,
  systemInstruction,
  prompt,
  temperature,
  maxOutputTokens,
  timeoutMs,
  responseMimeType,
}: {
  apiKey: string;
  model: string;
  systemInstruction: string;
  prompt: string;
  temperature: number;
  maxOutputTokens?: number;
  timeoutMs: number;
  responseMimeType?: "application/json";
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature,
            ...(responseMimeType ? { responseMimeType } : {}),
            ...(maxOutputTokens ? { maxOutputTokens } : {}),
          },
        }),
      },
    );

    const data = (await res.json()) as GeminiResponse;

    if (!res.ok) {
      throw new GeminiRequestError(
        data.error?.message ?? "Gemini request failed.",
        {
          status: res.status,
          isRetryable: isRetryableStatus(res.status),
        },
      );
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new GeminiRequestError(
        "AI request timed out. Please try again with a shorter or simpler request.",
        { isRetryable: true },
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function generateWithGeminiFallback({
  systemInstruction,
  prompt,
  temperature,
  maxOutputTokens,
  timeoutMs,
  responseMimeType,
}: {
  systemInstruction: string;
  prompt: string;
  temperature: number;
  maxOutputTokens?: number;
  timeoutMs: number;
  responseMimeType?: "application/json";
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY.");
  }

  const models = getGeminiModels();
  let lastError: unknown;

  for (let index = 0; index < models.length; index += 1) {
    const model = models[index];
    const hasFallbackRemaining = index < models.length - 1;

    try {
      const data = await requestGemini({
        apiKey,
        model,
        systemInstruction,
        prompt,
        temperature,
        maxOutputTokens,
        timeoutMs,
        responseMimeType,
      });

      if (index > 0) {
        console.warn(
          `[gemini] Primary model failed; using fallback model "${model}".`,
        );
      }

      return data;
    } catch (error) {
      lastError = error;

      if (
        !(error instanceof GeminiRequestError) ||
        !error.isRetryable ||
        !hasFallbackRemaining
      ) {
        throw error;
      }

      console.warn(
        `[gemini] Model "${model}" failed with a retryable error. Trying fallback model.`,
        error.message,
      );
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Gemini request failed.");
}

export async function generateGeminiJson<T>({
  systemInstruction,
  prompt,
  temperature = 0.5,
  maxOutputTokens,
  timeoutMs = DEFAULT_GEMINI_TIMEOUT_MS,
}: {
  systemInstruction: string;
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
  timeoutMs?: number;
}): Promise<T> {
  const data = await generateWithGeminiFallback({
    systemInstruction,
    prompt,
    temperature,
    maxOutputTokens,
    timeoutMs,
    responseMimeType: "application/json",
  });

  return JSON.parse(extractJson(parseGeminiText(data))) as T;
}

export async function generateGeminiText({
  systemInstruction,
  prompt,
  temperature = 0.5,
  maxOutputTokens,
  timeoutMs = DEFAULT_GEMINI_TIMEOUT_MS,
}: {
  systemInstruction: string;
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
  timeoutMs?: number;
}): Promise<string> {
  const data = await generateWithGeminiFallback({
    systemInstruction,
    prompt,
    temperature,
    maxOutputTokens,
    timeoutMs,
  });

  return parseGeminiText(data);
}
