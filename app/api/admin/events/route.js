import { NextResponse } from "next/server";
import pool from "@/app/lib/db"


// ✅ GET all events
export async function GET() {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM events ORDER BY date DESC`
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// ✅ CREATE event
export async function POST(req) {
  try {
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

    // validation
    if (!title || !date) {
      return NextResponse.json(
        { success: false, message: "Title & Date required" },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      `INSERT INTO events 
      (title, description, location, date, time, type, image, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        location,
        date,
        time,
        type,
        image,
        status === "inactive" ? 0 : 1,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Event created",
      id: result.insertId,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}