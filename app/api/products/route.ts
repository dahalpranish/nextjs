import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search") ?? "";

    const rows = await sql`
      SELECT id, name, price::float8 AS price, image_url
      FROM products
      WHERE name ILIKE ${"%" + search + "%"}
      ORDER BY id
    `;

    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}