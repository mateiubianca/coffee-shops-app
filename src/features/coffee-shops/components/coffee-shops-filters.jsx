'use client'

import React, { useRef } from 'react'
import { Input } from '@app/components/ui/input'
import { Label } from '@app/components/ui/label'

import { useCoffeeShops } from '@app/coffee-shops/contexts/coffee-shops.context'

export const CoffeeShopsFilters = () => {
  const filterRef = useRef(null)

  const [xPosition, setXPosition] = React.useState('')
  const [yPosition, setYPosition] = React.useState('')
  const [name, setName] = React.useState('')
  const { filterCoffeeShops } = useCoffeeShops()

  const onFilterCoffeeShops = (x, y, name) => {
    const params = {}

    if (name.trim() !== '') {
      params.name = name.trim()
    }

    if (x !== '' && !isNaN(x) && y !== '' && !isNaN(y)) {
      params.position = { x: Number(x), y: Number(y) }
    }

    filterCoffeeShops(params)
  }

  const onCoordinateChange = (x, y) => {
    clearTimeout(filterRef.current)

    filterRef.current = setTimeout(() => {
      onFilterCoffeeShops(x, y, name)
    }, 500)
  }

  const onNameChange = (value) => {
    clearTimeout(filterRef.current)

    filterRef.current = setTimeout(() => {
      onFilterCoffeeShops(xPosition, yPosition, value)
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
            onCoordinateChange(e.target.value, yPosition)
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
            onCoordinateChange(xPosition, e.target.value)
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
            onNameChange(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
