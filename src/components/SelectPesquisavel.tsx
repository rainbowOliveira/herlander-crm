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
  className?: string
}

export default function SelectPesquisavel({
  name,
  options,
  placeholder = 'Selecionar…',
  defaultValue,
  className,
}: Props) {
  const defaultOption = options.find(o => o.value === defaultValue) ?? null

  const [selecionado, setSelecionado] = useState<Option | null>(defaultOption)
  const [pesquisa, setPesquisa] = useState(defaultOption?.label ?? '')
  const [aberto, setAberto] = useState(false)
  const [aPesquisar, setAPesquisar] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtradas = aPesquisar
    ? options.filter(o => o.label.toLowerCase().includes(pesquisa.toLowerCase()))
    : options

  useEffect(() => {
    function fechar(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPesquisa(selecionado?.label ?? '')
        setAberto(false)
        setAPesquisar(false)
      }
    }
    document.addEventListener('mousedown', fechar)
    return () => document.removeEventListener('mousedown', fechar)
  }, [selecionado])

  function handleFocus() {
    setAberto(true)
    setAPesquisar(false)
    inputRef.current?.select()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPesquisa(e.target.value)
    setAPesquisar(true)
    setAberto(true)
  }

  function handleSelect(option: Option) {
    setSelecionado(option)
    setPesquisa(option.label)
    setAberto(false)
    setAPesquisar(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={selecionado?.value ?? ''} />

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={pesquisa}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          autoComplete="off"
          className={`${className} pr-8`}
        />
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 transition-transform ${aberto ? 'rotate-180' : ''}`}
        >
          <polyline points="2,4 7,10 12,4" />
        </svg>
      </div>

      {aberto && (
        <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-y-auto">
          {filtradas.length === 0 ? (
            <li className="text-sm text-gray-400 px-3 py-2 text-center">Sem resultados</li>
          ) : (
            filtradas.map(o => (
              <li key={o.value}>
                <button
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleSelect(o)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-gray-50 active:opacity-60 ${
                    selecionado?.value === o.value
                      ? 'font-medium text-gray-900 bg-gray-50'
                      : 'text-gray-700'
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
