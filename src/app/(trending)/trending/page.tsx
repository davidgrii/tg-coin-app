import { Categories, Container } from '@/components'
import TrendingClientPage from '@/app/(trending)/trending/trending-client-page'


const fetchTrendingCrypto = async () => {
  try {
    const res = await fetch('https://priceme.store/api/trending')
    return await res.json()
  } catch (error) {
    console.error('Ошибка при загрузке трендовых данных:', error)
  }
}

export default async function TrendingPage() {
  const trendingCryptoData = await fetchTrendingCrypto()

  return (
    <Container className={'pt-0'}>

      <Categories />

      {/*<TrendingTableHeader />*/}

      <TrendingClientPage initialData={trendingCryptoData} />
    </Container>
  )
}
