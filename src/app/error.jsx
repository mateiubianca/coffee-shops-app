'use client'

import { Button } from '@app/components/ui/button'

export default function ErrorPage() {
  return (
    <div className="w-full p-10 h-screen flex flex-col gap-10 justify-center items-center">
      <h1 className="text-3xl font-bold text-center">
        Something went wrong while loading the coffee shops.
      </h1>
      <Button
        onClick={() => {
          window.location.href = '/'
        }}
      >
        Reload Page
      </Button>
    </div>
  )
}
