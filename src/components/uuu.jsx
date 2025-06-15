import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const Navbar = () => {
  const { user } = useAuth()

  return (
    <div className="navbar bg-base-100 shadow">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Blog System
        </Link>
      </div>

      {/* Right: Login Button */}
      <div className="flex-none">
         {!user ? (
          //Loginلو مش مسجل دخول، اعرض زر 
          <Link to="/login" className="btn btn-outline btn-primary">
            Login
          </Link>
        ) : (
          //لو مسجل دخول، اعرض صورة أو أول حرف من الاسم
          <Link to="/profile" className="btn btn-circle btn-ghost bg-amber-50 text-xl uppercase">
            {user.username?.charAt(0)}
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
