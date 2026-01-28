import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 不再需要語言中間件，允許所有請求通過
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 匹配所有路徑，除了API路由、static files等
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'
  ]
};