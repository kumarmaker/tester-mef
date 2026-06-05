import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(process.env.GOOGLE_SHEET_URL!, {
      method: "POST",
      redirect: "follow",
      // GAS reads e.postData.contents regardless — text/plain avoids preflight redirect issues
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    });

    const raw = await res.text();

    let data: { success: boolean; error?: string };
    try {
      data = JSON.parse(raw);
    } catch {
      // GAS returned non-JSON (HTML error page, redirect loop, etc.)
      console.error("GAS non-JSON response:", raw.slice(0, 300));
      return NextResponse.json({ success: false, error: "Unexpected response from sheet API" }, { status: 500 });
    }

    if (!data.success) {
      return NextResponse.json({ success: false, error: data.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Engage API error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
