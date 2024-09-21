import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = 'https://stale-brooms-rule.loca.lt/api/global';

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Ошибка при получении данных' })
    }

    const data = await res.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Произошла ошибка' })
  }
}