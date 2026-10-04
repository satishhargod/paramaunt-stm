import pool from "@/app/lib/db"
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const year        = searchParams.get("year");
    const type        = searchParams.get("type");
    const upload_type = searchParams.get("upload_type");

    let conditions = [];
    let params     = [];

    if (year && year !== "all") {
      conditions.push("year = ?");
      params.push(Number(year));
    }

    if (type && type !== "all") {
      conditions.push("type = ?");
      params.push(type);
    }

    if (upload_type && upload_type !== "all") {
      conditions.push("upload_type = ?");
      params.push(upload_type);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const [rows] = await pool.execute(
      `SELECT * FROM gallery ${where} ORDER BY created_at DESC`,
      params
    );

    // ── Get distinct years for tabs ──────────────────────
    const [yearRows] = await pool.execute(
      `SELECT DISTINCT year FROM gallery ORDER BY year DESC`
    );

    // ── Get distinct types for filter ────────────────────
    const [typeRows] = await pool.execute(
      `SELECT DISTINCT type FROM gallery ORDER BY type ASC`
    );

    return NextResponse.json({
      success: true,
      data   : rows,
      years  : yearRows.map((r) => r.year),
      types  : typeRows.map((r) => r.type),
    });

  } catch (error) {
    console.error("[gallery GET]", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}