import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { criarSessao } from '../actions'
import SelectPesquisavel from '@/components/SelectPesquisavel'
import CampoDataHora from '@/components/CampoDataHora'

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400'

const TIPOS = [
  { value: 'casamento',   label: 'Casamento' },
  { value: 'evento',      label: 'Evento' },
  { value: 'corporativo', label: 'Corporativo' },
]

export default async function NovaSessaoPage() {
  const supabase = await createClient()
  const { data: clientes } = await supabase
    .from('clientes')
    .select('id, nome')
    .order('nome')

  if (!clientes || clientes.length === 0) redirect('/dashboard/clientes')

  const opcoesClientes = clientes.map(c => ({ value: c.id, label: c.nome }))

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/sessoes" className="text-sm text-gray-400 hover:text-gray-700 active:opacity-60 transition-colors">
          ← Sessões
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Nova sessão</h1>
      </div>

      <form action={criarSessao} className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
          <SelectPesquisavel
            name="cliente_id"
            options={opcoesClientes}
            placeholder="Selecionar cliente…"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
          <SelectPesquisavel
            name="tipo"
            options={TIPOS}
            placeholder="Selecionar tipo…"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data e hora *</label>
          <CampoDataHora inputClass={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
          <input type="text" name="local" className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ponto de encontro</label>
          <input type="text" name="ponto_encontro" className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
          <textarea name="notas" rows={4} className={inputClass} />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 active:scale-[0.97] transition"
          >
            Guardar
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
