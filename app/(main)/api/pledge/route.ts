import { NextRequest, NextResponse } from "next/server";

const FIELDS = [
  "full_name",
  "email",
  "phone",
  "country",
  "organisation",
  "pathway",
  "amount_range",
  "message",
] as const;

const MAX_LEN: Record<string, number> = {
  full_name: 120,
  email: 160,
  phone: 32,
  country: 80,
  organisation: 160,
  pathway: 40,
  amount_range: 40,
  message: 2000,
};

export async function POST(req: NextRequest) {
  try {
    const sheetUrl = process.env.GOOGLE_PLEDGE_SHEET_URL;
    if (!sheetUrl) {
      console.error("GOOGLE_PLEDGE_SHEET_URL is not configured");
      return NextResponse.json(
        { success: false, error: "Pledge backend not configured" },
        { status: 503 }
      );
    }

    const body = await req.json();

    // Allowlist + length-cap every field; drop anything else
    const payload: Record<string, string> = { form_type: "pledge" };
    for (const f of FIELDS) {
      const v = typeof body[f] === "string" ? body[f].trim() : "";
      payload[f] = v.slice(0, MAX_LEN[f]);
    }

    const missing = ["full_name", "email", "phone", "country", "pathway", "amount_range"].filter(
      (f) => !payload[f]
    );
    if (missing.length || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return NextResponse.json(
        { success: false, error: "Required fields missing or email invalid" },
        { status: 400 }
      );
    }

    const res = await fetch(sheetUrl, {
      method: "POST",
      redirect: "follow",
      // GAS reads e.postData.contents regardless — text/plain avoids preflight redirect issues
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const raw = await res.text();

    let data: { success: boolean; error?: string };
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("GAS non-JSON response:", raw.slice(0, 300));
      return NextResponse.json(
        { success: false, error: "Unexpected response from sheet API" },
        { status: 500 }
      );
    }

    if (!data.success) {
      return NextResponse.json({ success: false, error: data.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Pledge API error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
