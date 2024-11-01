import { FormEvent, useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './components/ui/select'

export default function Form() {
  const [quantity, setQuantity] = useState(0)
  const [measure, setMeasure] = useState('years')

  function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(quantity, measure)
  }

  return (
    <div
      className="p-4 
    mx-auto 
    max-w-xl 
    flex 
    flex-col 
    gap-2"
    >
      <h1 className="text-2xl self-center font-medium">Nosso Formulário</h1>
      <form onSubmit={(e) => handleForm(e)} className="flex flex-col">
        <div className="flex flex-col gap-2">
          <Label>Quantidade</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              onChange={(e) => {
                setQuantity(Number(e.target.value))
              }}
              defaultValue={quantity}
            />
            <Select
              onValueChange={(e) => {
                setMeasure(e)
              }}
              defaultValue={measure}
            >
              <SelectTrigger className="w-72">
                <SelectValue placeholder="Medida" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="months">Meses</SelectItem>
                <SelectItem value="years">Anos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="self-end mt-2">Calcular</Button>
      </form>
    </div>
  )
}
