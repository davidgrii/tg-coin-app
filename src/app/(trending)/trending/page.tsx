import { Container } from '@/components'
import TrendingClientPage from '@/app/(trending)/trending/trending-client-page'

const fetchTrendingCrypto = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/trending`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    return await res.json()
  } catch (error) {
    console.error('Ошибка при загрузке трендовых данных:', error)
  }
}

export default async function TrendingPage() {
  const trendingCryptoData = await fetchTrendingCrypto()

  return (
    <Container className={'pt-0'}>

      <TrendingClientPage initialData={trendingCryptoData} />
    </Container>
  )
}
