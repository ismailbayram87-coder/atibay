import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const users = JSON.parse(fileContents)
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const users = await request.json()
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json')
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write users' }, { status: 500 })
  }
}
