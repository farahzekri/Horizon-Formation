import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineShop } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { TiLightbulb } from 'react-icons/ti';

function CustomModal({ isOpen, onClose, children }) {
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  return (
    <>
      {isOpen && (
        <>
          <div style={overlayStyle} onClick={onClose}></div>
          <div style={modalStyle}>
            {children}
          </div>
        </>
      )}
    </>
  );
}
export default CustomModal;