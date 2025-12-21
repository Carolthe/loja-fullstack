// @ts-check

import { Fragment } from "react";
import { ToastProvider } from "./Providers/ToastProvider";
import { AuthProvider } from "./Providers/AuthProvider";
import DefaultLayout from "./Layouts/DefaultLayout";

function App() {
  return (
    <Fragment>
      <AuthProvider>
        <ToastProvider>
          <DefaultLayout />
        </ToastProvider>
      </AuthProvider>
    </Fragment>
  );
}

export default App;
