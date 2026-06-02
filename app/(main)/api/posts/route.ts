import { wpQuery } from "@/lib/graphql";
import { BLOG_LISTING_QUERY } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const after  = req.nextUrl.searchParams.get("after")  ?? null;
  const search = req.nextUrl.searchParams.get("search") ?? null;
  const data = await wpQuery(BLOG_LISTING_QUERY, { first: 12, after, search });
  return NextResponse.json(data);
}
