import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = 'https://twenty-pugs-invite.loca.lt/api/cryptos';
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
