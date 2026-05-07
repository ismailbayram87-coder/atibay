import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create a safe, unique filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${safeName}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure the uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // Return the public URL path
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file.', details: error.message }, { status: 500 });
  }
}
