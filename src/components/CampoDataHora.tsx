'use client'

import { useState } from 'react'

interface Props {
  defaultDiaTodo?: boolean
  defaultValue?: string
  inputClass: string
}

export default function CampoDataHora({ defaultDiaTodo = false, defaultValue, inputClass }: Props) {
  const [diaTodo, setDiaTodo] = useState(defaultDiaTodo)

  const dateOnly = defaultValue?.slice(0, 10) ?? ''

  return (
    <div className="space-y-2">
      {diaTodo ? (
        <input
          type="date"
          name="data_hora"
          required
          defaultValue={dateOnly}
          className={inputClass}
        />
      ) : (
        <input
          type="datetime-local"
          name="data_hora"
          required
          defaultValue={defaultValue}
          className={inputClass}
        />
      )}
      <label className="flex items-center gap-2 cursor-pointer w-fit">
        <input
          type="checkbox"
          name="dia_todo"
          value="true"
          checked={diaTodo}
          onChange={e => setDiaTodo(e.target.checked)}
          className="rounded border-gray-300 text-gray-900 focus:ring-gray-400"
        />
        <span className="text-sm text-gray-600">Dia todo</span>
      </label>
    </div>
  )
}
