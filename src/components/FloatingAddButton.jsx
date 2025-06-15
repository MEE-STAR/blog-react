import { Link } from 'react-router-dom'

// import { Plus } from 'lucide-react'
import { useAuth } from '../context/authContext'

const FloatingAddButton = () => {
  const { user } = useAuth()

  if (!user) return null // hide if not logged in

  return (
    <Link
      to="/create"
      className="fixed bottom-6 right-6 btn btn-circle btn-primary shadow-lg"
      title="Add new post"
    >
      {/* <Plus className="w-5 h-5" /> */} 
      +
    </Link>
  )
}

export default FloatingAddButton
