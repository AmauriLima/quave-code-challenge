import React, { createContext, useContext, useMemo, useState } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const clearToast = () => {
    setToast(null);
  };

  const setToastNotification = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const value = useMemo(
    () => ({
      toast,
      setToastNotification,
      clearToast,
    }),
    [toast, setToastNotification, clearToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);