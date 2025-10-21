import { Input } from '@app/components/ui/input'
import { Label } from '@app/components/ui/label'

export const CoffeeShopsFilters = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
    </div>
  )
}
