import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { utcToInput, utcToDateInput } from '@/lib/dates'
import { atualizarSessao } from '../../actions'
import SelectPesquisavel from '@/components/SelectPesquisavel'
import CampoDataHora from '@/components/CampoDataHora'
import BotaoSubmit from '@/components/BotaoSubmit'

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400'

const TIPOS = [
  { value: 'casamento',   label: 'Casamento' },
  { value: 'evento',      label: 'Evento' },
  { value: 'corporativo', label: 'Corporativo' },
]

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

  const opcoesClientes = (clientes ?? []).map(c => ({ value: c.id, label: c.nome }))

  const defaultDataHora = sessao.dia_todo
    ? utcToDateInput(sessao.data_hora)
    : utcToInput(sessao.data_hora)

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
          <SelectPesquisavel
            name="cliente_id"
            options={opcoesClientes}
            defaultValue={sessao.cliente_id}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
          <SelectPesquisavel
            name="tipo"
            options={TIPOS}
            defaultValue={sessao.tipo}
            required
            className={inputClass}
          />
        </div>

        <CampoDataHora
          defaultDiaTodo={sessao.dia_todo}
          defaultValue={defaultDataHora}
          inputClass={inputClass}
        />

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
          <BotaoSubmit label="Guardar alterações" labelPendente="A guardar…" />
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
