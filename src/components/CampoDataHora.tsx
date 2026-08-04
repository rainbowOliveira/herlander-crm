'use client'

import { useState } from 'react'

interface Props {
  defaultDiaTodo?: boolean
  defaultValue?: string
  inputClass: string
}

export default function CampoDataHora({ defaultDiaTodo = false, defaultValue, inputClass }: Props) {
  const [diaTodo, setDiaTodo] = useState(defaultDiaTodo)

  // Keep both values in sync so switching preserves what the user picked
  const [valorDatetime, setValorDatetime] = useState(() => {
    if (!defaultValue) return ''
    return defaultDiaTodo ? `${defaultValue}T00:00` : defaultValue
  })
  const [valorData, setValorData] = useState(() => defaultValue?.slice(0, 10) ?? '')

  function handleToggle(checked: boolean) {
    if (checked) {
      // datetime → all-day: copy the date the user already chose
      if (valorDatetime) setValorData(valorDatetime.slice(0, 10))
    } else {
      // all-day → datetime: sync date, keep existing time if date unchanged
      if (valorData && valorDatetime.slice(0, 10) !== valorData) {
        setValorDatetime(valorData + 'T00:00')
      }
    }
    setDiaTodo(checked)
  }

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
      {diaTodo ? (
        <input
          type="date"
          name="data_hora"
          required
          value={valorData}
          onChange={e => setValorData(e.target.value)}
          className={inputClass}
        />
      ) : (
        <input
          type="datetime-local"
          name="data_hora"
          required
          value={valorDatetime}
          onChange={e => setValorDatetime(e.target.value)}
          className={inputClass}
        />
      )}
    </div>
  )
}
