"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage, faSearch } from "@fortawesome/free-solid-svg-icons";

import UserAvatar from "@/core/user/components/UserAvatar";
import Userbar from "@/core/user/components/Userbar";
import { UserSmall } from "@/core/user/models/User";
import HeaderSearchInput from "./HeaderSearchInput";

const Header = () => {
    const [isUserbarOpen, setIsUserbarOpen] = useState(false);

    const currentUserId = "1";
    const userSmallData: UserSmall = { id: "1", username: "JohnDoe", fullName: "John A. Doe" };

    return (
        <div className="header">
            <Image
                src="/images/science-logo.jpg"
                width={36}
                height={36}
                alt="Picture of the website"
                className="sm:ml-4 mr-2 lg:mr-4 xl:mr-16 border border-gray-400 rounded-md"
            />

            {/* Navigation Links */}
            <div className="hidden md:flex md:space-x-12 lg:space-x-16 text-lg text-gray-50 mr-2 sm:mr-6 lg:mr-8 xl:mr-16">
                <Link href="/" className="hidden lg:inline-block">
                    Home
                </Link>
                <Link href="/workspace">Workspace</Link>
                <Link href="/browse">Browse</Link>
                <Link href="/resources" className="hidden lg:inline-block">
                    Resources
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <HeaderSearchInput />

                {/* Chats and notifications */}
                <div className="hidden md:flex items-center pl-4">
                    <Link
                        href={"/workspace/community/chats"}
                        className="flex items-center justify-center bg-gray-100 text-black w-9 h-9 mr-4 rounded-md border border-gray-400 "
                    >
                        <FontAwesomeIcon icon={faMessage} className="small-icon text-gray-700" />
                    </Link>
                    <button
                        className="flex items-center justify-center bg-gray-100 text-black w-9 h-9 rounded-md border border-gray-400"
                        onClick={() => {}}
                    >
                        <FontAwesomeIcon icon={faBell} className="small-icon text-gray-700" />
                    </button>
                </div>
            </div>

            {/* User/Auth */}
            <div className="hidden sm:flex items-center space-x-4">
                {currentUserId ? (
                    <div className="flex items-center mx-4 relative">
                        <UserAvatar 
                            userSmall={userSmallData} 
                            onClick={() => setIsUserbarOpen(!isUserbarOpen)}
                        />

                        {isUserbarOpen && (
                            <div className="absolute top-12 right-0 z-50 shadow-lg">
                                <Userbar
                                    setIsUserbarOpen={setIsUserbarOpen}
                                    userSmall={userSmallData}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center space-x-4 pr-4">    
                        <button
                            className="auth-button"
                            // onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}
                        >
                            Sign up
                        </button>
                        <button
                            className="auth-button"
                            // onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}
                        >
                            Log in
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;