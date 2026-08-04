'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [modo, setModo] = useState<'login' | 'registo'>('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro(null)
    setMensagem(null)
    setLoading(true)

    if (modo === 'login') {
      // Procura o email associado ao username
      const { data: emailEncontrado, error: erroLookup } = await supabase
        .rpc('get_email_by_username', { p_username: username })

      if (erroLookup || !emailEncontrado) {
        setErro('Utilizador não encontrado.')
        setLoading(false)
        return
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: emailEncontrado,
        password,
      })

      if (error) {
        setErro('Password incorreta.')
        setLoading(false)
        return
      }

      router.push('/dashboard')
      router.refresh()
    } else {
      // Registo: cria conta e guarda o username
      const { data: signUpData, error } = await supabase.auth.signUp({ email, password })

      if (error) {
        setErro(error.message)
        setLoading(false)
        return
      }

      if (signUpData.user) {
        const { error: erroProfile } = await supabase
          .from('profiles')
          .insert({ id: signUpData.user.id, username })

        if (erroProfile) {
          setErro('Conta criada, mas não foi possível guardar o username. Tenta com outro.')
          setLoading(false)
          return
        }
      }

      setMensagem('Conta criada! Já podes entrar.')
      setModo('login')
      setUsername('')
      setPassword('')
      setLoading(false)
    }
  }

  const inputClass =
    'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400'

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Herlander CRM</h1>
        <p className="text-sm text-gray-500 mb-8">
          {modo === 'login' ? 'Entra na tua conta' : 'Cria a tua conta'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {modo === 'registo' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className={inputClass}
            />
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}
          {mensagem && <p className="text-green-600 text-sm">{mensagem}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50"
          >
            {loading ? '...' : modo === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {modo === 'login' ? (
            <>
              Ainda não tens conta?{' '}
              <button
                onClick={() => { setModo('registo'); setErro(null); setMensagem(null) }}
                className="text-gray-700 underline"
              >
                Criar conta
              </button>
            </>
          ) : (
            <>
              Já tens conta?{' '}
              <button
                onClick={() => { setModo('login'); setErro(null); setMensagem(null) }}
                className="text-gray-700 underline"
              >
                Entrar
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  )
}
