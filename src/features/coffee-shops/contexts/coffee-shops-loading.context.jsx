'use client'

import React, { useMemo } from 'react'

const CoffeeShopsLoadingContext = React.createContext(undefined)

export const CoffeeShopsLoadingProvider = ({ children }) => {
  const [isLoading, startTransition] = React.useTransition()

  const value = useMemo(
    () => ({
      isLoading,
      startTransition,
    }),
    [isLoading, startTransition]
  )

  return (
    <CoffeeShopsLoadingContext.Provider value={value}>
      {children}
    </CoffeeShopsLoadingContext.Provider>
  )
}

export const useCoffeeShopsLoading = () => {
  const context = React.useContext(CoffeeShopsLoadingContext)

  if (!context) {
    throw new Error(
      'useCoffeeShopsLoading must be used within a CoffeeShopsLoadingProvider'
    )
  }

  return context
}
