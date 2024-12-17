import { z } from 'zod'

export const signUpSchema = z
  .object({
    confirmPassword: z.string().min(5, { message: 'пароль должен содержать не менее 5 символов' }),
    email: z.string().email({ message: 'Неверный формат e-mail' }),
    name: z
      .string()
      .min(2, { message: 'поле должно содержать не менее 2 символов' })
      .max(20, { message: 'поле должно содержать не более 20 символов' })
      .optional(),
    password: z.string().min(5, { message: 'пароль должен содержать не менее 5 символов' }),
    surname: z
      .string()
      .min(2, { message: 'поле должно содержать не менее 2 символов' })
      .max(20, { message: 'поле должно содержать не более 20 символов' })
      .optional(),
    username: z
      .string()
      .min(2, { message: 'поле должно содержать не менее 2 символов' })
      .max(20, { message: 'поле должно содержать не более 30 символов' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'пароли не совпадают',
    path: ['confirmPassword'],
  })

export type SignUpFormSchema = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  email: z.string().email({ message: 'Неверный формат e-mail' }),
  password: z.string().min(5, { message: 'пароль должен содержать не менее 5 символов' }),
})

export type SignInFormSchema = z.infer<typeof signInSchema>
