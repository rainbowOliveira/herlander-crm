import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

const tipoBadge: Record<string, string> = {
  casamento:   'bg-rose-50 text-rose-700',
  evento:      'bg-amber-50 text-amber-700',
  corporativo: 'bg-slate-100 text-slate-700',
}

export default async function CalendarioPage({
  searchParams,
}: {
  searchParams: Promise<{ ano?: string; mes?: string }>
}) {
  const { ano: anoStr, mes: mesStr } = await searchParams

  // Current date in Lisbon timezone via formatToParts (reliable cross-platform)
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Lisbon',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date())
  const anoHoje  = parseInt(partes.find(p => p.type === 'year')!.value)
  const mesHoje  = parseInt(partes.find(p => p.type === 'month')!.value)
  const diaHoje  = parseInt(partes.find(p => p.type === 'day')!.value)

  const ano = anoStr ? parseInt(anoStr) : anoHoje
  const mes = mesStr ? parseInt(mesStr) : mesHoje

  // Fetch sessions for this month
  const inicio = new Date(ano, mes - 1, 1).toISOString()
  const fim = new Date(ano, mes, 0, 23, 59, 59).toISOString()

  const supabase = await createClient()
  const { data: sessoes } = await supabase
    .from('sessoes')
    .select('id, data_hora, tipo, clientes(nome)')
    .gte('data_hora', inicio)
    .lte('data_hora', fim)

  // Group sessions by day (Lisbon timezone)
  const sessoesPorDia = new Map<number, typeof sessoes>()
  sessoes?.forEach(s => {
    const dia = parseInt(
      new Date(s.data_hora).toLocaleString('en-CA', {
        timeZone: 'Europe/Lisbon',
        day: 'numeric',
      })
    )
    if (!sessoesPorDia.has(dia)) sessoesPorDia.set(dia, [])
    sessoesPorDia.get(dia)!.push(s)
  })

  // Build calendar grid (week starts on Monday)
  const primeiroDia = new Date(ano, mes - 1, 1)
  const totalDias = new Date(ano, mes, 0).getDate()
  const offset = (primeiroDia.getDay() + 6) % 7 // Mon=0 … Sun=6

  const celulas: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: totalDias }, (_, i) => i + 1),
  ]
  while (celulas.length % 7 !== 0) celulas.push(null)

  // Navigation hrefs
  const prev = mes === 1 ? { ano: ano - 1, mes: 12 } : { ano, mes: mes - 1 }
  const next = mes === 12 ? { ano: ano + 1, mes: 1 } : { ano, mes: mes + 1 }
  const hrefPrev = `/dashboard/calendario?ano=${prev.ano}&mes=${prev.mes}`
  const hrefNext = `/dashboard/calendario?ano=${next.ano}&mes=${next.mes}`

  const eHojeMesmo = anoHoje === ano && mesHoje === mes

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Calendário</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Cabeçalho com navegação */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100">
          <Link
            href={hrefPrev}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 active:scale-95 transition"
          >
            ←
          </Link>
          <h2 className="font-semibold text-gray-900">
            {MESES[mes - 1]} {ano}
          </h2>
          <Link
            href={hrefNext}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 active:scale-95 transition"
          >
            →
          </Link>
        </div>

        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DIAS_SEMANA.map(d => (
            <div key={d} className="py-2 text-xs font-medium text-gray-400 text-center">
              {d}
            </div>
          ))}
        </div>

        {/* Grelha de dias */}
        <div className="grid grid-cols-7">
          {celulas.map((dia, i) => (
            <div
              key={i}
              className={`min-h-20 md:min-h-28 p-1 md:p-2 border-b border-r border-gray-100 last:border-r-0 ${
                !dia ? 'bg-gray-50' : ''
              }`}
            >
              {dia && (
                <>
                  <p
                    className={`text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                      eHojeMesmo && dia === diaHoje
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    {dia}
                  </p>
                  <div className="space-y-0.5">
                    {sessoesPorDia.get(dia)?.map(s => (
                      <Link
                        key={s.id}
                        href={`/dashboard/sessoes/${s.id}`}
                        className={`block text-xs px-1.5 py-0.5 rounded truncate leading-5 hover:opacity-80 transition ${tipoBadge[s.tipo]}`}
                      >
                        <span className="hidden md:inline">{(s.clientes as any)?.nome}</span>
                        <span className="md:hidden">{s.tipo.slice(0, 3)}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
