import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'
import MenuMobile from '@/components/MenuMobile'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 md:flex">

      {/* Barra lateral — desktop */}
      <aside className="hidden md:flex w-56 bg-white border-r border-gray-200 flex-col shrink-0">
        <div className="p-6 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Herlander CRM
          </p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <Link href="/dashboard/clientes" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
            Clientes
          </Link>
          <Link href="/dashboard/sessoes" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
            Sessões
          </Link>
          <Link href="/dashboard/calendario" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
            Calendário
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-2">
            {profile?.username ?? user.email}
          </p>
          <LogoutButton />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">

        {/* Barra de topo — telemóvel */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <MenuMobile username={profile?.username ?? user.email ?? ''} />
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Herlander CRM
          </p>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
