import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

// CREATE TC
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      student_name,
      year_of_admission,
      scholar_number,
      previous_class_passed,
      date_of_birth,
      year_of_issued_tc,
      tc_number,
      father_name,
      mother_name,
      tc_image
    } = body;

    const [result] = await pool.execute(
      `
      INSERT INTO transfer_certificates
      (
        student_name,
        year_of_admission,
        scholar_number,
        previous_class_passed,
        date_of_birth,
        year_of_issued_tc,
        tc_number,
        father_name,
        mother_name,
        tc_image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        student_name,
        year_of_admission,
        scholar_number,
        previous_class_passed,
        date_of_birth,
        year_of_issued_tc,
        tc_number,
        father_name,
        mother_name,
        tc_image
      ]
    );

    return NextResponse.json({
      success: true,
      message: "TC created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// GET ALL TC
export async function GET(req) {
  try {
    const { searchParams } =
      new URL(req.url);

    const page = Number(
      searchParams.get("page")
    ) || 1;

    const limit = Number(
      searchParams.get("limit")
    ) || 10;

    const search =
      searchParams.get("search") ||
      "";

    const offset =
      (page - 1) * limit;

    let where = "";
    let params = [];

    // SEARCH
    if (search) {
      where = `
        WHERE 
          student_name LIKE ?
          OR scholar_number LIKE ?
          OR tc_number LIKE ?
      `;

      params.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    // TOTAL COUNT
    const [countRows] =
      await pool.execute(
        `
        SELECT COUNT(*) as total
        FROM transfer_certificates
        ${where}
        `,
        params
      );

    const total =
      countRows[0]?.total || 0;

    // DATA
    const [rows] =
      await pool.execute(
        `
        SELECT *
        FROM transfer_certificates
        ${where}
        ORDER BY id DESC
        LIMIT ${limit}
        OFFSET ${offset}
        `,
        params
      );

    return NextResponse.json({
      success: true,
      data: rows,
      total,
      page,
      limit,
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