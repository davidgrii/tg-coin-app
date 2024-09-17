import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl

 if (url.pathname === '/') {
   url.pathname = '/market'
   return NextResponse.redirect(new URL('/market', req.url))
 }

 return NextResponse.next()
}

export const config = {
  matcher: ['/'], 
};