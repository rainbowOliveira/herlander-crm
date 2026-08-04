import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BotaoApagar from './BotaoApagar'

export default async function ClientesPage() {
  const supabase = await createClient()
  const { data: clientes } = await supabase
    .from('clientes')
    .select('*')
    .order('criado_em', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <Link
          href="/dashboard/clientes/novo"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition"
        >
          + Novo cliente
        </Link>
      </div>

      {!clientes || clientes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">
            Ainda não tens clientes. Começa por criar um.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {clientes.map(c => (
            <div key={c.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-gray-900">{c.nome}</p>
                <p className="text-sm text-gray-400">{c.email || c.telefone || '—'}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/dashboard/clientes/${c.id}/editar`}
                  className="text-sm text-gray-500 hover:text-gray-900 transition"
                >
                  Editar
                </Link>
                <BotaoApagar id={c.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
