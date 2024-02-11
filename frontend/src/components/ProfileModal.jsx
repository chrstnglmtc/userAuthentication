import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';

const ProfileModal = ({ showModal, handleClose }) => {
  const [isEditModal, setIsEditModal] = useState(false);

  const handleToggleEditModal = () => {
    setIsEditModal((prevIsEditModal) => !prevIsEditModal);
  };

  const handleModalHide = () => {
    setIsEditModal(false);
  };

  return (
    <Modal show={showModal} onHide={() => { handleClose(); handleModalHide(); }} centered size="lg">
      {isEditModal ? (
        <ProfileEdit handleClose={handleModalHide} />
      ) : (
        <Profile handleClose={handleClose} handleEditClick={handleToggleEditModal} />
      )}
    </Modal>
  );
};

export default ProfileModal;