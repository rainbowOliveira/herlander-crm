'use client'

import { useState, useRef, useEffect } from 'react'

interface Option {
  value: string
  label: string
}

interface Props {
  name: string
  options: Option[]
  placeholder?: string
  defaultValue?: string
  required?: boolean
  className?: string
}

export default function SelectPesquisavel({
  name,
  options,
  placeholder = 'Selecionar…',
  defaultValue,
  required,
  className,
}: Props) {
  const [selecionado, setSelecionado] = useState<Option | null>(
    options.find(o => o.value === defaultValue) ?? null
  )
  const [pesquisa, setPesquisa] = useState('')
  const [aberto, setAberto] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const pesquisaRef = useRef<HTMLInputElement>(null)

  const filtradas = options.filter(o =>
    o.label.toLowerCase().includes(pesquisa.toLowerCase())
  )

  useEffect(() => {
    function fechar(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAberto(false)
        setPesquisa('')
      }
    }
    document.addEventListener('mousedown', fechar)
    return () => document.removeEventListener('mousedown', fechar)
  }, [])

  useEffect(() => {
    if (aberto) pesquisaRef.current?.focus()
  }, [aberto])

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={selecionado?.value ?? ''} />

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setAberto(v => !v)}
        className={`${className} flex items-center justify-between gap-2 text-left`}
      >
        <span className={selecionado ? 'text-gray-900' : 'text-gray-400'}>
          {selecionado ? selecionado.label : placeholder}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 text-gray-400 transition-transform ${aberto ? 'rotate-180' : ''}`}
        >
          <polyline points="2,4 7,10 12,4" />
        </svg>
      </button>

      {/* Dropdown */}
      {aberto && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={pesquisaRef}
              type="text"
              placeholder="Pesquisar…"
              value={pesquisa}
              onChange={e => setPesquisa(e.target.value)}
              className="w-full text-sm px-2 py-1 focus:outline-none text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto">
            {filtradas.length === 0 ? (
              <li className="text-sm text-gray-400 px-3 py-2 text-center">Sem resultados</li>
            ) : (
              filtradas.map(o => (
                <li key={o.value}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelecionado(o)
                      setAberto(false)
                      setPesquisa('')
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-gray-50 active:opacity-60 ${
                      selecionado?.value === o.value ? 'font-medium text-gray-900 bg-gray-50' : 'text-gray-700'
                    }`}
                  >
                    {o.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
