import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const users = JSON.parse(fileContents)
    
    const user = users.find((u: any) => u.username === username && u.password === password)
    
    if (user) {
      const response = NextResponse.json({ success: true })
      // Create a simple auth cookie
      response.cookies.set('admin_token', 'authenticated_' + user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
      })
      return response
    } else {
      return NextResponse.json({ success: false, error: 'Kullanıcı adı veya şifre hatalı.' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Sunucu hatası' }, { status: 500 })
  }
}
