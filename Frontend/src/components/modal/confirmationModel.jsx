import React from "react";

const ConfirmationModal = ({
                               onClose,
                               message,
                               onConfirm,
                               confirmLabel,
                               confirmButtonClass,
                           }) => {
    return (
        <div className="fixed top-72 inset-0 z-50 flex items-center justify-center bg-black ">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 ">
                <h2 className="text-lg font-semibold mb-4">{message}</h2>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors ${confirmButtonClass}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
