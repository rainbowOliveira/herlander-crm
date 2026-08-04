import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase
    .from('teste_ligacao')
    .select('*')
    .order('criado_em', { ascending: false })

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Herlander CRM — Fase 0
        </h1>

        {error ? (
          <p className="text-red-600 text-sm">Erro: {error.message}</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
              Dados vindos da base de dados:
            </p>
            {data?.map((row) => (
              <div
                key={row.id}
                className="bg-green-50 border border-green-200 rounded-lg px-4 py-3"
              >
                <p className="text-green-800 font-medium">{row.mensagem}</p>
                <p className="text-green-600 text-xs mt-1">
                  {new Date(row.criado_em).toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
