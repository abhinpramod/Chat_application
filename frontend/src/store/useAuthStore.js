import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";



export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninup: false,
    isLoggingIng:false,
    isUpadatingprofile:false,

    isCheckingAuth: true,

    setAuthUser: async() =>{
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser: res.data})
           } catch (error) {
            console.log("error from checkAuth", error.message);
            
            set({authUser: null})
            
           } finally {
            set({isCheckingAuth: false})
           }
    } 
 
}))