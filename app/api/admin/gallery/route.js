
import pool from "@/app/lib/db"

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const year = searchParams.get("year");
  const type = searchParams.get("type");
  const upload_type = searchParams.get("upload_type");

  let query = `SELECT * FROM gallery WHERE 1=1`;
  let params = [];

  if (year) {
    query += ` AND year = ?`;
    params.push(year);
  }

  if (type) {
    query += ` AND type = ?`;
    params.push(type);
  }

  if (upload_type) {
    query += ` AND upload_type = ?`;
    params.push(upload_type);
  }

  query += ` ORDER BY id DESC`;

  const [data] = await pool.execute(query, params);

  return Response.json({ success: true, data });
}

// ADD
export async function POST(req) {
  const body = await req.json();

  const { upload_type, title, year, type, image, video_url } = body;

  await pool.execute(
    `INSERT INTO gallery (upload_type, title, year, type, image, video_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [upload_type, title, year, type, image || null, video_url || null]
  );

  return Response.json({ success: true });
}