import React, { createContext, useState, useContext } from 'react';
import "./AccountForm.css"
import AccountLogIn  from './AccountLogIn';



const ModalContext = createContext();

export function useModal() {
    return useContext(ModalContext);
}

function SignInModal({ isModalOpen, closeModal }) {

    return (
        <div className={isModalOpen ? "signInModel show" : "signInModel"}>
            <div>
                <AccountLogIn closeModal={closeModal} />
            </div>
        </div>
    );
}

export function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
            <SignInModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </ModalContext.Provider>
    );
}
