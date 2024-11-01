import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'

function App() {
  return (
    <>
      <h1 className="text-3xl text-red-500">Hello world</h1>
      <h2 className="font-medium">Hello world</h2>
      <h3 className="underline-offset-8 underline">Hello world</h3>
      <Button>Clique aqui</Button>
      <br />
      <Label>Nome</Label>
      <Input />
    </>
  )
}

export default App
