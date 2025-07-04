import React, { useState } from "react"
import { Trash2, Plus, Mic, Video, Smile, SendHorizontal, Quote, CodeXml, BoldIcon, ItalicIcon, UnderlineIcon, List, ListOrdered } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../../slices/postSlice'
import { RootState } from "../../../store/store";
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast'
import type { CreateProps } from "../../../types/posts.types";
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from "../../Spinner";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'


export default function PostComposer({ onClick, featureNotImplemented }: CreateProps) {

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);


  const handleEmojiSelect = ({native}: {native:string}) => {
    setSelectedEmoji(native);
    setShowEmojiPicker(false);
  }

  const resetFormData = () => {
    setPostContent('');
    setSelectedEmoji('');
  }

  const handlePostCreate = async () => {
    if (!selectedEmoji) {
      toast.error("Emoji is required!", {
        position: 'top-right'
      });
      return;
    }
    if (!postContent?.trim()) {
      toast.error("Post content is required!", {
        position: 'top-right'
      });
      return;
    }
    setIsLoading(true);
    try {
      setTimeout(
        () => {
          const postData = {
            content: postContent,
            emoji: selectedEmoji,
            createdAt: Date.now().toString(),
            id: nanoid(),
            avatar: 'https://i.pravatar.cc/40?img=1',
            username: user?.username || ''
          }

          dispatch(addPost(postData));
          toast.success("Post created successfully!", {
            position: 'top-right'
          });
          setIsLoading(false);
          resetFormData();
        }
        , 500);
    } catch (error) {
      toast.error("Failed to create post. Please try again.", {
        position: 'top-right'
      })
    }
  }


  return (
    <div className="p-2 bg-gray-100 rounded-2xl mb-6 select-none" onClick={onClick} onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}>
      <div className="w-full max-w-2xl mx-auto bg-gray-50 rounded-xl shadow-md bg-white  ">
        <div className="p-2 space-y-3">
          <div className="flex items-center justify-between ">

            <div className="flex gap-2 text-sm items-center bg-gray-100 rounded-xl">
              <select
                onClick={featureNotImplemented}
                className="text-sm p-3 rounded-xl bg-gray-100"
                aria-label="post type"
              >
                <option>Paragraph</option>
              </select>
              <AnimatePresence>
                {isFocused && (
                  <motion.div
                    className="flex items-center gap-2 ml-2 bg-gray-100 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button onClick={featureNotImplemented} className="hover:bg-white p-2 rounded-lg"><BoldIcon size={20} /></button>
                    <button onClick={featureNotImplemented} className="italic hover:bg-white p-2 rounded-lg"><ItalicIcon size={20} /></button>
                    <button onClick={featureNotImplemented} className="underline hover:bg-white p-2 rounded-lg"><UnderlineIcon size={20} /></button>
                    <div className="flex items-center gap-2 border-l border-r px-2">
                      <button onClick={featureNotImplemented} className="hover:bg-white p-2 rounded-lg"><List size={24} className="p-1" /></button>
                      <button onClick={featureNotImplemented} className="hover:bg-white p-2 rounded-lg"><ListOrdered size={24} className="p-1" /></button>
                    </div>
                    <button onClick={featureNotImplemented} className="hover:bg-white p-2 rounded-lg"><Quote size={24} className="p-1" /></button>
                    <button onClick={featureNotImplemented} className="hover:bg-white p-2 rounded-lg"><CodeXml size={24} className="p-1" /></button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


            <button className="p-2 bg-red-100 rounded-xl" onClick={featureNotImplemented}><Trash2 size={28} className="bg-red-100 text-red-500 rounded-lg p-1" /></button>
          </div>
          <div className="flex items-center relative min-h-[100px]">
            <button className="self-start" onClick={() => setShowEmojiPicker(prev => !prev)}>
              {selectedEmoji ? <span className="text-lg m-0 p-0">{selectedEmoji}</span> : <Smile className="mt-1" size={18} />}
            </button>

            <textarea
              className="w-full border-none resize-none outline-none ml-2 self-start"
              placeholder="How are you feeling today?"
              name="postContent"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={4}
            />
            <div className="absolute top-7 w-10 h-10 z-50">
              <React.Suspense fallback={<div>Loading emojis...</div>}>
                {showEmojiPicker && <Picker height={350} data={data}  searchPosition="none" onEmojiSelect={handleEmojiSelect} />}
              </React.Suspense>
            </div>
          </div>

        </div>

        <div className="flex justify-between border-t items-center p-3">
          <div className="flex gap-3">
            <button onClick={featureNotImplemented}><Plus size={24} className="text-gray-600 bg-gray-100 rounded-lg p-1" /></button>
            <button onClick={featureNotImplemented}><Mic size={20} className="text-gray-500" /></button>
            <button onClick={featureNotImplemented}><Video size={20} className="text-gray-500" /></button>
          </div>
          <button onClick={handlePostCreate}>{isLoading ? <Spinner /> : <SendHorizontal size={22} className="text-blue-600" />}</button>
        </div>
      </div>
    </div>
  )
}
