'use client'

import { useCoffeeShopsLoading } from '@app/coffee-shops/contexts/coffee-shops-loading.context'
import { CoffeeShopsLoading } from './coffee-shops-loading'

export const CoffeeShopsListWrapper = ({ children }) => {
  const { isLoading } = useCoffeeShopsLoading()

  if (isLoading) {
    return <CoffeeShopsLoading />
  }

  return <>{children}</>
}
