'use client'

import { useRef } from 'react'
import ModalConfirmacao from '@/components/ModalConfirmacao'
import { apagarCliente } from './actions'

export default function BotaoApagar({ id }: { id: string }) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <ModalConfirmacao
      mensagem="Este cliente vai ser apagado permanentemente."
      onConfirmar={() => formRef.current?.requestSubmit()}
    >
      <form ref={formRef} action={apagarCliente}>
        <input type="hidden" name="id" value={id} />
        <button
          type="button"
          className="text-sm text-red-400 hover:text-red-600 transition"
        >
          Apagar
        </button>
      </form>
    </ModalConfirmacao>
  )
}
