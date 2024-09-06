import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastContainerStyle = {
    maxWidth: '600px',
    width: '100%',
    margin: '0 auto',
};

const ToastProvider = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer
                style={toastContainerStyle}
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default ToastProvider;
