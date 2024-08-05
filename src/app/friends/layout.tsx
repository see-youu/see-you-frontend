"use client";
import AlertMessage from "@/components/modal/AlertMessage";
import ModalsContainer from "@/components/modal/ModalsContainer";
import { useAlert } from "@/context/AlertProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { alert, setAlert } = useAlert();
  return (
    <>
      {children}
      <ModalsContainer />
      {alert && (
        <AlertMessage message={alert} setClose={() => setAlert(null)} />
      )}
    </>
  );
}
