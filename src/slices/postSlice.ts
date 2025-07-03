// src/slices/postsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../types/posts.types'

interface PostsState {
  posts: Post[]
}

const initialState: PostsState = {
  posts: [],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      console.log(action.payload)
      state.posts.unshift(action.payload) // add new post to the top
    },
  },
})

export const { addPost } = postsSlice.actions
export default postsSlice.reducer
