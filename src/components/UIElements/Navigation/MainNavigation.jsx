import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import { Link } from 'react-router-dom'

const MainNavigation = () => {
  return (
    <MainHeader>
      <h1>
        <Link to="/">Your News</Link>
      </h1>
      <NavLinks />
    </MainHeader>
  )
}

export default MainNavigation
