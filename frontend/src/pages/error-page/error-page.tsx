import { Link } from 'react-router-dom'

import { errorImg } from '@/assets'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './error-page.module.scss'
export const ErrorPage = () => {
  return (
    <div className={s.errorContainer}>
      <img alt={'image about error'} className={s.errorImg} src={errorImg} />
      <Typography as={'div'} className={s.errorText} variant={'h2'}>
        {' '}
        Sorry! Page not found!
      </Typography>
      <Button>
        <Typography as={Link} className={s.errorLink} to={'/'} variant={'subtitle2'}>
          {' '}
          back to home page
        </Typography>
      </Button>
    </div>
  )
}
