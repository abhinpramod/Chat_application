import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useChatStore = create((set) => ({  
    Messages: [],
    users : [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in getUsers:", error);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessages: async () => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ Messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in getMessages:", error);
        } finally {
            set({ isMessagesLoading: false });
        }
    }
}));