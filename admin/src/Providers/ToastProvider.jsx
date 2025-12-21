import { useState } from "react";
import { ToastContext } from "../Contexts/ToastContext";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState("none");
  const [message, setMessage] = useState("");

  return (
    <ToastContext.Provider value={{ toast, setToast, message, setMessage }}>
      {children}
    </ToastContext.Provider>
  );
}
