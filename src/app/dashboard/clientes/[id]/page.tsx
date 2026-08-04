import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DetalhesClientePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: cliente } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single()

  if (!cliente) redirect('/dashboard/clientes')

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/dashboard/clientes"
          className="text-sm text-gray-400 hover:text-gray-700 active:opacity-60 transition-colors"
        >
          ← Clientes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Detalhes do cliente</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 space-y-5">
        <div className="flex items-center justify-end">
          <Link
            href={`/dashboard/clientes/${cliente.id}/editar`}
            className="text-sm text-gray-500 hover:text-gray-900 active:opacity-60 transition-colors"
          >
            Editar
          </Link>
        </div>

        <Campo label="Nome" valor={cliente.nome} />
        {cliente.email && <Campo label="Email" valor={cliente.email} />}
        {cliente.telefone && <Campo label="Telefone" valor={cliente.telefone} />}
        {cliente.notas && (
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Notas</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{cliente.notas}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Campo({ label, valor }: { label: string; valor?: string | null }) {
  if (!valor) return null
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-gray-900">{valor}</p>
    </div>
  )
}
