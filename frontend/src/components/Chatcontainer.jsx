import React from "react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const { selectedUser, messages, isMessagesLoading, getMessages } =
    useChatStore();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser._id]);

  if (isMessagesLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="h-full w-full  items-center justify-center">
      <ChatHeader/>

      <div className="flex-1 overflow-y-auto"></div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
