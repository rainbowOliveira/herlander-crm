import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Painel</h1>
        <p className="text-sm text-gray-500 mb-8">
          Bem-vinda, <span className="font-medium text-gray-700">{user.email}</span>
        </p>
        <LogoutButton />
      </div>
    </main>
  )
}
