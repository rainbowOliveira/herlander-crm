'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function criarCliente(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await supabase.from('clientes').insert({
    user_id: user.id,
    nome: formData.get('nome') as string,
    email: (formData.get('email') as string) || null,
    telefone: (formData.get('telefone') as string) || null,
    notas: (formData.get('notas') as string) || null,
  })

  redirect('/dashboard/clientes')
}

export async function atualizarCliente(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const id = formData.get('id') as string

  await supabase
    .from('clientes')
    .update({
      nome: formData.get('nome') as string,
      email: (formData.get('email') as string) || null,
      telefone: (formData.get('telefone') as string) || null,
      notas: (formData.get('notas') as string) || null,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  redirect('/dashboard/clientes')
}

export async function apagarCliente(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const id = formData.get('id') as string

  await supabase
    .from('clientes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath('/dashboard/clientes')
}
