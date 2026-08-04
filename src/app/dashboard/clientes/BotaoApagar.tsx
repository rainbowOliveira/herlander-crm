'use client'

import { apagarCliente } from './actions'

export default function BotaoApagar({ id }: { id: string }) {
  return (
    <form action={apagarCliente}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={e => { if (!confirm('Apagar este cliente?')) e.preventDefault() }}
        className="text-sm text-red-400 hover:text-red-600 transition"
      >
        Apagar
      </button>
    </form>
  )
}
