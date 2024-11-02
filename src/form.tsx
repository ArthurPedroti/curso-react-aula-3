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
import dayjs, { ManipulateType } from 'dayjs'
import goldBRL from './assets/goldBRL.json'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { cn } from './lib/utils'
dayjs.extend(weekOfYear)

export default function Form() {
  const [quantity, setQuantity] = useState(0)
  const [measure, setMeasure] = useState<ManipulateType>('years')
  const [loss, setLoss] = useState(0)
  const [size, setSize] = useState('12')

  function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const today = dayjs()
    const dateSelected = dayjs().subtract(quantity, measure)
    const quotations = goldBRL.map((quotation) => ({
      ...quotation,
      date: dayjs(quotation.date.split('.').reverse().join('-'))
    }))

    const quotationToday = quotations.find(
      (quotation) =>
        today.year() === quotation.date.year() &&
        today.week() === quotation.date.week()
    )
    const quotationDateSelected = quotations.find(
      (quotation) =>
        dateSelected.year() === quotation.date.year() &&
        dateSelected.week() === quotation.date.week()
    )
    if (quotationToday && quotationDateSelected) {
      const onceWeight = 31.1035
      const quotationDiff =
        quotationToday.goldBRL - quotationDateSelected.goldBRL
      const quotationPerGram = quotationDiff / onceWeight
      const loss = quotationPerGram * Number(size)
      setLoss(loss)
    }
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
          <div>
            <Label>Tamanho da aliança</Label>

            <Select
              value={size}
              onValueChange={(value: string) => {
                setSize(value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tamanho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">Fininha (sou humilde)</SelectItem>
                <SelectItem value="12">Média (sou normal)</SelectItem>
                <SelectItem value="18">Grossa (sou patrão)</SelectItem>
                <SelectItem value="24">Gigante (sou gangster)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="self-end mt-2">Calcular</Button>
      </form>
      {loss !== 0 && (
        <p
          className={cn([
            'self-center font-medium text-xl m-6 text-center',
            loss > 0 ? 'text-red-500' : 'text-green-500'
          ])}
        >
          O seu {loss > 0 ? 'prejuizo' : 'lucro'} por enrolar sua namorada(o) é{' '}
          {Math.abs(loss).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </p>
      )}
    </div>
  )
}
