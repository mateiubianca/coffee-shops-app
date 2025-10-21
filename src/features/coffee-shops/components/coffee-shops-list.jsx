import { getCoffeeShopsService } from '@app/coffee-shops/services/coffee-shops.service'

export const CoffeeShopList = async () => {
  const result = await getCoffeeShopsService()

  if (!result || result.length === 0) {
    return <div>No coffee shops available.</div>
  }

  return (
    <div className="w-1/2 justify-center flex">
      <div className="flex flex-col gap-4 border p-4 rounded-lg">
        {result.map((shop) => (
          <div key={shop.id}>
            <h2>{shop.name}</h2>
            <p>
              {shop.x}, {shop.y}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
