import { getCoffeeShopsService } from '@app/coffee-shops/services/coffee-shops.service'
import { CoffeeShopsList } from '@app/coffee-shops/components/coffee-shops-list'

export const CoffeeShopListWrapper = async ({ searchParams }) => {
  const { noResults, errorCase } = await searchParams
  const result = await getCoffeeShopsService({ noResults, errorCase })

  return <CoffeeShopsList result={result} />
}
