import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const ProfileSlice=createSlice({
    name:'Profile',
    initialState:{
        name:"",
    bio:"",
    Avatar:"https://lh3.googleusercontent.com/a/default-user"
    },
    reducers:{
        setName:(state,action:PayloadAction<string>)=>{
            state.name=action.payload
        },
        setBio:(state,action:PayloadAction<string>)=>{
            state.bio=action.payload
        },
        setAvatar:(state,action:PayloadAction<string>)=>{
            state.Avatar=action.payload
        }
    }
})
export const {setName,setBio,setAvatar}=ProfileSlice.actions
export default ProfileSlice.reducer