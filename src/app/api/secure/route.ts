import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

const allowed = (process.env.ALLOWED_EMAILS || "")
  .split(",")
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });
  
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const email = decoded.email?.toLowerCase();
    if (email && (allowed.length === 0 || allowed.includes(email))) {
      return NextResponse.json({ ok: true, email, uid: decoded.uid });
    }
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  } catch (e: any) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
