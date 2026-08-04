'use client'

import { useFormStatus } from 'react-dom'

interface Props {
  label: string
  labelPendente?: string
}

export default function BotaoSubmit({ label, labelPendente }: Props) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 active:scale-[0.97] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
    >
      {pending ? (labelPendente ?? label) : label}
    </button>
  )
}
