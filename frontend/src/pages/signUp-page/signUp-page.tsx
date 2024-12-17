import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import NOPER from '@/assets/NOPER.png'
import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/ui/controlled-input'
import { Typography } from '@/components/ui/typography'
import { useRegisterUserMutation } from '@/services/auth'
import { SignUpFormSchema, signUpSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { LiaHandPointer } from 'react-icons/lia'

import s from './signUp-page.module.scss'

export const SignUpPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignUpFormSchema>({ resolver: zodResolver(signUpSchema) })
  const navigate = useNavigate()
  const [registerUser] = useRegisterUserMutation()

  const onSubmit = async (data: SignUpFormSchema) => {
    try {
      await registerUser(data).unwrap()
      alert(
        'Ваш аккаунт успешно создан! Надеемся, Вы не забыли e-mail, который ввели при регистрации'
      )
      navigate('/auth/login')
    } catch (err: any) {
      // Обрабатываем ошибку, отправленную с сервера
      if (err.status === 400 && err.data && err.data.errorField) {
        // Устанавливаем ошибку для соответствующего поля
        setError(err.data.errorField, {
          message: err.data.message,
          type: 'manual',
        })
      } else {
        console.error('Ошибка при регистрации пользователя', err)
      }
    }
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <img alt={'logo'} className={s.logo} src={NOPER} />
        <Typography className={s.text} variant={'large'}>
          создай свой профиль
        </Typography>
        <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            defaultValue={''}
            errorMessage={errors.name?.message}
            label={'Имя'}
            name={'name'}
            placeholder={'введите свое имя'}
          ></ControlledInput>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            defaultValue={''}
            errorMessage={errors.surname?.message}
            label={'Фамилия'}
            name={'surname'}
            placeholder={'введите свою фамилию'}
          ></ControlledInput>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            defaultValue={''}
            errorMessage={errors.username?.message}
            label={'Ник'}
            name={'username'}
            placeholder={'придумай себе ник'}
          ></ControlledInput>

          <ControlledInput
            className={s.inputStyle}
            control={control}
            defaultValue={''}
            errorMessage={errors.email?.message}
            label={'e-mail'}
            name={'email'}
            placeholder={'e-mail для входа в аккаунт'}
          ></ControlledInput>

          <ControlledInput
            className={s.inputStyle}
            control={control}
            defaultValue={''}
            errorMessage={errors.password?.message}
            label={'пароль'}
            name={'password'}
            placeholder={'создай пароль'}
            type={'password'}
          ></ControlledInput>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            defaultValue={''}
            errorMessage={errors.confirmPassword?.message}
            label={'подтверждение пароля'}
            name={'confirmPassword'}
            placeholder={'введи пароль повторно'}
            type={'password'}
          ></ControlledInput>
          <Button className={s.btnStyle} type={'submit'}>
            зарегистрироваться
          </Button>
          <Typography className={s.text} variant={'large'}>
            если у вас уже есть аккаунт
          </Typography>
          <div className={s.exitWrap}>
            <Button as={Link} className={s.btnStyle} to={'/auth/login'} variant={'link'}>
              войти
            </Button>
            <LiaHandPointer className={s.pointer} size={25} />
          </div>
        </form>
      </div>
    </div>
  )
}
