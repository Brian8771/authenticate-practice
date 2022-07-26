import React, {useState} from 'react';
import {Modal} from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button style={{ fontSize: '14px', backgroundColor: '#333333', border: 'solid 1.5px #4c4c4c', color: '#ffffff', padding: '4px 10px', borderRadius: '2px'}} onClick={() => setShowModal(true)}>Sign In</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <LoginForm />
            </Modal>
        )}
        </>
    );
}

export default LoginFormModal;
