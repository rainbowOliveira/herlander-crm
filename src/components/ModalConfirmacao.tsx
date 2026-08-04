'use client'

import { useState } from 'react'

interface Props {
  mensagem?: string
  onConfirmar: () => void
  children: React.ReactNode
}

export default function ModalConfirmacao({
  mensagem = 'Tens a certeza que queres apagar?',
  onConfirmar,
  children,
}: Props) {
  const [aberto, setAberto] = useState(false)

  return (
    <>
      <span onClick={() => setAberto(true)}>{children}</span>

      {aberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setAberto(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-gray-900 font-medium mb-1">Apagar</p>
            <p className="text-sm text-gray-500 mb-6">{mensagem}</p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setAberto(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => { onConfirmar(); setAberto(false) }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 active:scale-95 transition"
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
