"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage, faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

    const currentUserId = "1";

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
                <div className="flex items-center rounded-r-md">
                    <input
                        type="text"
                        value={""}
                        // onChange={handleInputChange}
                        // onFocus={() => setIsPopoverOpen(true)}
                        placeholder={"Search ScienceHub"}
                        className={` h-full border border-gray-200 py-2 pl-3 rounded-md text-black focus:outline-none ${
                            ""
                        }`}
                    />
                    <button
                        className="h-full bg-gray-800 text-white w-10 border border-gray-400 rounded-l-none rounded-r-md hover:bg-gray-900 hover:text-white lg:mt-0"
                        onClick={() => {}}
                    >
                        <FontAwesomeIcon icon={faSearch} className="small-icon" />
                    </button>
                </div>

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

            {/* Sign-in/Sign-up & Buttons */}
            <div className="hidden sm:flex items-center gap-x-4">
                {currentUserId ? (
                    <div className="flex items-center mr-4">
                        <button
                            className="w-10 h-10 rounded-full border border-gray-700"
                            style={{ backgroundColor: "var(--sidebar-bg-color)", color: "var(--sidebar-text-color)" }}
                            // onClick={() => {
                            //     setIsUserbarOpen(!isUserbarOpen);
                            // }}
                        >
                            <p>{"TO"}</p>
                        </button>

                        {/* {isUserbarOpen && (
                            <Userbar
                                setIsUserbarOpen={setIsUserbarOpen}
                                userSmall={(userSmall.data ?? [])[0]}
                            />
                        )} */}
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