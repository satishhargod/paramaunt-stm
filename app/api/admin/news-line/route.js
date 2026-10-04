import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM newsline ORDER BY id DESC LIMIT 1`
    );

    return NextResponse.json({
      success: true,
      data: rows[0] || null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { redirect, description } = await req.json();

    const [result] = await pool.execute(
      `
      INSERT INTO newsline
      (redirect, description)
      VALUES (?, ?)
      `,
      [redirect, description]
    );

    return NextResponse.json({
      success: true,
      id: result.insertId,
      message: "Newsline created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}