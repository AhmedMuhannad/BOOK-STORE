import React, { useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    setFirstName,
    setSecondName,
    setAvatar,
    setSelectedCountry,
    setPhoneNumber
} from "../features/ProfileSlice";
import { countries } from '../Data/Countries';
import { MdModeEdit, MdLock, MdLockOpen } from "react-icons/md";


interface Country {
    id: string;
    name: string;
    countryCode: string;
}

interface RootState {
    ProfileSlice: {
        firstName: string;
        secondName: string;
        Avatar: string;
        selectedCountry: Country | null;
        phoneNumber: string;
    };
}

export default function Profile() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [phoneError, setPhoneError] = React.useState<string>('');
    const [disableEdit, setDisableEdit] = React.useState<boolean>(false)

    const validatePhoneNumber = useCallback((number: string): boolean => {
        const digitsOnly = number.replace(/\D/g, '');

        if (!digitsOnly) {
            setPhoneError('Phone number is required');
            return false;
        }
        if (digitsOnly.length < 10) {
            setPhoneError('Phone number must be at least 10 digits');
            return false;
        }
        if (digitsOnly.length > 15) {
            setPhoneError('Phone number is too long');
            return false;
        }
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(digitsOnly)) {
            setPhoneError('Please enter a valid phone number');
            return false;
        }

        setPhoneError('');
        return true;
    }, []);

    const handlePhoneNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let formattedValue = value.replace(/\D/g, '');
        if (formattedValue.length > 3 && formattedValue.length <= 6) {
            formattedValue = formattedValue.replace(/(\d{3})(\d+)/, '$1-$2');
        } else if (formattedValue.length > 6) {
            formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
        }
        dispatch(setPhoneNumber(formattedValue));
        validatePhoneNumber(formattedValue.replace(/\D/g, ''));
    }, [dispatch, validatePhoneNumber]);

    const { firstName, secondName, Avatar, selectedCountry, phoneNumber } = useSelector(
        (state: RootState) => state.ProfileSlice
    );

    const fullName = useMemo(() => `${firstName} ${secondName}`, [firstName, secondName]);

    const filteredCountries = useMemo(() =>
        countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.countryCode.includes(searchTerm)
        ), [searchTerm]
    );

    const handleSelect = useCallback((country: Country) => {
        dispatch(setSelectedCountry(country));
        setIsOpen(false);
        setSearchTerm("");
    }, [dispatch]);

    const handleAvatarChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setAvatar(reader.result as string));
            };
            reader.readAsDataURL(file);
        }
    }, [dispatch]);

    const toggleDropdown = useCallback(() => setIsOpen(prev => !prev), []);
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value), []);
    const handleFirstNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => dispatch(setFirstName(e.target.value)), [dispatch]);
    const handleSecondNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSecondName(e.target.value)), [dispatch]);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="text-text/80 lg:h-2/3 md:h-1/3 h-auto p-4 text-left text-sm rounded-xl w-auto shadow-[0px_0px_10px_0px] shadow-black/10 justify-self-center self-center">
            <div className='flex items-center'>
                <div className="relative group w-14 h-14 row-span-2 md:w-28 md:h-28">
                    <img
                        src={Avatar}
                        alt="User Avatar"
                        className="w-full h-full rounded-full object-cover border-4 border-transparent group transition-all duration-300"
                    />
                    {disableEdit && (
                        <label className="absolute inset-0 flex items-center justify-center bg-black/60 text-background rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="text-xl"><MdModeEdit /></span>
                            <input aria-label='Change avatar' type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        </label>
                    )}
                </div>
                <div>
                    <h2 className='text-text text-xl ml-4'>{fullName}</h2>
                </div>
            </div>

            <div className='grid md:grid-cols-2 md:grid-rows-3 gap-x-12 mt-8 grid-row-4 h-1/2'>
                <div className='self-start space-y-6 md:space-y-12'>
                    <div className={`flex h-12 w-full max-w-md items-center overflow-hidden rounded-full border transition-colors duration-300 ${!disableEdit ? 'bg-slate-100 border-slate-200' : 'bg-background border-primary/30'}`}>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="h-full bg-transparent w-full pl-6 text-sm placeholder-text/50 outline-none"
                            onChange={handleFirstNameChange}
                            value={firstName}
                            required
                            disabled={!disableEdit}
                        />
                        <span className={`pr-4 text-xl ${disableEdit ? 'text-primary' : 'text-text/50'}`}>
                            {disableEdit ? <MdLockOpen /> : <MdLock />}
                        </span>
                    </div>
                    {/* Second Name Input */}
                    <div className={`flex h-12 mb-6 md:mb-0 w-full max-w-md items-center overflow-hidden rounded-full border transition-colors duration-300 ${!disableEdit ? 'bg-slate-100 border-slate-200' : 'bg-background border-primary/30'}`}>
                        <input
                            type="text"
                            placeholder="Second Name"
                            className="h-full bg-transparent w-full pl-6 text-sm placeholder-text/50 outline-none"
                            onChange={handleSecondNameChange}
                            value={secondName}
                            disabled={!disableEdit}
                        />
                        <span className={`pr-4 text-xl ${disableEdit ? 'text-primary' : 'text-text/50'}`}>
                            {disableEdit ? <MdLockOpen /> : <MdLock />}
                        </span>
                    </div>
                </div>

                <div className='self-start space-y-6 md:space-y-12'>
                    {/* Email Input */}
                    <div className={`flex h-12 w-full max-w-md items-center overflow-hidden rounded-full border transition-colors duration-300 ${!disableEdit ? 'bg-slate-100 border-slate-200' : 'bg-background border-primary/30'}`}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="h-full bg-transparent w-full pl-6 text-sm placeholder-text/50 outline-none"
                            required
                            disabled={!disableEdit}
                        />
                        <span className={`pr-4 text-xl ${disableEdit ? 'text-primary' : 'text-text/50'}`}>
                            {disableEdit ? <MdLockOpen /> : <MdLock />}
                        </span>
                    </div>
                    {/* Phone Input */}
                    <div className="relative" ref={dropdownRef}>
                        <div className={`flex h-12 w-full max-w-md items-center overflow-hidden rounded-full border transition-colors duration-300 ${!disableEdit ? 'bg-slate-100 border-slate-200' : 'bg-background border-primary/30'}`}>
                            <button
                                type="button"
                                className={`inline-flex items-center justify-center w-20 px-3 text-sm text-text/80 focus:outline-none h-full border-r transition-colors duration-300 ${!disableEdit ? 'border-slate-200' : 'hover:text-text border-primary/30'}`}
                                onClick={toggleDropdown}
                                disabled={!disableEdit}
                            >
                                +{selectedCountry?.countryCode || 'N/A'}
                                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.5 3.5a.75.75 0 01-1.06 1.06L10 4.81 7.03 7.78a.75.75 0 01-1.06-1.06l3.5-3.5A.75.75 0 0110 3zm-3.72 9.53a.75.75 0 011.06 0L10 15.19l2.97-2.97a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <input
                                type="tel"
                                className="h-full bg-transparent w-full pl-4 text-sm placeholder-text/50 outline-none"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                disabled={!disableEdit}
                            />
                            <span className={`pr-4 text-xl ${disableEdit ? 'text-primary' : 'text-text/50'}`}>
                            {disableEdit ? <MdLockOpen /> : <MdLock />}
                        </span>
                        </div>

                        {phoneError && (<p className="text-red-500 text-xs mt-1 ml-4">{phoneError}</p>)}

                        {isOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-background shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                <div className="p-2 sticky top-0 bg-background">
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border border-primary/30 rounded-full bg-background text-text placeholder-text/50 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                                        placeholder="Search country..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        autoFocus
                                    />
                                    
                                </div>
                                <ul role="listbox">
                                    {filteredCountries.length > 0 ? (
                                        filteredCountries.map(country => (
                                            <li key={country.id} className="text-text cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary/10" onClick={() => handleSelect(country)}>
                                                <span className="font-normal block truncate">
                                                    {country.name} <span className="text-text/60">(+{country.countryCode})</span>
                                                </span>
                                                {selectedCountry?.id === country.id && (
                                                    <span className="text-primary absolute inset-y-0 right-0 flex items-center pr-4">
                                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-text/60 cursor-default select-none relative py-2 px-3">
                                            No country found.
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {disableEdit ? (
                <div className='flex flex-row space-x-2'>
                    <button className='flex justify-center items-center bg-primary/60 mt-2 hover:bg-primary/80 cursor-pointer md:mt-0 justify-self-center h-10 w-1/2 text-text px-6 rounded-full' onClick={() => { setDisableEdit(false) }}>Save</button>
                    <button className='border-primary flex justify-center items-center bg-secondary mt-2 hover:bg-secondary/55 cursor-pointer md:mt-0 justify-self-center h-10 w-1/2 text-text px-6 border-2 rounded-full' onClick={() => { setDisableEdit(false) }}>cancel</button>
                </div>
            ) : (
                <button className='border-primary flex justify-center items-center bg-secondary mt-2 hover:bg-secondary/55 cursor-pointer md:mt-0 justify-self-center h-10 w-1/2 text-text px-6 border-2 rounded-full' onClick={() => { setDisableEdit(true) }}>Edit</button>
            )}
        </div>
    );
}