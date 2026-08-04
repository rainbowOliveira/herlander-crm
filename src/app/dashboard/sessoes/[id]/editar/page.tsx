import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { utcToInput } from '@/lib/dates'
import { atualizarSessao } from '../../actions'

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400'

export default async function EditarSessaoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: sessao }, { data: clientes }] = await Promise.all([
    supabase.from('sessoes').select('*').eq('id', id).single(),
    supabase.from('clientes').select('id, nome').order('nome'),
  ])

  if (!sessao) redirect('/dashboard/sessoes')

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/sessoes" className="text-sm text-gray-400 hover:text-gray-700 active:opacity-60 transition-colors">
          ← Sessões
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Editar sessão</h1>
      </div>

      <form action={atualizarSessao} className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 space-y-4">
        <input type="hidden" name="id" value={sessao.id} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
          <select name="cliente_id" required defaultValue={sessao.cliente_id} className={inputClass}>
            {clientes?.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
          <select name="tipo" required defaultValue={sessao.tipo} className={inputClass}>
            <option value="casamento">Casamento</option>
            <option value="evento">Evento</option>
            <option value="corporativo">Corporativo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data e hora *</label>
          <input
            type="datetime-local"
            name="data_hora"
            required
            defaultValue={utcToInput(sessao.data_hora)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
          <input type="text" name="local" defaultValue={sessao.local ?? ''} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ponto de encontro</label>
          <input type="text" name="ponto_encontro" defaultValue={sessao.ponto_encontro ?? ''} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
          <textarea name="notas" rows={4} defaultValue={sessao.notas ?? ''} className={inputClass} />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 active:scale-[0.97] transition"
          >
            Guardar alterações
          </button>
          <Link
            href="/dashboard/sessoes"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 active:opacity-60 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
