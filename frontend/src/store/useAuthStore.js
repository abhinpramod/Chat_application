import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";



export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninup: false,
    isLoggingIng:false,
    isUpadatingprofile:false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
    
          set({ authUser: res.data });
          get().connectSocket();
        } catch (error) {
          console.log("Error in checkAuth:", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },
      signup: async (data) => {
        set({ isSigninup: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          toast.success("Signup successful");
          set({ authUser: res.data });
          get().connectSocket();
        } catch (error) {
            toast.error("Signup failed");
          console.log("Error in signup:", error);
        } finally {
          set({ isSigninup: false });
        }
      },
    
 
}))