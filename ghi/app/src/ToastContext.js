import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';


const ToastContext = createContext();

export const useToast = () => {
return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
const triggerToast = (message, type = "default") => {
switch(type) {
    case "error":
    toast.error(message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    break;
    case "success":
    toast.success(message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    break;

    default:
    toast(message);
}
};
    return (
        <ToastContext.Provider value={triggerToast}>
            {children}
        </ToastContext.Provider>
    );
};
