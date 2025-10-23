'use client'

import React, { useRef } from 'react'
import { Input } from '@app/components/ui/input'
import { Label } from '@app/components/ui/label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const CoffeeShopsFilters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filterRef = useRef(null)

  const [xPosition, setXPosition] = React.useState(searchParams.get('x') || '')
  const [yPosition, setYPosition] = React.useState(searchParams.get('y') || '')
  const [name, setName] = React.useState(searchParams.get('name') || '')

  const onFilterCoffeeShops = (x, y, name) => {
    const params = new URLSearchParams(searchParams)

    if (name.trim() !== '') {
      params.set('name', name.trim())
    } else {
      params.delete('name')
    }

    if (x !== '' && !isNaN(x)) {
      params.set('x', x)
    } else {
      params.delete('x')
    }

    if (y !== '' && !isNaN(y)) {
      params.set('y', y)
    } else {
      params.delete('y')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  const onFilterChange = (...args) => {
    clearTimeout(filterRef.current)

    filterRef.current = setTimeout(() => {
      onFilterCoffeeShops(...args)
    }, 500)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Filters</h2>
      <div className="flex flex-row gap-4">
        <Label htmlFor="xPosition" className="w-20">
          X
        </Label>
        <Input
          type="number"
          id="xPosition"
          placeholder="X coordinate"
          value={xPosition}
          onChange={(e) => {
            setXPosition(e.target.value)
            onFilterChange(e.target.value, yPosition, name)
          }}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Label htmlFor="yPosition" className="w-20">
          Y
        </Label>
        <Input
          type="number"
          id="yPosition"
          placeholder="Y coordinate"
          value={yPosition}
          onChange={(e) => {
            setYPosition(e.target.value)
            onFilterChange(xPosition, e.target.value, name)
          }}
        />
      </div>

      <div className="flex flex-row gap-4">
        <Label htmlFor="name" className="w-20">
          Name
        </Label>
        <Input
          id="name"
          placeholder="Coffee Shop Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            onFilterChange(xPosition, yPosition, e.target.value)
          }}
        />
      </div>
    </div>
  )
}
