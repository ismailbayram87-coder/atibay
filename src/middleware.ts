import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['tr', 'en']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Handle admin routes authentication
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return
    
    const token = request.cookies.get('admin_token')
    if (!token) {
      request.nextUrl.pathname = '/admin/login'
      return NextResponse.redirect(request.nextUrl)
    }
    return
  }

  // Redirect if there is no locale
  request.nextUrl.pathname = `/tr${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.).*)']
}
