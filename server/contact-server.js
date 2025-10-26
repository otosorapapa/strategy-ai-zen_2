import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "contact-submissions.json");

const PORT = Number.parseInt(process.env.PORT ?? "3001", 10);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "*";

async function ensureDataStore() {
  try {
    await access(DATA_DIR, constants.F_OK);
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await access(DATA_FILE, constants.F_OK);
  } catch {
    await writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function loadSubmissions() {
  const raw = await readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

async function saveSubmissions(submissions) {
  const serialized = JSON.stringify(submissions, null, 2);
  await writeFile(DATA_FILE, serialized, "utf8");
}

function applyCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalSize = 0;

    req.on("data", (chunk) => {
      chunks.push(chunk);
      totalSize += chunk.length;
      if (totalSize > 1_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });

    req.on("error", reject);
  });
}

function validatePayload(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    errors.push("リクエストボディが不正です。");
    return errors;
  }

  if (!payload.name || typeof payload.name !== "string" || payload.name.trim().length === 0) {
    errors.push("氏名は必須です。");
  }

  if (!payload.company || typeof payload.company !== "string" || payload.company.trim().length === 0) {
    errors.push("会社名は必須です。");
  }

  if (!payload.email || typeof payload.email !== "string" || payload.email.trim().length === 0) {
    errors.push("メールアドレスは必須です。");
  }

  if (payload.message && typeof payload.message !== "string") {
    errors.push("相談内容は文字列で指定してください。");
  }

  return errors;
}

const server = createServer(async (req, res) => {
  applyCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (!req.url) {
    sendJson(res, 404, { message: "Not Found" });
    return;
  }

  if (req.url === "/api/contact" && req.method === "POST") {
    try {
      const rawBody = await readRequestBody(req);
      let payload = {};

      try {
        payload = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        sendJson(res, 400, { message: "JSONの形式が不正です。" });
        return;
      }
      const errors = validatePayload(payload);

      if (errors.length > 0) {
        sendJson(res, 400, { message: "バリデーションエラー", errors });
        return;
      }

      const submissions = await loadSubmissions();
      const submission = {
        id: randomUUID(),
        name: payload.name.trim(),
        company: payload.company.trim(),
        email: payload.email.trim(),
        message: payload.message?.toString().trim() ?? "",
        receivedAt: new Date().toISOString(),
      };

      submissions.push(submission);
      await saveSubmissions(submissions);

      sendJson(res, 201, { message: "お問い合わせ内容を保存しました。", submission });
    } catch (error) {
      if (error instanceof Error && error.message === "Payload too large") {
        sendJson(res, 413, { message: "送信データが大きすぎます。" });
        return;
      }

      console.error("Failed to handle POST /api/contact", error);
      sendJson(res, 500, { message: "サーバー内部でエラーが発生しました。" });
    }
    return;
  }

  if (req.url === "/api/contact" && req.method === "GET") {
    try {
      const submissions = await loadSubmissions();
      sendJson(res, 200, { submissions });
    } catch (error) {
      console.error("Failed to handle GET /api/contact", error);
      sendJson(res, 500, { message: "サーバー内部でエラーが発生しました。" });
    }
    return;
  }

  sendJson(res, 404, { message: "Not Found" });
});

async function start() {
  try {
    await ensureDataStore();
    server.listen(PORT, () => {
      console.log(`Contact form server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start contact form server", error);
    process.exit(1);
  }
}

start();
