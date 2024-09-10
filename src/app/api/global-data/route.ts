import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = 'https://api.coingecko.com/api/v3/global';

    const res = await fetch(url, {
      method: 'GET'
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