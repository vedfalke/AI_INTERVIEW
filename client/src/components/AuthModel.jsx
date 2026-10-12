import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import Auth from "../pages/Auth.jsx";

function AuthModel({ onClose }) {
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
        if (userData) {
            onClose();
        }
    }, [userData, onClose]);

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/10 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close sign-in dialog"
                    className="absolute right-5 top-5 z-10 text-xl text-gray-800 hover:text-black"
                >
                    <FaTimes size={18} />
                </button>
                <Auth isModel />
            </div>
        </div>
    );
}

export default AuthModel;