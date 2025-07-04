import { useCallback } from 'react';
import PostComposer from './post/Create'
import PostCard from './post/Card'
import SignInDialog from '../auth/signIn/SignInDialog';
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { openSignInDialog } from '../../slices/uiSlice'
import { toast } from 'react-hot-toast'
import { AnimatePresence, motion } from "framer-motion";

export default function Feed() {
  const posts = useSelector((state: RootState) => state.posts.posts)
  const dispatch = useDispatch();


  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const checkIfLoggedIn = () => {
    if (!isLoggedIn) {
      dispatch(openSignInDialog());
    }
    return;
  }

  const featureNotImplemented = useCallback(() => {
    if (!isLoggedIn) {
      return;
    }
    toast.error("This feature is not implemented yet. Stay tuned for updates!", {
      position: 'top-center'
    });
  }, [isLoggedIn]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6" aria-live='polite' onClick={checkIfLoggedIn}>
      <PostComposer onClick={checkIfLoggedIn} featureNotImplemented={featureNotImplemented} />
      <AnimatePresence initial={false}>
        {
          posts.map((post, i) => (
             <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
              <PostCard key={i} post={post} featureNotImplemented={featureNotImplemented} />
            </motion.div>
          ))
        }
      </AnimatePresence>
      <SignInDialog />
    </div>
  )
}
