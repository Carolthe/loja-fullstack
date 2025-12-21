// @ts-check

import AuthLayout from "./AuthLayout";
import GuestLayout from "./GuestLayout";
import { SidebarProvider } from "../Providers/SidebarProvider";
import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import { Auth } from "../backend/Auth";

export default function DefaultLayout() {
  const { logged, setLogged } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = new Auth();
    const isAuth = async () => {
      return await auth.checkAuth();
    };
    isAuth()
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          setLogged(true);
        } else {
          setLogged(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setLogged(false);
      });
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div>
          {logged ? (
            <SidebarProvider>
              <AuthLayout />
            </SidebarProvider>
          ) : (
            <GuestLayout />
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
