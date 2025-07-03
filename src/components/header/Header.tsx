import { LogIn, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../slices/authSlice'
import { RootState } from '../../store/store'

export default function Header() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  
  const navigate = useNavigate();
  const onFeedPage = window.location.pathname === '/feed';

  const navigateToFeed = () => {
    navigate('/feed');
  }

    const navigateToLogin = () => {
      navigate('/login');
    }

    const handleLogout = () => {
      dispatch(logout());
    }
    return (
      <header className="flex justify-between items-center px-6 py-4 border-b sticky top-0 backdrop-blur-[5px]">

        <button onClick={navigateToFeed}>Atlys</button>
        
        {onFeedPage ? <button aria-label="logout" className="text-sm flex items-center gap-1" onClick={isLoggedIn ? handleLogout : navigateToLogin}>
          {isLoggedIn ? 'Logout' : 'Login'}
          {isLoggedIn ? <LogOut size={18}/> : <LogIn size={18}/>} </button> :<button aria-label="home" className="text-sm font-medium" onClick={navigateToFeed}>Go back home</button>
        } 
        
      </header>
    )
  }
  