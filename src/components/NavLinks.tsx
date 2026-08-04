'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard/clientes',   label: 'Clientes' },
  { href: '/dashboard/sessoes',    label: 'Sessões' },
  { href: '/dashboard/calendario', label: 'Calendário' },
]

export default function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {links.map(l => {
        const active = pathname.startsWith(l.href)
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={onNavigate}
            className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
              active
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:opacity-60'
            }`}
          >
            {l.label}
          </Link>
        )
      })}
    </>
  )
}
