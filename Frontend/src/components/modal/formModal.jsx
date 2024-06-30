import React from "react";
import { IoMdClose } from "react-icons/io"; // Import a close icon

const FormModal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-1/2 shadow dark:bg-gray-800 rounded-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                    <IoMdClose size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default FormModal;
