import pool from "@/app/lib/db"


// ============================
// GET SINGLE TEACHER
// ============================
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const [rows] = await pool.query(
      `SELECT * FROM teachers WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Teacher not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}


// ============================
// UPDATE TEACHER
// ============================
export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const body = await req.json();

    const {
      first_name,
      last_name,
      gender,
      dob,
      email,
      profile_img,
      phone,
      address,
      joining_date,
      designation,
      qualification,
      experience_years,
      status,
    } = body;

    await pool.query(
      `
      UPDATE teachers
      SET
        first_name = ?,
        last_name = ?,
        gender = ?,
        dob = ?,
        email = ?,
        profile_img = ?,
        phone = ?,
        address = ?,
        joining_date = ?,
        designation = ?,
        qualification = ?,
        experience_years = ?,
        status = ?
      WHERE id = ?
      `,
      [
        first_name,
        last_name,
        gender,
        dob,
        email,
        profile_img,
        phone,
        address,
        joining_date,
        designation,
        qualification,
        experience_years,
        status,
        id,
      ]
    );

    return Response.json({
      success: true,
      message: "Teacher updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}


// ============================
// DELETE TEACHER
// ============================
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await pool.query(
      `DELETE FROM teachers WHERE id = ?`,
      [id]
    );

    return Response.json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}