import PostComposer from './post/Create'
import PostCard from './post/Card'
import SignInDialog from '../auth/signIn/SignInDialog';
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { openSignInDialog } from '../../slices/uiSlice'
import { toast } from 'react-hot-toast'

export default function Feed() {
  const posts = useSelector((state: RootState) => state.posts.posts)
  const dispatch = useDispatch();


  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const checkIfLoggedIn = () => {
    if(!isLoggedIn) {
      dispatch(openSignInDialog());
    }
    return;
  }

  const featureNotImplemented = () => {
    if(!isLoggedIn) {
      return;
    }
    toast.error("This feature is not implemented yet. Stay tuned for updates!");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <PostComposer onClick={checkIfLoggedIn} featureNotImplemented={featureNotImplemented}/>
      {posts.map((post, i) => (
        <PostCard key={i} post={post} featureNotImplemented={featureNotImplemented}/>
      ))}
      <SignInDialog />
    </div>
  )
}
