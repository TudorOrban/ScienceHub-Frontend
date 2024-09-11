"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage } from "@fortawesome/free-solid-svg-icons";

import UserAvatar from "@/core/user/components/UserAvatar";
import HeaderSearchInput from "./HeaderSearchInput";
import { useFetchUserSmall } from "@/core/user/hooks/useFetchUserSmall";
import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";

const Header = () => {
    const { setCurrentUser, isUserbarOpen, setIsUserbarOpen } = useCurrentUser();

    const currentUserId = 1;
    const userSmallData = useFetchUserSmall(currentUserId, !!currentUserId)?.data;

    useEffect(() => {
        if (!userSmallData) return;
        setCurrentUser(userSmallData);
    }, [userSmallData]);

    return (
        <div className="header overflow-hidden">
            <Image
                src="/images/science-logo.jpg"
                width={36}
                height={36}
                alt="Picture of the website"
                className="sm:ml-4 mr-2 lg:mr-4 xl:mr-16 border border-gray-400 rounded-md"
            />

            {/* Navigation Links */}
            <div className="hidden md:flex md:space-x-12 lg:space-x-16 text-xl font-medium text-gray-50 pb-1 mx-2 sm:mx-6 lg:mx-8 xl:mr-16">
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
                    <div className="flex items-center mx-4">
                        <UserAvatar
                            userSmall={userSmallData}
                            onClick={() => setIsUserbarOpen?.(!isUserbarOpen)}
                        />
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
