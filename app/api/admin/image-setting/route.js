import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

// GET by type  →  /api/admin/modal-image?type=home-page-modal
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "home-page-modal";

    const [rows] = await pool.execute(
      `SELECT * FROM images_paths WHERE type = ? ORDER BY id DESC LIMIT 1`,
      [type]
    );

    return NextResponse.json({
      success: true,
      data: rows[0] || null,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST – create new record
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, redirect, img_path, type, status } = body;

    if (!title || !type) {
      return NextResponse.json(
        { success: false, message: "Title and type are required" },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      `INSERT INTO images_paths (title, redirect, img_path, type, status)
       VALUES (?, ?, ?, ?, ?)`,
      [title, redirect || null, img_path || null, type, status || "active"]
    );

    return NextResponse.json({
      success: true,
      message: "Created successfully",
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}