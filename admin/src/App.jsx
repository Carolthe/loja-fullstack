// @ts-check

import { Fragment } from "react";
import AuthLayout from "./Layouts/AuthLayout";
import GuestLayout from "./Layouts/GuestLayout";
import { SidebarProvider } from "./Providers/SidebarProvider";

function App() {
  const isAuthenticated = true;
  return (
    <Fragment>
      {isAuthenticated ? (
        <SidebarProvider>
          <AuthLayout />
        </SidebarProvider>
      ) : (
        <GuestLayout />
      )}
    </Fragment>
  );
}

export default App;
