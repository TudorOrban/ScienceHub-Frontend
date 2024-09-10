"use client";

import { useCurrentUser } from "../contexts/CurrentUserContext";
import Userbar from "./Userbar";

const UserbarWrapper = () => {

    const { currentUser, setCurrentUser, isUserbarOpen, setIsUserbarOpen } = useCurrentUser();

    return (
        <div className="absolute top-16 right-4 shadow-lg overflow-auto z-50">
            {isUserbarOpen && <Userbar userSmall={currentUser ?? undefined}/>}
        </div>
    );
};

export default UserbarWrapper;