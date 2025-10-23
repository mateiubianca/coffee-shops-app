import { getCoffeeShopsService } from '@app/coffee-shops/services/coffee-shops.service'

export const CoffeeShopList = async ({ searchParams }) => {
  const { noResults, errorCase, x, y, name } = await searchParams
  const result = await getCoffeeShopsService({
    noResults,
    errorCase,
    x,
    y,
    name,
  })

  if (result.length === 0) {
    return <p className="text-neutral-500">No coffee shops found.</p>
  }

  return (
    <>
      {result.map((shop) => (
        <div
          key={shop.id}
          className={shop.distance && '[&:nth-child(-n+3)]:text-chart-4'}
        >
          <h2>{shop.name}</h2>
          <p>
            {shop.x}, {shop.y}
            {shop.distance && <>, Distance: {shop.distance}</>}
          </p>
        </div>
      ))}
    </>
  )
}
