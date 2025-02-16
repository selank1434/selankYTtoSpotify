import React, { useState } from 'react';

// Modal Component
const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContainer}>
        <h2>Modal Content</h2>
        <p>This is the content inside the modal.</p>
        <button onClick={closeModal} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

// Main Component
const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={styles.container}>
      <button onClick={openModal} style={styles.openButton}>Open Modal</button>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

// Styles for the modal and components
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  openButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for the backdrop
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default ModalExample;
