import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'tr'
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'dictionaries', `${lang}.json`)
    const fileContents = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'tr'
  
  try {
    const data = await request.json()
    const filePath = path.join(process.cwd(), 'src', 'dictionaries', `${lang}.json`)
    
    // Validate that the request doesn't override critical structure
    // In a real scenario, this would have strict validation
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true, message: 'Content updated successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write content' }, { status: 500 })
  }
}
