import React from 'react';
import Profile from './Profile';

const ProfileModal = ({ closeModal, isOpen }) => {
  // Use Bootstrap's "show" class to control modal visibility
  const modalClass = isOpen ? 'modal show' : 'modal';

  return (
    <div className={modalClass} tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden={!isOpen}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="profileModalLabel">Profile</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
