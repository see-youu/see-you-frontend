"use client";
import AlertMessage from "@/components/modal/AlertMessage";
import { useAlert } from "@/context/AlertProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { alert, setAlert } = useAlert();
  return (
    <>
      {children}
      {alert && (
        <AlertMessage message={alert} setClose={() => setAlert(null)} />
      )}
    </>
  );
}
