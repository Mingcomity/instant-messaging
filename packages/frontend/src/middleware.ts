import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // 反向代理
  const apiUrlStart = ['/auth', '/message', '/user']
  let pathname = req.nextUrl.pathname
  if (apiUrlStart.some((val) => pathname.startsWith(val))) {
    if(req.nextUrl.search) pathname += req.nextUrl.search
    return NextResponse.rewrite(new URL(pathname, process.env.HTTPAPIURL))
  }
  // 路由重定向
  const session = req.cookies.get('session')
  if (pathname === '/home' && !session) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin))
  } else if (pathname === '/home' && session) {
    return NextResponse.next()
  } else if (pathname !== '/home' && session) {
    return NextResponse.redirect(new URL('/home', req.nextUrl.origin))
  }
  return NextResponse.next()
}

// 匹配器
export const config = {
  // (?!_next) 匹配不包含 _next 路径
  matcher: ['/((?!_next/static|api|favicon.ico|bgImage1.jpg).*)']
}
