import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathArray } = await params;
    
    // 解碼路徑中的每個部分
    const decodedPath = pathArray.map(segment => decodeURIComponent(segment));
    
    // 構建文件路徑
    const filePath = path.join(
      process.cwd(),
      'public',
      'sounds',
      ...decodedPath
    );
    
    console.log('Requested audio file:', filePath);
    console.log('File exists:', fs.existsSync(filePath));

    // 檢查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.error('Audio file not found:', filePath);
      console.error('Requested path array:', pathArray);
      console.error('Decoded path:', decodedPath);
      return new NextResponse(`File not found: ${filePath}`, { status: 404 });
    }

    // 讀取文件
    const fileBuffer = fs.readFileSync(filePath);
    
    // 根據文件擴展名設置正確的 MIME 類型
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.flac': 'audio/flac',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.ogg': 'audio/ogg',
      '.m4a': 'audio/mp4',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // 返回文件
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.length.toString(),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving audio file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
