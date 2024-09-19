import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = 'https://two-memes-find.loca.lt/api/cryptos';
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store' 
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Ошибка при получении данных' })
    }

    const data = await res.json()

    const response = NextResponse.json(data)

    response.headers.set('Cache-Control', 'no-store')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response
  } catch (error) {
    return NextResponse.json({ error: 'Произошла ошибка' })
  }
}
