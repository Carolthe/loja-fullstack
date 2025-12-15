import { useState } from "react";
import { SidebarContext } from "../Contexts/SidebarContext";

export function SidebarProvider({ children }) {
  const [sidebar, setSidebar] = useState(null);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
