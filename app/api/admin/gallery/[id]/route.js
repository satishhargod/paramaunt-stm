import pool from "@/app/lib/db"

export async function GET(req, { params }) {
  const { id } = await params;

  const [data] = await pool.execute(`SELECT * FROM gallery WHERE id=?`, [id]);

  return Response.json({ success: true, data: data[0] });
}

// UPDATE
export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  const { upload_type, title, year, type, image, video_url } = body;

  await pool.execute(
    `UPDATE gallery 
     SET upload_type=?, title=?, year=?, type=?, image=?, video_url=? 
     WHERE id=?`,
    [upload_type, title, year, type, image || null, video_url || null, id]
  );

  return Response.json({ success: true });
}

// DELETE
export async function DELETE(req, { params }) {
  const { id } = await params;

  await pool.execute(`DELETE FROM gallery WHERE id=?`, [id]);

  return Response.json({ success: true });
}