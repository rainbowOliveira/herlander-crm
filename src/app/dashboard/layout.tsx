import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'

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
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Herlander CRM
          </p>
        </div>

        <nav className="flex-1 p-3">
          <Link
            href="/dashboard/clientes"
            className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            Clientes
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-2">
            {profile?.username ?? user.email}
          </p>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 p-8 min-w-0">{children}</main>
    </div>
  )
}
