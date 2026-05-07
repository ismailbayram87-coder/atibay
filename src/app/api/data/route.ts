import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  
  if (!type || (type !== 'settings' && type !== 'media')) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', `${type}.json`)
    const fileContents = await fs.readFile(filePath, 'utf8')
    return NextResponse.json(JSON.parse(fileContents))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  
  if (!type || (type !== 'settings' && type !== 'media')) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }
  
  try {
    const data = await request.json()
    const filePath = path.join(process.cwd(), 'src', 'data', `${type}.json`)
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true, message: `${type} updated successfully` })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 })
  }
}
