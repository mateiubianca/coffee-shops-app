'use client'

import { useCoffeeShopsLoading } from '@app/coffee-shops/contexts/coffee-shops-loading.context'
import { Spinner } from '@app/components/ui/spinner'

export const CoffeeShopsListWrapper = ({ children }) => {
  const { isLoading } = useCoffeeShopsLoading()

  return (
    <div className="flex flex-col gap-4 border p-4 rounded-lg w-full overflow-y-auto h-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
          <Spinner className="size-8" />
        </div>
      )}
      {children}
    </div>
  )
}
