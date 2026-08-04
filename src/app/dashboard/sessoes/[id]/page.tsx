import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatDisplay } from '@/lib/dates'

const tipoBadge: Record<string, string> = {
  casamento:   'bg-rose-50 text-rose-700',
  evento:      'bg-amber-50 text-amber-700',
  corporativo: 'bg-slate-100 text-slate-700',
}

export default async function DetalhesSessaoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: sessao } = await supabase
    .from('sessoes')
    .select('*, clientes(nome, email, telefone)')
    .eq('id', id)
    .single()

  if (!sessao) redirect('/dashboard/sessoes')

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/sessoes" className="text-sm text-gray-400 hover:text-gray-700 active:opacity-60 transition-colors">
          ← Sessões
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Detalhes da sessão</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${tipoBadge[sessao.tipo]}`}>
            {sessao.tipo.charAt(0).toUpperCase() + sessao.tipo.slice(1)}
          </span>
          <Link
            href={`/dashboard/sessoes/${sessao.id}/editar`}
            className="text-sm text-gray-500 hover:text-gray-900 active:opacity-60 transition-colors"
          >
            Editar
          </Link>
        </div>

        <Campo label="Cliente" valor={sessao.clientes?.nome} />
        <Campo label="Data e hora" valor={formatDisplay(sessao.data_hora)} />
        {sessao.local && <Campo label="Local" valor={sessao.local} />}
        {sessao.ponto_encontro && <Campo label="Ponto de encontro" valor={sessao.ponto_encontro} />}
        {sessao.clientes?.email && <Campo label="Email do cliente" valor={sessao.clientes.email} />}
        {sessao.clientes?.telefone && <Campo label="Telefone do cliente" valor={sessao.clientes.telefone} />}
        {sessao.notas && (
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Notas</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{sessao.notas}</p>
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
