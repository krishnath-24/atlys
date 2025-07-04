import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { LogIn, LogOut } from "lucide-react"
import { logout } from '../../slices/authSlice'
import { RootState } from '../../store/store'
import toast from "react-hot-toast"
import { useState } from "react"
import Spinner from "../Spinner"

export default function Header() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const user = useSelector((state: RootState) => state.auth.user);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    const navigate = useNavigate();
    const onFeedPage = window?.location?.pathname === '/feed';

    const navigateToFeed = () => {
      navigate('/feed');
      return;
    }

    const navigateToLogin = () => {
      navigate('/login');
      return;
    }

    const handleLogout = () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          dispatch(logout());
          toast.success("Logged out successfully", {
            position: 'top-center'
          });
          setIsLoading(false);
        }, 400)
        
      } catch (error) {
        toast.error("Failed to logout. Please try again.", {
          position: 'top-center'
        });
      }
    }
    return (
      <header className="flex justify-between items-center px-6 py-4 border-b sticky top-0 backdrop-blur-[5px]">
        <button aria-label="Atlys" onClick={navigateToFeed}>Atlys</button>
        <div className="flex gap-2 ">
          {isLoggedIn ? <div className="text-sm text-muted mr-3">{user?.username}</div> : null}
          {onFeedPage ? <button disabled={isLoading} aria-label={`${isLoggedIn ? 'logout' : 'login'}`} className="text-sm flex items-center gap-1 text-gray-600 hover:text-black" onClick={isLoggedIn ? handleLogout : navigateToLogin}>
          {isLoggedIn ? <> Logout <LogOut size={18}/></> : <>Login <LogIn size={18}/></>} 
          {isLoading && <Spinner />}
           </button> :<button aria-label="Go to home" className="text-sm font-medium" onClick={navigateToFeed}>Go back home</button>
        } 
        </div>
      </header>
    )
  }
  