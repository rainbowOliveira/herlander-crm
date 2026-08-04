'use client'

import { useState } from 'react'
import LogoutButton from '@/app/dashboard/LogoutButton'
import NavLinks from '@/components/NavLinks'

export default function MenuMobile({ username }: { username: string }) {
  const [aberto, setAberto] = useState(false)

  return (
    <>
      <button
        onClick={() => setAberto(true)}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 active:scale-95 transition-transform"
        aria-label="Abrir menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="3" y1="5"  x2="17" y2="5" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="15" x2="17" y2="15" />
        </svg>
      </button>

      <div
        onClick={() => setAberto(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${aberto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 flex flex-col shadow-xl transition-transform duration-300 ${aberto ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Herlander CRM
          </p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <NavLinks onNavigate={() => setAberto(false)} />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-2">{username}</p>
          <LogoutButton />
        </div>
      </div>
    </>
  )
}
