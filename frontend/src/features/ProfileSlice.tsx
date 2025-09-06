import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
const ProfileSlice = createSlice({
    name: 'Profile',
    initialState: {
        firstName: "Guest",
        secondName: "",
        Avatar: "https://lh3.googleusercontent.com/a/default-user",
        selectedCountry:"",
    },
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload
        },
        setSecondName: (state, action: PayloadAction<string>) => {
            state.secondName = action.payload
        },
        setAvatar: (state, action: PayloadAction<string>) => {
            state.Avatar = action.payload
        },
        setSelectedCountry:(state,action:PayloadAction<string>)=>{
            state.selectedCountry=action.payload
        },
    }
})
export const { setFirstName, setSecondName, setAvatar,setSelectedCountry } = ProfileSlice.actions
export default ProfileSlice.reducer