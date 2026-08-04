import Link from 'next/link'
import { criarCliente } from '../actions'

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400'

export default function NovoClientePage() {
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/dashboard/clientes"
          className="text-sm text-gray-400 hover:text-gray-700 transition"
        >
          ← Clientes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo cliente</h1>
      </div>

      <form action={criarCliente} className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
          <input type="text" name="nome" required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input type="tel" name="telefone" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
          <textarea name="notas" rows={4} className={inputClass} />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition"
          >
            Guardar
          </button>
          <Link
            href="/dashboard/clientes"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 transition"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
