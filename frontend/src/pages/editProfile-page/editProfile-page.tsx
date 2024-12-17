import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import NOPER from '@/assets/NOPER.png'
import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/ui/controlled-input'
import { ControlledTextarea } from '@/components/ui/textarea/controlled-textarea'
import { Typography } from '@/components/ui/typography'
import {
  UserProfile,
  useAuthMeQuery,
  useDeleteAvatarMutation,
  useUpdateUserProfileMutation,
  useUploadAvatarMutation,
} from '@/services/auth'
import { FaTrashCan } from 'react-icons/fa6'
import { LiaHandPointer } from 'react-icons/lia'
import { MdAddAPhoto } from 'react-icons/md'

import s from './editProfile-page.module.scss'

export const EditProfilePage = () => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const {
    data: user,
    isFetching,
    isLoading,
    refetch,
  } = useAuthMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const [uploadAvatar] = useUploadAvatarMutation()
  const [deleteAvatar] = useDeleteAvatarMutation()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>(user?.avatarUrl || '')

  const [updateUserProfile ] = useUpdateUserProfileMutation()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      avatarUrl: user?.avatarUrl || '',
      description: user?.description || '',
      email: user?.email || '',
      link: user?.link || '',
      name: user?.name || '',
      surname: user?.surname || '',
      typeOfSport: user?.typeOfSport || '',
      username: user?.username || '',
    },
  })

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    setSelectedFile(file)

    if (file) {
      const previewUrl = URL.createObjectURL(file)

      setAvatarPreview(previewUrl)
    }
  }

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar().unwrap()
      setAvatarPreview('')
      setSelectedFile(null)
      await refetch()
    } catch (err) {
      console.error('Ошибка при удалении аватара', err)
    }
  }

  const onSubmit: SubmitHandler<UserProfile> = async formData => {
    try {
      // let avatarUrl = formData.avatarUrl
      let avatarUrl = avatarPreview

      if (selectedFile) {
        const uploadData = new FormData()

        uploadData.append('image', selectedFile)

        const { url } = await uploadAvatar(uploadData).unwrap()

        avatarUrl = url
      }

      await updateUserProfile({ ...formData, avatarUrl }).unwrap()
      await refetch()

      reset({
        ...formData,
        avatarUrl,
      })

      navigate(`/user/${user?._id}`, { replace: true })
    } catch (err) {
      console.error('Ошибка при обновлении профиля пользователя', err)
    }
  }

  useEffect(() => {
    console.log('isFetching:', isFetching, 'isLoading:', isLoading)
  }, [isFetching, isLoading])

  const getAvatarSrc = () => {
    if (avatarPreview) {
      return avatarPreview.startsWith('blob')
        ? avatarPreview
        : `http://51.250.51.234:4411${avatarPreview}`
    }

    return `https://robohash.org/${user?.username}.png`
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <img alt={'logo'} className={s.logo} src={NOPER} />
        <Typography className={s.text} variant={'large'}>
          измени/дополни информацию о себе
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            label={'username'}
            name={'username'}
            placeholder={user?.username}
            type={'text'}
          />
          <ControlledInput
            className={s.inputStyle}
            control={control}
            label={'Имя'}
            name={'name'}
            placeholder={user?.name}
          />
          <ControlledInput
            className={s.inputStyle}
            control={control}
            label={'Фамилия'}
            name={'surname'}
            placeholder={user?.surname}
          />
          <ControlledTextarea
            className={s.textareaStyle}
            control={control}
            label={'о себе'}
            name={'description'}
            placeholder={user?.description || '...'}
            rules={{
              maxLength: {
                message: 'описание не должно превышать 200 символов',
                value: 200,
              },
            }}
          />
          <ControlledInput
            className={s.inputStyle}
            control={control}
            label={'e-mail'}
            name={'email'}
            placeholder={user?.email}
          />
          <div className={s.addAvatarWrap}>
            <img alt={'avatar'} className={s.avatarStyle} src={getAvatarSrc()} />
            <div>
              <Button className={s.buttonStyle} onClick={handleButtonClick} type={'button'}>
                <Typography className={s.btnText}>добавить аватар</Typography>
                <MdAddAPhoto size={20} />
              </Button>
              <input hidden onChange={handleFileChange} ref={inputFileRef} type={'file'} />
              {avatarPreview && (
                <Button className={s.buttonStyle} onClick={handleDeleteAvatar} type={'button'}>
                  <Typography className={s.btnText}>удалить аватар</Typography>
                  <FaTrashCan size={20} />
                </Button>
              )}
            </div>
          </div>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            label={'ссылка на соцсети'}
            name={'link'}
            placeholder={user?.link || 'https://t.me/umkamedvezhatova'}
          />
          <Button className={s.saveBtn} type={'submit'}>
            сохранить изменения
          </Button>
        </form>
        <Typography className={s.text} variant={'large'}>
          оставить без изменений и
        </Typography>
        <Button as={Link} className={s.btnStyle} to={`/user/${user?._id}`} variant={'link'}>
          выйти
        </Button>
        <LiaHandPointer className={s.pointer} size={25} />
      </div>
    </div>
  )
}
