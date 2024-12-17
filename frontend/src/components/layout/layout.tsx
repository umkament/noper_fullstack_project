import { useCallback, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { NPlogo } from '@/assets'
import { AvatarWithName } from '@/components/ui/avatar/avatarWithName'
import { Button } from '@/components/ui/button'
import { DropDownItem, DropDownMenu } from '@/components/ui/dropDownMenu'
import { Header } from '@/components/ui/header'
import { useAuthMeQuery, useLogoutUserMutation } from '@/services/auth'
import { FaPeopleRobbery } from 'react-icons/fa6'
import { GiExitDoor, GiNewspaper } from 'react-icons/gi'
import { GoInfo } from 'react-icons/go'
import { PiAtomLight } from 'react-icons/pi'

import s from './layout.module.scss'

import { Avatar } from '../ui/avatar'
import { Typography } from '../ui/typography'

export const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const { data: userData, isLoading } = useAuthMeQuery(undefined, {
    pollingInterval: 60000,
  })
  const [logoutUser] = useLogoutUserMutation()
  const navigate = useNavigate()

  const logOutHandler = useCallback(async () => {
    try {
      await logoutUser().unwrap()

      navigate('/auth/login')
    } catch (error) {
      console.error('Ошибка при выходе пользователя из аккаунта', error)
    }
  }, [logoutUser])

  const menuChangeHandler = (open: boolean) => {
    setMenuOpen(open)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header>
        <div className={s.header_body}>
          <Link to={'/'}>
            {/* <img alt={logoUR} className={s.logo} src={logoUR} /> */}
            <img alt={NPlogo} className={s.logo} src={NPlogo} />
          </Link>
          <nav className={s.header_nav}>
            <ul className={s.list_menu}>
              <Link className={s.linkOff} to={'/'}>
                <Button variant={'icon'}>
                  <li className={s.list_item}>
                    <GiNewspaper className={s.icons} size={21} />{' '}
                    <span className={s.text}>лента</span>
                  </li>
                </Button>
              </Link>

              <Link className={s.linkOff} to={'/users'}>
                <Button variant={'icon'}>
                  <li className={s.list_item}>
                    <FaPeopleRobbery className={s.icons} size={21} />{' '}
                    <span className={s.text}>пользователи</span>
                  </li>
                </Button>
              </Link>

              <Link className={s.linkOff} to={'/concept'}>
                <Button variant={'icon'}>
                  <li className={s.list_item}>
                    <PiAtomLight className={s.icons} size={21} />{' '}
                    <span className={s.text}>концепция</span>
                  </li>
                </Button>
              </Link>

              <Link className={s.linkOff} to={'/bio'}>
                <Button variant={'icon'}>
                  <li className={s.list_item}>
                    <GoInfo className={s.icons} size={21} /> <span className={s.text}>bio</span>
                  </li>
                </Button>
              </Link>
            </ul>
          </nav>

          {userData ? (
            <DropDownMenu
              aline={'end'}
              isMenuOpen={menuOpen}
              onChange={menuChangeHandler}
              trigger={
                <AvatarWithName
                  avatar={
                    userData?.avatarUrl
                      ? `http://51.250.51.234:4411L${userData.avatarUrl}`
                      : `https://robohash.org/${userData?.username}.png`
                  }
                  name={<Typography className={s.name}>{userData.username}</Typography>}
                />
              }
            >
              <>
                <DropDownItem>
                  <Button as={Link} to={`/user/${userData._id}`}>
                    моя страница{' '}
                    <Avatar
                      avatar={
                        userData?.avatarUrl
                          ? `http://51.250.51.234:4411${userData.avatarUrl}`
                          : `https://robohash.org/${userData?.username}.png`
                      }
                    />
                  </Button>
                </DropDownItem>
                <DropDownItem>
                  <Button as={Link} className={s.link} onClick={logOutHandler} to={'/auth/login'}>
                    выйти
                  </Button>
                </DropDownItem>
              </>
            </DropDownMenu>
          ) : (
            <Button as={Link} to={'/auth/login'} variant={'primary'}>
              <GiExitDoor className={s.iconDoor} size={26} />{' '}
              <span className={s.textLogOut}>Вход / Регистрация</span>
            </Button>
          )}
        </div>
      </Header>
      <Outlet />
    </>
  )
}
