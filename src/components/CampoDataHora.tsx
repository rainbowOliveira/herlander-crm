'use client'

import { useState } from 'react'

interface Props {
  defaultDiaTodo?: boolean
  defaultValue?: string
  inputClass: string
}

export default function CampoDataHora({ defaultDiaTodo = false, defaultValue, inputClass }: Props) {
  const [diaTodo, setDiaTodo] = useState(defaultDiaTodo)
  const [valorData, setValorData] = useState(defaultValue?.slice(0, 10) ?? '')
  const [valorHora, setValorHora] = useState(
    !defaultDiaTodo && defaultValue?.length === 16 ? defaultValue.slice(11, 16) : ''
  )

  function handleToggle(checked: boolean) {
    setDiaTodo(checked)
  }

  // Value submitted to the server action via the hidden input
  const dataHoraSubmit = diaTodo
    ? valorData
    : valorData ? `${valorData}T${valorHora || '00:00'}` : ''

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-gray-700">Data e hora *</label>
        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            name="dia_todo"
            value="true"
            checked={diaTodo}
            onChange={e => handleToggle(e.target.checked)}
            className="rounded border-gray-300 focus:ring-gray-400"
          />
          <span className="text-sm text-gray-500">Dia todo</span>
        </label>
      </div>

      {/* Combined value for the server action */}
      <input type="hidden" name="data_hora" value={dataHoraSubmit} />

      {diaTodo ? (
        <input
          type="date"
          required
          value={valorData}
          onChange={e => setValorData(e.target.value)}
          className={inputClass}
        />
      ) : (
        <div className="flex gap-2">
          <input
            type="date"
            required
            value={valorData}
            onChange={e => setValorData(e.target.value)}
            className={`${inputClass} flex-1 min-w-0`}
          />
          <input
            type="time"
            value={valorHora}
            onChange={e => setValorHora(e.target.value)}
            className={`${inputClass} w-24 shrink-0`}
          />
        </div>
      )}
    </div>
  )
}
