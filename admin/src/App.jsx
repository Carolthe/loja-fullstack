// @ts-check

import { Fragment } from "react";
import AuthLayout from "./Layouts/AuthLayout";
import GuestLayout from "./Layouts/GuestLayout";

function App() {
  const isAuthenticated = true; // Replace with actual authentication logic
  return (
    <Fragment>{isAuthenticated ? <AuthLayout /> : <GuestLayout />}</Fragment>
  );
}

export default App;
