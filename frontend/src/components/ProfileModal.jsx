import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Profile from './Profile';

const ProfileModal = ({ showModal, handleClose }) => {
    return (
        <Modal show={showModal} onHide={handleClose} centered size="lg">
            <Profile handleClose={handleClose}/>
        </Modal>
    );
};

export default ProfileModal;