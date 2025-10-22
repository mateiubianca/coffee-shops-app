'use client'

import { useEffect } from 'react'
import { useCoffeeShops } from '@app/coffee-shops/contexts/coffee-shops.context'

export const CoffeeShopsList = ({ result }) => {
  const { initializeCoffeeShops, coffeeShops } = useCoffeeShops()

  useEffect(() => {
    initializeCoffeeShops(result)
  }, [result, initializeCoffeeShops])

  if (!coffeeShops || coffeeShops.length === 0) {
    return <div>No coffee shops available.</div>
  }

  return (
    <>
      {coffeeShops.map((shop) => (
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
