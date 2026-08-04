'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { inputToUTC } from '@/lib/dates'

export async function criarSessao(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await supabase.from('sessoes').insert({
    user_id: user.id,
    cliente_id: formData.get('cliente_id') as string,
    tipo: formData.get('tipo') as string,
    data_hora: inputToUTC(formData.get('data_hora') as string).toISOString(),
    local: (formData.get('local') as string) || null,
    ponto_encontro: (formData.get('ponto_encontro') as string) || null,
    notas: (formData.get('notas') as string) || null,
  })

  redirect('/dashboard/sessoes')
}

export async function atualizarSessao(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const id = formData.get('id') as string

  await supabase
    .from('sessoes')
    .update({
      cliente_id: formData.get('cliente_id') as string,
      tipo: formData.get('tipo') as string,
      data_hora: inputToUTC(formData.get('data_hora') as string).toISOString(),
      local: (formData.get('local') as string) || null,
      ponto_encontro: (formData.get('ponto_encontro') as string) || null,
      notas: (formData.get('notas') as string) || null,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  redirect('/dashboard/sessoes')
}

export async function apagarSessao(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await supabase
    .from('sessoes')
    .delete()
    .eq('id', formData.get('id') as string)
    .eq('user_id', user.id)

  revalidatePath('/dashboard/sessoes')
}
