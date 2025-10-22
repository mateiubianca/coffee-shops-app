export const CoffeeShopsLoading = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-md py-2">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </>
  )
}
