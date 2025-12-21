import { useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(null);

  return (
    <AuthContext.Provider value={{ logged, setLogged }}>
      {children}
    </AuthContext.Provider>
  );
}
