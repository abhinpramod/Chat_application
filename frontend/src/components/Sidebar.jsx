import React from 'react'
import { useChatStore } from "../store/useChatStore";
import { use } from 'react';

const Sidebar = () => {
  const { selectedUser, getUsers, users ,setselectedUser} = useChatStore();

  const onlineUsers =[]

  if(isUsersLoading){
    return <div><SidebarSkelton/></div>
  }
  useEffect(() => {
    getUsers()
  }, [getUsers])
  return (
    <div>
      side bar
    </div>
  )
}

export default Sidebar
