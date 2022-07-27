import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import Create from './CreateForm';


function CreateAccountFormModal() {
    const [showCreate, setShowCreate] = useState(false);

    return (
        <>
        <button style={{backgroundColor: '#FF5500', color: '#FFFFFF', textDecoration: 'none', fontSize: '14px', padding: '4px 10px', borderRadius: '2px'}} onClick={() => setShowCreate(true)}>Create Account</button>
        {showCreate && (
            <Modal onClose={() => setShowCreate(false)}>
                <Create/>
            </Modal>
        )}
        </>
    );
}

export default CreateAccountFormModal;
