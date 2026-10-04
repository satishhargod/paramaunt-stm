import pool from "@/app/lib/db"


// ============================
// GET TEACHERS
// ============================
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 100;

    const search = searchParams.get("search") || "";
    const gender = searchParams.get("gender") || "";
    const designation = searchParams.get("designation") || "";
    const status = 1;
    const offset = (page - 1) * limit;

    let where = "WHERE 1=1";
     where += ` AND status = ?`;
    let values = [];
    values.push(status);
    // search
    if (search) {
      where += `
        AND (
          first_name LIKE ?
          OR last_name LIKE ?
          OR email LIKE ?
          OR phone LIKE ?
        )
      `;

      values.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    // gender filter
    if (gender) {
      where += ` AND gender = ?`;
      values.push(gender);
    }

    // designation filter
    if (designation) {
      where += ` AND designation = ?`;
      values.push(designation);
    }

    // total count
    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM teachers ${where}`,
      values
    );

    const total = countRows[0].total;

    // data
    const [rows] = await pool.query(
      `
      SELECT *
      FROM teachers
      ${where}
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [...values, limit, offset]
    );

    return Response.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: rows,
    });
  } catch (error) {
    console.log(error);

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
// ADD TEACHER
// ============================
export async function POST(req) {
  try {
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

    // =========================
    // CHECK EMAIL EXISTS
    // =========================
    const [existingTeacher] = await pool.query(
      `SELECT id FROM teachers WHERE email = ? LIMIT 1`,
      [email]
    );

    if (existingTeacher.length > 0) {
      return Response.json(
        {
          success: false,
          message: "Email already exists",
          status:409
        },
        { status: 409 }
      );
    }

    // =========================
    // INSERT TEACHER
    // =========================
    const [result] = await pool.query(
      `
      INSERT INTO teachers (
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
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      ]
    );

    return Response.json({
      success: true,
      message: "Teacher added successfully",
      teacherId: result.insertId,
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}