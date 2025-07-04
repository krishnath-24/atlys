import { Heart, MessageSquareText, Send } from "lucide-react";
import { formatCreatedAt } from "../../../utils/common";
import type { CardProps } from "../../../types/posts.types";


export default function PostCard({ post, featureNotImplemented, onClick }: CardProps) {

  
  const { content, emoji, avatar, username, createdAt } = post;

    return (
      <div className="flex flex-col justify-evenly bg-gray-100 border rounded-xl p-2 shadow-sm mb-4 gap-3" onClick={onClick}>
        <div className="bg-white p-2 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <img src={avatar} alt={username} className="w-9 h-9 rounded-lg" />
            <div>
              <p className="font-semibold text-sm">{username}</p>
              <p className="text-xs text-gray-400">{formatCreatedAt(createdAt)}</p>
            </div>
          </div>
          <div className="flex gap-3 items-center mb-2">
            <span className="w-8 h-8 p-1 mr-1 bg-gray-100 text-center rounded-full self-start">{emoji}</span>
            <p className="text-sm"> {content}</p>
          </div>
        
        </div>
        <div className="flex gap-4 items-center text-gray-600 text-sm mb-2 pl-2" onClick={featureNotImplemented}>
          <button><Heart  size={18}/></button>
          <button><MessageSquareText className="scale-x-[-1]" size={18} /></button>
          <button><Send size={18}/> </button>
        </div>
      </div>
    )
  }
  