// @ts-check

import { Fragment } from "react";
import AuthLayout from "./Layouts/AuthLayout";
import GuestLayout from "./Layouts/GuestLayout";
import { SidebarProvider } from "./Providers/SidebarProvider";
import { ToastProvider } from "./Providers/ToastProvider";

function App() {
  const isAuthenticated = true;
  return (
    <Fragment>
      <ToastProvider>
        {isAuthenticated ? (
          <SidebarProvider>
            <AuthLayout />
          </SidebarProvider>
        ) : (
          <GuestLayout />
        )}
      </ToastProvider>
    </Fragment>
  );
}

export default App;
