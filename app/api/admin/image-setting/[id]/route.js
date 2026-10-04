import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

// GET single by ID
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const [rows] = await pool.execute(
      "SELECT * FROM `images_paths` WHERE id = ?",
      [id]
    );

    return NextResponse.json({
      success: true,
      data: rows[0] || null,
    });
  } catch (error) {
    console.error("GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT - Update by ID
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      title,
      redirect = null,
      img_path = null,
      type,
      status = "active",
    } = body;

    if (!title || !type) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and type are required",
        },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      `UPDATE \`images_paths\`
       SET
         title = ?,
         redirect = ?,
         img_path = ?,
         type = ?,
         status = ?,
         updated_at = NOW()
       WHERE id = ?`,
      [title, redirect, img_path, type, status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Record not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("PUT Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE by ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const [result] = await pool.execute(
      "DELETE FROM `images_paths` WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Record not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}