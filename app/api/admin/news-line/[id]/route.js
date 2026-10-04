import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const { redirect, description } = await req.json();

    await pool.execute(
      `
      UPDATE newsline
      SET
        redirect = ?,
        description = ?
      WHERE id = ?
      `,
      [redirect, description, id]
    );

    return NextResponse.json({
      success: true,
      message: "Newsline updated successfully",
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