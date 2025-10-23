import { CoffeeShopList } from '@app/features/coffee-shops/components/coffee-shops-list'
import { CoffeeShopsFilters } from '@app/coffee-shops/components/coffee-shops-filters'

export const metadata = {
  title: 'Coffee Addicts',
  description: 'Find the best coffee shops around you!',
}

export default async function Page({ searchParams }) {
  return (
    <div className="p-8 flex flex-col gap-10 w-full sm:h-screen sm:overflow-hidden">
      <h1 className="text-3xl font-bold text-center">Coffee Addicts</h1>
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-4 justify-between items-start container mx-auto h-full sm:overflow-auto">
        <CoffeeShopsFilters />
        <div className="sm:w-1/2 justify-center flex flex-col gap-4 max-h-full w-full">
          <h2 className="text-2xl">Coffee Shops List</h2>
          <div className="flex flex-col gap-4 border p-4 rounded-lg w-full overflow-y-auto h-full">
            <CoffeeShopList searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  )
}
