import { useContext } from 'react'
import { AuthContext } from '@/context/auth-context'
import { userInitials } from '@/utils'
import { NavLinksUl, UserIcon } from './NavLinksStyle'

const NavLinks = () => {
  const { logout, name } = useContext(AuthContext)
  return (
    <NavLinksUl>
      <li>
        <UserIcon>{name ? userInitials(name) : userInitials('N O')}</UserIcon>
      </li>
      <li onClick={logout}>Logout</li>
    </NavLinksUl>
  )
}

export default NavLinks
