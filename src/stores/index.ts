import { create } from "zustand";

interface IAuthState {
    access_token:string
    setToken:(value:string)=>void
}

export const useAuth = create<IAuthState>((set,get) => ({
    access_token:"",
    setToken:(value:string)=>{
        console.log(value)
        return set(state=>({access_token:value}))
    }
}))