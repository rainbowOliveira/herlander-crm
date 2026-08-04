import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDisplay } from '@/lib/dates'
import BotaoApagar from './BotaoApagar'

const tipoBadge: Record<string, string> = {
  casamento: 'bg-rose-50 text-rose-700',
  evento:    'bg-amber-50 text-amber-700',
  corporativo: 'bg-slate-100 text-slate-700',
}

export default async function SessoesPage() {
  const supabase = await createClient()
  const { data: sessoes } = await supabase
    .from('sessoes')
    .select('*, clientes(nome)')
    .order('data_hora', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sessões</h1>
        <Link
          href="/dashboard/sessoes/nova"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 active:scale-[0.97] transition"
        >
          + Nova sessão
        </Link>
      </div>

      {!sessoes || sessoes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 text-center">
          <p className="text-gray-400 text-sm">
            Ainda não tens sessões. Começa por criar uma.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {sessoes.map(s => (
            <div key={s.id} className="relative flex items-center justify-between px-4 md:px-6 py-4 gap-4 hover:bg-gray-50 transition">
              {/* Link invisível que cobre toda a linha */}
              <Link href={`/dashboard/sessoes/${s.id}`} className="absolute inset-0" aria-label={`Ver sessão de ${s.clientes?.nome}`} />

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tipoBadge[s.tipo]}`}>
                    {s.tipo}
                  </span>
                  <p className="font-medium text-gray-900 truncate">{s.clientes?.nome}</p>
                </div>
                <p className="text-sm text-gray-400">{formatDisplay(s.data_hora, s.dia_todo)}{s.local ? ` · ${s.local}` : ''}</p>
              </div>

              {/* Botões acima do link overlay via z-10 */}
              <div className="relative z-10 flex items-center gap-4 shrink-0">
                <Link
                  href={`/dashboard/sessoes/${s.id}/editar`}
                  className="text-sm text-gray-500 hover:text-gray-900 active:opacity-60 transition-colors"
                >
                  Editar
                </Link>
                <BotaoApagar id={s.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
