import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setFirstName, setSecondName, setAvatar, setSelectedCountry } from "../features/ProfileSlice";
import { countries } from '../Data/Countries';
import { MdModeEdit } from "react-icons/md";

export default function Profile() {
    const dispatch = useDispatch()
    const handleSelect = (country) => {
        dispatch(setSelectedCountry(country));
    };
    const { firstName, secondName, Avatar, selectedCountry } = useSelector((state: RootState) => state.ProfileSlice);
    const fullName = firstName + " " + secondName

    const Countries = countries.map((country) => {
        return (<option value={country.name} key={country.id} />);
    })
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setAvatar(reader.result as string));
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="bg-background text-text/80 w-1/2 h-2/3 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10 justify-self-center self-center">
            <div className='flex items-center'>
                <div className="relative group w-28 h-28 row-span-2">
                    <img
                        src={Avatar}
                        alt="User Avatar"
                        className="w-full h-full rounded-full object-cover border-4 border-transparent group-hover:border-primary transition-all duration-300"
                    />
                    <label className="absolute inset-0 flex items-center justify-center bg-black/60 text-background rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-xl"><MdModeEdit /></span>
                        <input
                            aria-label='user'
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </label>
                </div>
                <div>
                    <h2 className='text-text text-xl ml-4'>{fullName}</h2>
                </div>
            </div>
            <div className='grid grid-cols-2 grid-rows-3 gap-x-12 mt-8'>
                <div className='self-start space-y-12'>
                    <form className="flex h-12 w-full max-w-md items-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-background">
                        <input type="text" placeholder="First Name" className="h-full bg-transparent w-full pl-6 text-sm placeholder-text/50 outline-none" onChange={(e) => {
                            dispatch(setFirstName(e.target.value))
                        }} required />
                    </form>
                    <form className="flex h-12 w-full max-w-md items-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-background">
                        <input type="email" placeholder="Email" className="h-full bg-transparent w-full pl-6 text-sm placeholder-text/50 outline-none" required />
                    </form>
                </div>
                <div className='self-start space-y-12'>
                    <form className="flex h-12 w-full max-w-md items-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-background">
                        <input type="text" placeholder="Second Name" className="h-full bg-transparent w-full pl-6 text-sm placeholder-text/50 outline-none" onChange={(e) => {
                            dispatch(setSecondName(e.target.value))
                        }} />
                    </form>
                    <input
                        type="text"
                        value={selectedCountry}
                        onChange={(e) => dispatch(setSelectedCountry(e.target.value))}
                        className="input flex h-12 w-full max-w-md items-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-background pl-6 text-sm placeholder-text/50 outline-none"
                        placeholder="Select your country"
                        list="Countries"
                    />
                    <datalist id="Countries">
                        {Countries}
                    </datalist>
                </div>
            </div>
        </div>
    )
}