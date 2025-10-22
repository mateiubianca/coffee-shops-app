'use client'

import React, { useCallback, useMemo, useRef } from 'react'
import { getSquaredEuclideanDistance } from '@app/coffee-shops/utils/distance.utils'

const CoffeeShopsContext = React.createContext(undefined)

const sortCoffeeShopsByDistance = (position, coffeeShops) => {
  const coffeeShopsWithSquaredDistance = coffeeShops.map((coffeeShop) => ({
    ...coffeeShop,
    distance: Math.sqrt(
      getSquaredEuclideanDistance(position, coffeeShop)
    ).toFixed(4),
  }))

  // We use the squaredDistance for sorting, since it is slower to calculate the square root
  return coffeeShopsWithSquaredDistance.sort(
    (coffeeShopA, coffeeShopB) => coffeeShopA.distance - coffeeShopB.distance
  )
}

const filterCoffeeShopsByName = (name, coffeeShops) => {
  return coffeeShops.filter((shop) =>
    shop.name.toLowerCase().includes(name.toLowerCase())
  )
}

export const CoffeeShopsProvider = ({ children }) => {
  const initialCoffeeShops = useRef([])
  const [coffeeShops, setCoffeeShops] = React.useState([])

  const filterCoffeeShops = ({ position, name }) => {
    let filteredShops = initialCoffeeShops.current

    if (name) {
      filteredShops = filterCoffeeShopsByName(name, filteredShops)
    }

    if (position) {
      filteredShops = sortCoffeeShopsByDistance(position, filteredShops)
    }

    setCoffeeShops(filteredShops)
  }

  const initializeCoffeeShops = useCallback(
    (shops) => {
      initialCoffeeShops.current = shops
      setCoffeeShops(shops)
    },
    [setCoffeeShops]
  )

  const value = useMemo(
    () => ({
      coffeeShops,
      initializeCoffeeShops,
      filterCoffeeShops,
    }),
    [coffeeShops, setCoffeeShops]
  )

  return (
    <CoffeeShopsContext.Provider value={value}>
      {children}
    </CoffeeShopsContext.Provider>
  )
}

export const useCoffeeShops = () => {
  const context = React.useContext(CoffeeShopsContext)
  if (context === undefined) {
    throw new Error('useCoffeeShops must be used within a CoffeeShopsProvider')
  }
  return context
}
