'use client'

import * as Yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react';

const asyncFunction = async () => {
  const myPromise = await new Promise((resolver) => {
    setTimeout(() => {
      resolver('Hello')
    }, 3000)
  })
}

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'A senha precisa ter pelo menos 6 caracteres')
    .required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
    .required('Campo obrigatório')
})

export function Form() {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const { errors, isSubmitting } = formState
  console.log(errors, 'errors')
  console.log(isSubmitting, "isSubmitting")

  const handleSubmitData = async (data: any) => {
    console.log('submit', data)
    asyncFunction()
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="p-5 border rounded-2xl">
      <h1>Reset Password</h1>
      <div className="py-5 flex flex-col gap-2">

        <input {...register('password')} autoFocus type="password" placeholder="Senha" className="text-black pl-5 rounded-full" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <input {...register('confirmPassword')} type="password" placeholder="Confirmar senha" className=" text-black pl-5 rounded-full" />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

        <button type="submit" className=" border rounded-full" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>

      </div>
    </form>
  )
}

