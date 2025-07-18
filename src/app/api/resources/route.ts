import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { resourceSchema } from "@/utils/validation";

async function requireUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) throw new Error("NO_TOKEN");
  const decoded = await adminAuth.verifyIdToken(token);
  const allowed = (process.env.ALLOWED_EMAILS || "")
    .split(",").map(e=>e.trim().toLowerCase()).filter(Boolean);
  if (allowed.length && !allowed.includes(decoded.email?.toLowerCase() || "")) {
    throw new Error("NOT_ALLOWED");
  }
  return decoded;
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser(req);
    const body = await req.json();
    const parsed = resourceSchema.parse(body);

    const now = Date.now();
    const ref = await adminDb.collection("resources").add({
      ...parsed,
      createdAt: now,
      updatedAt: now
    });

    return NextResponse.json({ id: ref.id, ...parsed }, { status: 201 });
  } catch (e: any) {
    const msg = e.message || "ERROR";
    const code = msg === "NO_TOKEN" ? 401 : msg === "NOT_ALLOWED" ? 403 : 400;
    return NextResponse.json({ error: msg }, { status: code });
  }
}
