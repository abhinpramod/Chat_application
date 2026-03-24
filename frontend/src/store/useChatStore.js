import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
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
      set({ messages: res.data });
    } catch (error) {
      console.log("Error in getMessages:", error);
      toast.error(error.response.data.msg);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data) => {
    const { selectedUser } = get();

    // OPTIMISTIC UPDATE: render message instantly to remove perceived lag
    const tempMessage = {
      _id: "temp-" + Date.now(),
      senderId: useAuthStore.getState().authUser._id,
      receiverId: selectedUser._id,
      text: data.text,
      image: data.image,
      createdAt: new Date().toISOString(),
    };

    set({ messages: [...get().messages, tempMessage] });

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        data
      );

      // Replace the temp message with real backend message
      set({
        messages: get().messages.map((msg) =>
          msg._id === tempMessage._id ? res.data : msg
        ),
      });
    } catch (error) {
      console.log("Error from sendMessage:", error);
      toast.error(error.response?.data?.msg || "Failed to send message");
      
      // Rollback if there is an error
      set({
        messages: get().messages.filter((msg) => msg._id !== tempMessage._id),
      });
    }
  },
  subscribeToMessages: (userId) => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newmessage) => {
      if (newmessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newmessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}))
