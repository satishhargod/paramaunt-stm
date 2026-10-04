import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

// GET SINGLE
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const [rows] = await pool.execute(
  `
  SELECT
    *,
    DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS date_of_birth
  FROM transfer_certificates
  WHERE id = ?
  `,
  [id]
);

    return NextResponse.json({
      success: true,
      data: rows[0],
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

// UPDATE
export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const body = await req.json();

    const {
      student_name,
      year_of_admission,
      scholar_number,
      previous_class_passed,
      date_of_birth,
       father_name,
      mother_name,
      year_of_issued_tc,
      tc_number,
      tc_image
    } = body;

    await pool.execute(
      `
      UPDATE transfer_certificates
      SET
        student_name = ?,
        year_of_admission = ?,
        scholar_number = ?,
        previous_class_passed = ?,
        date_of_birth = ?,
        father_name = ?,
        mother_name = ?,
        year_of_issued_tc = ?,
        tc_number = ?,
        tc_image = ?
      WHERE id = ?
      `,
      [
        student_name,
        year_of_admission,
        scholar_number,
        previous_class_passed,
        date_of_birth,
        father_name,
        mother_name,
        year_of_issued_tc,
        tc_number,
        tc_image,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "TC updated successfully",
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

// DELETE
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await pool.execute(
      `
      DELETE FROM transfer_certificates
      WHERE id = ?
      `,
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "TC deleted successfully",
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