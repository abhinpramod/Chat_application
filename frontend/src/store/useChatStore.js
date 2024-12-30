import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useChatStore = create((set,get) => ({  
    Messages: [],
    users : [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });            
            
            
        } catch (error) {
            console.log(error);
            
            toast.error(error.response.data.message);
            console.log("Error in getUsers:", error);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId) => {
        
        
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ Messages: res.data });
        } catch (error) {
            console.log("Error in getMessages:", error);
            toast.error(error.response.data.msg);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (data) => {
     const { Messages,selectedUser } = get();
    
        try {
            console.log(selectedUser._id);

            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, data);
            
            set({ Messages: [...Messages, res.data] });
        } catch (error) {
            console.log("Error in sendMessage:", error);
            toast.error(error.response.data.msg);
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user });
    },
}));