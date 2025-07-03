import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../types/posts.types'

interface PostsState {
  posts: Post[]
}
/**
 * using localStorage to persist posts and 
 * load initial state from there
 */
const loadInitialPosts = (): Post[] => {
  try {
    const data = localStorage.getItem('posts');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: PostsState = {
  posts: loadInitialPosts(),
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
  },
})

export const { addPost } = postsSlice.actions
export default postsSlice.reducer
