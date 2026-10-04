import { NextResponse } from "next/server";
import pool from "@/app/lib/db"

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      tc_number,
    } = body;

    if (!tc_number) {
      return NextResponse.json(
        {
          success: false,
          message:
            "TC Number and Password required",
        },
        { status: 400 }
      );
    }

    // const db = await pool();

    const [rows] = await pool.execute(
      `
      SELECT *
      FROM transfer_certificates
      WHERE tc_number = ?
      LIMIT 1
      `,
      [tc_number]
    );

    if (!rows.length) {
      return NextResponse.json(
        {
          success: false,
          message: "TC not found",
        },
        { status: 404 }
      );
    }

    const tc = rows[0];

    // // PASSWORD GENERATE
    // const first3 =
    //   tc.student_name
    //     ?.trim()
    //     ?.slice(0, 3)
    //     ?.toLowerCase();

    // const dob = new Date(
    //   tc.date_of_birth
    // );

    // const day = String(
    //   dob.getDate()
    // ).padStart(2, "0");

    // const month = String(
    //   dob.getMonth() + 1
    // ).padStart(2, "0");

    // const year =
    //   dob.getFullYear();

    // const generatedPassword = `${first3}${day}${month}${year}`;

    // // VERIFY
    // if (
    //   generatedPassword !==
    //   password.toLowerCase()
    // ) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message:
    //         "Invalid password",
    //     },
    //     { status: 401 }
    //   );
    // }

    return NextResponse.json({
      success: true,
      data: tc,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}