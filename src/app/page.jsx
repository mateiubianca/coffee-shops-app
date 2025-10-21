import { CoffeeShopList } from '@app/coffee-shops/components/coffee-shops-list'
import { CoffeeShopsFilters } from '@app/coffee-shops/components/coffee-shops-filters'

import { Suspense } from 'react'

export default async function Page() {
  return (
    <div className="p-8 flex flex-col gap-10 w-full ">
      <h1 className="text-3xl font-bold text-center">Coffee Addicts</h1>
      <div className="flex flex-row gap-4 justify-between">
        <CoffeeShopsFilters />
        <Suspense fallback={<div>Loading coffee shops...</div>}>
          <CoffeeShopList />
        </Suspense>
      </div>
    </div>
  )
}
