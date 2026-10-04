import { NextResponse } from "next/server";
import pool from "@/app/lib/db"

// ✅ GET single event
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const [rows] = await pool.execute(
      `SELECT * FROM events WHERE id = ?`,
      [id]
    );

    if (!rows.length) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// ✅ UPDATE event
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      title,
      description,
      location,
      date,
      time,
      type,
      image,
      status,
    } = body;

    await pool.execute(
      `UPDATE events SET 
        title=?, 
        description=?, 
        location=?, 
        date=?, 
        time=?, 
        type=?, 
        image=?, 
        status=? 
      WHERE id=?`,
      [
        title,
        description,
        location,
        date,
        time,
        type,
        image,
        status === "inactive" ? 0 : 1,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Event updated",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE event
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await pool.execute(`DELETE FROM events WHERE id=?`, [id]);

    return NextResponse.json({
      success: true,
      message: "Event deleted",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}