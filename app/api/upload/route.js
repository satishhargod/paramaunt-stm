import { uploadFile } from "@/app/lib/uploadFile";

export async function POST(req) {
  const formData = await req.formData();

  const file = formData.get("file");
  const folder = formData.get("folder") || "default";

  console.log("FILE 👉", file);
  console.log("FOLDER 👉", folder);

  if (!file) {
    return Response.json(
      { message: "File not received" },
      { status: 400 }
    );
  }

  try {
    // ✅ dynamic folder use
    const imageUrl = await uploadFile(file, folder);

    return Response.json({
      message: "Uploaded",
      url: imageUrl,
    });
  } catch (err) {
    return Response.json(
      { message: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}