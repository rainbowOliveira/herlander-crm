'use client'

import { apagarSessao } from './actions'

export default function BotaoApagar({ id }: { id: string }) {
  return (
    <form action={apagarSessao}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={e => { if (!confirm('Apagar esta sessão?')) e.preventDefault() }}
        className="text-sm text-red-400 hover:text-red-600 transition"
      >
        Apagar
      </button>
    </form>
  )
}
